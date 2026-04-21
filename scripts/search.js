// Client-side search implementation using Fuse.js
import Fuse from 'fuse.js';

class SearchComponent {
  constructor() {
    this.searchIndex = null;
    this.fuse = null;
    this.resultsContainer = null;
    this.searchInput = null;
    this.currentIndex = -1;
    this.init();
  }

  async init() {
    try {
      // Load search index
      const response = await fetch('/reference/search-index.json');
      const searchData = await response.json();
      
      // Initialize Fuse.js with the search data
      const options = {
        keys: ['title', 'content'],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
      };
      
      this.fuse = new Fuse(searchData, options);
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to initialize search:', error);
    }
  }

  setupEventListeners() {
    this.searchInput = document.getElementById('search-input');
    this.resultsContainer = document.getElementById('search-results');
    
    if (this.searchInput) {
      // Handle input for search
      this.searchInput.addEventListener('input', (e) => {
        this.performSearch(e.target.value);
      });
      
      // Handle keyboard navigation
      this.searchInput.addEventListener('keydown', (e) => {
        this.handleKeyNavigation(e);
      });
      
      // Track search events
      this.searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && this.searchInput.value.length >= 2) {
          this.trackSearchEvent(this.searchInput.value);
        }
      });
    }
    
    // Handle click outside to close results
    document.addEventListener('click', (e) => {
      if (this.resultsContainer && !this.resultsContainer.contains(e.target) && 
          (!this.searchInput || e.target !== this.searchInput)) {
        if (this.resultsContainer) {
          this.resultsContainer.innerHTML = '';
        }
      }
    });
  }

  handleKeyNavigation(e) {
    if (!this.resultsContainer) return;
    
    const results = this.resultsContainer.querySelectorAll('.search-result');
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.currentIndex = Math.min(this.currentIndex + 1, results.length - 1);
        this.updateFocus(results);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.currentIndex = Math.max(this.currentIndex - 1, -1);
        this.updateFocus(results);
        break;
      case 'Enter':
        if (this.currentIndex >= 0 && this.currentIndex < results.length) {
          e.preventDefault();
          const link = results[this.currentIndex].querySelector('a');
          if (link) {
            link.click();
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (this.resultsContainer) {
          this.resultsContainer.innerHTML = '';
        }
        this.currentIndex = -1;
        if (this.searchInput) {
          this.searchInput.blur();
        }
        break;
    }
  }

  updateFocus(results) {
    results.forEach((result, index) => {
      if (index === this.currentIndex) {
        result.setAttribute('aria-selected', 'true');
        result.classList.add('focused');
      } else {
        result.setAttribute('aria-selected', 'false');
        result.classList.remove('focused');
      }
    });
  }

  performSearch(query) {
    // Reset current index
    this.currentIndex = -1;
    
    if (!this.fuse || query.length < 2) {
      if (this.resultsContainer) {
        this.resultsContainer.innerHTML = '';
      }
      return;
    }

    const results = this.fuse.search(query);
    this.displayResults(results.map(result => result.item));
  }

  displayResults(results) {
    if (!this.resultsContainer) return;

    if (results.length === 0) {
      this.resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
      return;
    }

    const html = results.map((item, index) => `
      <div class="search-result" role="option" aria-selected="false" tabindex="-1">
        <a href="${item.url}">
          <h3>${item.title}</h3>
          <p>${item.content.substring(0, 150)}...</p>
        </a>
      </div>
    `).join('');

    this.resultsContainer.innerHTML = `<div role="listbox">${html}</div>`;
  }

  trackSearchEvent(query) {
    // Track search event with analytics
    if (window.analytics && typeof window.analytics.trackCustomEvent === 'function') {
      window.analytics.trackCustomEvent('search_performed', {
        query: query,
        timestamp: new Date().toISOString()
      });
    } else {
      // Fallback logging
      console.log('Search performed:', query);
    }
  }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SearchComponent();
});