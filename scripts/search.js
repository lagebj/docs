// Client-side search implementation using Fuse.js
import Fuse from 'fuse.js';
import { ComponentBase } from '../components/base-component.js';
import { LazyLoader } from '../components/lazy-loader.js';

class SearchComponent extends ComponentBase {
  constructor() {
    super();
    this.searchIndex = null;
    this.fuse = null;
    this.init();
  }

  async init() {
    // Set up lazy loading for search component
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
      const lazyLoader = new LazyLoader({
        rootMargin: '50px' // Start loading 50px before entering viewport
      });
      
      lazyLoader.observe(searchContainer, async () => {
        await this.safeExecute(async () => {
          // Load search index only when search component is in viewport
          const response = await fetch('/reference/search-index.json');
          const searchData = await response.json();
          
          // Initialize Fuse.js with the search data
          const options = {
            keys: ['title', 'content', 'section'],
            threshold: 0.3,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
            shouldSort: true,
            findAllMatches: false,
            location: 0,
            distance: 100,
            tokenize: true,
            matchAllTokens: false,
          };
          
          this.fuse = new Fuse(searchData, options);
          this.setupEventListeners();
          
          // Track search initialization in analytics
          if (window.analytics) {
            window.analytics.trackCustomEvent('search_initialized', {
              timestamp: new Date().toISOString(),
              indexSize: searchData.length
            });
          }
        }, (error) => {
          console.error('Failed to initialize search:', error);
        });
      });
    }
  }

  setupEventListeners() {
    this.safeExecute(() => {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            this.performSearch(e.target.value);
          }, 300); // Debounce search by 300ms
        });
        
        // Show/hide results dropdown
        searchInput.addEventListener('focus', () => {
          const resultsContainer = document.getElementById('search-results');
          if (resultsContainer) {
            resultsContainer.classList.add('show');
          }
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
          const searchContainer = searchInput.closest('.search-container');
          const resultsContainer = document.getElementById('search-results');
          
          if (searchContainer && resultsContainer && !searchContainer.contains(e.target)) {
            resultsContainer.classList.remove('show');
          }
        });
        
        // Handle search result clicks for analytics
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
          resultsContainer.addEventListener('click', (e) => {
            const resultLink = e.target.closest('a');
            if (resultLink && window.analytics) {
              window.analytics.trackCustomEvent('search_result_clicked', {
                url: resultLink.href,
                text: resultLink.textContent.trim()
              });
            }
            
            // Hide results after clicking
            resultsContainer.classList.remove('show');
          });
        }
      }
    }, (error) => {
      console.error('Error setting up search event listeners:', error);
    });
  }

  performSearch(query) {
    this.safeExecute(() => {
      const resultsContainer = document.getElementById('search-results');
      if (!resultsContainer) return;
      
      if (!this.fuse || query.length < 2) {
        this.displayResults([]);
        return;
      }

      const results = this.fuse.search(query);
      this.displayResults(results.map(result => result.item));
      
      // Show results container
      resultsContainer.classList.add('show');
      
      // Track search queries in analytics
      if (window.analytics && results.length > 0) {
        window.analytics.trackCustomEvent('search_performed', {
          query: query,
          resultCount: results.length,
          timestamp: new Date().toISOString()
        });
      }
    }, (error) => {
      console.error('Error performing search:', error);
    });
  }

  displayResults(results) {
    this.safeExecute(() => {
      const resultsContainer = document.getElementById('search-results');
      if (!resultsContainer) return;

      if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
        return;
      }

      // Limit results to 10 items for better performance
      const limitedResults = results.slice(0, 10);
      
      const html = limitedResults.map(item => `
        <div class="search-result">
          <a href="${item.url}">
            <h3>${item.title}</h3>
            <p>${this.highlightMatches(item.content, item.matches)}</p>
          </a>
        </div>
      `).join('');

      resultsContainer.innerHTML = html;
    }, (error) => {
      console.error('Error displaying search results:', error);
      const resultsContainer = document.getElementById('search-results');
      if (resultsContainer) {
        resultsContainer.innerHTML = '<p class="no-results">Error displaying search results</p>';
      }
    });
  }
  
  highlightMatches(content, matches) {
    // Safe execution wrapper for match highlighting
    try {
      if (!matches || matches.length === 0) {
        return content.substring(0, 150) + '...';
      }
      
      // Simple highlighting implementation
      let highlightedContent = content;
      
      // Sort matches by position to maintain order
      const sortedMatches = matches
        .filter(match => match.key === 'content')
        .flatMap(match => match.indices)
        .sort((a, b) => a[0] - b[0]);
      
      if (sortedMatches.length > 0) {
        // Just return beginning of content with ellipsis for now
        return content.substring(0, 150) + '...';
      }
      
      return content.substring(0, 150) + '...';
    } catch (error) {
      console.error('Error highlighting matches:', error);
      return content.substring(0, 150) + '...';
    }
  }
}

