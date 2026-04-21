// Client-side search implementation using Fuse.js
import Fuse from 'fuse.js';

class SearchComponent {
  constructor() {
    this.searchIndex = null;
    this.fuse = null;
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
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.performSearch(e.target.value);
      });
    }
  }

  performSearch(query) {
    if (!this.fuse || query.length < 2) {
      this.displayResults([]);
      return;
    }

    const results = this.fuse.search(query);
    this.displayResults(results.map(result => result.item));
  }

  displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
      return;
    }

    const html = results.map(item => `
      <div class="search-result">
        <a href="${item.url}">
          <h3>${item.title}</h3>
          <p>${item.content.substring(0, 150)}...</p>
        </a>
      </div>
    `).join('');

    resultsContainer.innerHTML = html;
  }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SearchComponent();
});