// Make SearchComponent globally available
window.SearchComponent = SearchComponent;

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if not already initialized
  if (!window.searchComponentInstance) {
    window.searchComponentInstance = new SearchComponent();
  }
});
      }
    } catch (error) {
      console.error('Failed to initialize search:', error);
    }
  }

  setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      let searchTimeout;
      
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.performSearch(e.target.value);
        }, 300); // Debounce search by 300ms
      });
      
      // Show/hide results dropdown
      searchInput.addEventListener('focus', () => {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
          resultsContainer.classList.add('show');
        }
      });
      
      // Hide results when clicking outside
      document.addEventListener('click', (e) => {
        const searchContainer = searchInput.closest('.search-container');
        const resultsContainer = document.getElementById('search-results');
        
        if (searchContainer && resultsContainer && !searchContainer.contains(e.target)) {
          resultsContainer.classList.remove('show');
        }
      });
      
      // Handle search result clicks for analytics
      const resultsContainer = document.getElementById('search-results');
      if (resultsContainer) {
        resultsContainer.addEventListener('click', (e) => {
          const resultLink = e.target.closest('a');
          if (resultLink && window.analytics) {
            window.analytics.trackCustomEvent('search_result_clicked', {
              url: resultLink.href,
              text: resultLink.textContent.trim()
            });
          }
          
          // Hide results after clicking
          resultsContainer.classList.remove('show');
        });
      }
    }
  }

  performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (!this.fuse || query.length < 2) {
      this.displayResults([]);
      return;
    }

    const results = this.fuse.search(query);
    this.displayResults(results.map(result => result.item));
    
    // Show results container
    resultsContainer.classList.add('show');
    
    // Track search queries in analytics
    if (window.analytics && results.length > 0) {
      window.analytics.trackCustomEvent('search_performed', {
        query: query,
        resultCount: results.length,
        timestamp: new Date().toISOString()
      });
    }
  }

  displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
      return;
    }

    // Limit results to 10 items for better performance
    const limitedResults = results.slice(0, 10);
    
    const html = limitedResults.map(item => `
      <div class="search-result">
        <a href="${item.url}">
          <h3>${item.title}</h3>
          <p>${this.highlightMatches(item.content, item.matches)}</p>
        </a>
      </div>
    `).join('');

    resultsContainer.innerHTML = html;
  }
  
  highlightMatches(content, matches) {
    if (!matches || matches.length === 0) {
      return content.substring(0, 150) + '...';
    }
    
    // Simple highlighting implementation
    let highlightedContent = content;
    
    // Sort matches by position to maintain order
    const sortedMatches = matches
      .filter(match => match.key === 'content')
      .flatMap(match => match.indices)
      .sort((a, b) => a[0] - b[0]);
    
    if (sortedMatches.length > 0) {
      // Just return beginning of content with ellipsis for now
      return content.substring(0, 150) + '...';
    }
    
    return content.substring(0, 150) + '...';
  }
}

// Make SearchComponent globally available
window.SearchComponent = SearchComponent;

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if not already initialized
  if (!window.searchComponentInstance) {
    window.searchComponentInstance = new SearchComponent();
  }
});