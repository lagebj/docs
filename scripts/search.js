// Enhanced Client-side search implementation using Fuse.js with faceted search and auto-complete
import Fuse from 'fuse.js';
import { ComponentBase } from '../components/base-component.js';
import { LazyLoader } from '../components/lazy-loader.js';

class SearchComponent extends ComponentBase {
  constructor() {
    super();
    this.searchIndex = null;
    this.fuse = null;
    this.filteredResults = [];
    this.facets = {};
    this.sortOption = 'relevance';
    this.suggestions = [];
    this.isLoading = false;
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
          // Show loading indicator
          this.showLoadingIndicator();

          try {
            // Load search index only when search component is in viewport
            const response = await fetch('/reference/search-index.json');

            // Check if response is ok
            if (!response.ok) {
              throw new Error(`Failed to load search index: ${response.status} ${response.statusText}`);
            }

            const searchData = await response.json();

            // Validate search data
            if (!Array.isArray(searchData)) {
              throw new Error('Invalid search data format received');
            }

            // Initialize facets from search data
            this.initializeFacets(searchData);

            // Initialize Fuse.js with the search data
            const options = {
              keys: [
                { name: 'title', weight: 0.4 },
                { name: 'content', weight: 0.3 },
                { name: 'section', weight: 0.2 },
                { name: 'category', weight: 0.1 }
              ],
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

            // Hide loading indicator
            this.hideLoadingIndicator();

            // Track search initialization in analytics
            if (window.analytics) {
              window.analytics.trackCustomEvent('search_initialized', {
                timestamp: new Date().toISOString(),
                indexSize: searchData.length
              });
            }
          } catch (error) {
            // Hide loading indicator on error
            this.hideLoadingIndicator();

            // Provide specific error messaging
            let userMessage = 'Search functionality is temporarily unavailable.';
            if (error.message.includes('fetch') || error.message.includes('network')) {
              userMessage = 'Search is unavailable due to network issues. Please check your connection.';
            } else if (error.message.includes('JSON')) {
              userMessage = 'Search data is corrupted. Please try again later.';
            }

            // Display user-friendly error if feedback component is available
            if (window.feedbackComponent) {
              window.feedbackComponent.showToast(userMessage, 'error');
            }

            throw error;
          }
        }, (error) => {
          console.error('Failed to initialize search:', error);
          this.hideLoadingIndicator();

          // Fallback: Setup minimal event listeners so search input still works
          this.setupMinimalEventListeners();
        });
      });
    }
  }

  initializeFacets(searchData) {
    // Extract unique categories and sections for faceting
    const categories = [...new Set(searchData.map(item => item.category || 'Uncategorized'))];
    const sections = [...new Set(searchData.map(item => item.section || 'Other'))];

    this.facets = {
      categories: categories.map(category => ({ name: category, selected: false })),
      sections: sections.map(section => ({ name: section, selected: false }))
    };
  }

  /**
   * Setup minimal event listeners for graceful degradation
   */
  setupMinimalEventListeners() {
    this.safeExecute(() => {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        // Basic input handling for search
        searchInput.addEventListener('input', (e) => {
          // Show error message when user tries to search
          if (window.feedbackComponent && e.target.value.length >= 2) {
            window.feedbackComponent.showToast(
              'Search is currently unavailable. Please try again later.',
              'error'
            );
          }
        });

        // Show error on form submission
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
          searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.feedbackComponent) {
              window.feedbackComponent.showToast(
                'Search is currently unavailable. Please try again later.',
                'error'
              );
            }
          });
        }
      }
    }, (error) => {
      console.error('Error setting up minimal search event listeners:', error);
    });
  }

  /**
   * Show loading indicator in search input
   */
  showLoadingIndicator() {
    this.isLoading = true;
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.classList.add('loading');
      // Add loading spinner element if it doesn't exist
      let spinner = searchInput.parentNode.querySelector('.search-loading-spinner');
      if (!spinner) {
        spinner = document.createElement('div');
        spinner.className = 'search-loading-spinner';
        spinner.setAttribute('role', 'status');
        spinner.setAttribute('aria-label', 'Searching...');
        searchInput.parentNode.appendChild(spinner);
      }
      spinner.style.display = 'block';
    }
  }

  /**
   * Hide loading indicator in search input
   */
  hideLoadingIndicator() {
    this.isLoading = false;
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.classList.remove('loading');
      const spinner = searchInput.parentNode.querySelector('.search-loading-spinner');
      if (spinner) {
        spinner.style.display = 'none';
      }
    }
  }

  setupEventListeners() {
    this.safeExecute(() => {
      const searchInput = document.getElementById('search-input');
      const searchForm = document.querySelector('.search-form'); // Add form for better UX

      if (searchInput) {
        let searchTimeout;

        // Input event for search and auto-complete
        searchInput.addEventListener('input', (e) => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
              this.performSearch(query);
              this.generateSuggestions(query);
            } else if (query.length === 0) {
              this.clearResults();
              this.clearSuggestions();
            }
          }, 300); // Debounce search by 300ms
        });

        // Form submission handling
        if (searchForm) {
          searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length >= 2) {
              this.performSearch(query);
            }
          });
        }

        // Keydown events for keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
          this.handleKeyNavigation(e);
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

      // Setup facet and sort event listeners
      this.setupFacetListeners();
      this.setupSortListeners();
    }, (error) => {
      console.error('Error setting up search event listeners:', error);
    });
  }

  setupFacetListeners() {
    // Category facet listeners
    const categoryFilters = document.querySelectorAll('.facet-category');
    categoryFilters.forEach(filter => {
      filter.addEventListener('change', (e) => {
        const category = e.target.value;
        const isSelected = e.target.checked;

        // Update facet selection
        const categoryFacet = this.facets.categories.find(f => f.name === category);
        if (categoryFacet) {
          categoryFacet.selected = isSelected;
        }

        // Re-run search with facets
        this.applyFilters();
      });
    });

    // Section facet listeners
    const sectionFilters = document.querySelectorAll('.facet-section');
    sectionFilters.forEach(filter => {
      filter.addEventListener('change', (e) => {
        const section = e.target.value;
        const isSelected = e.target.checked;

        // Update facet selection
        const sectionFacet = this.facets.sections.find(f => f.name === section);
        if (sectionFacet) {
          sectionFacet.selected = isSelected;
        }

        // Re-run search with facets
        this.applyFilters();
      });
    });
  }

  setupSortListeners() {
    const sortSelect = document.getElementById('search-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortOption = e.target.value;
        this.applySorting();
      });
    }
  }

  handleKeyNavigation(e) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const results = resultsContainer.querySelectorAll('.search-result');
    if (results.length === 0) return;

    // Current focused element
    const currentFocused = document.activeElement;
    const currentIndex = Array.from(results).indexOf(currentFocused.closest('.search-result'));

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < results.length - 1) {
          results[currentIndex + 1].querySelector('a').focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          results[currentIndex - 1].querySelector('a').focus();
        } else if (currentIndex === 0) {
          // Focus back to search input
          document.getElementById('search-input').focus();
        }
        break;

      case 'Enter':
        // Allow default behavior for link activation
        break;

      case 'Escape':
        e.preventDefault();
        resultsContainer.classList.remove('show');
        document.getElementById('search-input').focus();
        break;
    }
  }

  performSearch(query) {
    this.safeExecute(() => {
      if (!this.fuse || query.length < 2) {
        this.displayResults([]);
        return;
      }

      // Perform search with Fuse.js
      const results = this.fuse.search(query);
      this.filteredResults = results.map(result => result.item);

      // Apply facets and sorting
      this.applyFilters();

      // Track search queries in analytics
      if (window.analytics && this.filteredResults.length > 0) {
        window.analytics.trackCustomEvent('search_performed', {
          query: query,
          resultCount: this.filteredResults.length,
          timestamp: new Date().toISOString()
        });
      }
    }, (error) => {
      console.error('Error performing search:', error);
      this.displayResults([]);
    });
  }

  applyFilters() {
    this.safeExecute(() => {
      let filtered = [...this.filteredResults];

      // Apply category filters
      const selectedCategories = this.facets.categories
        .filter(facet => facet.selected)
        .map(facet => facet.name);

      if (selectedCategories.length > 0) {
        filtered = filtered.filter(item =>
          selectedCategories.includes(item.category || 'Uncategorized')
        );
      }

      // Apply section filters
      const selectedSections = this.facets.sections
        .filter(facet => facet.selected)
        .map(facet => facet.name);

      if (selectedSections.length > 0) {
        filtered = filtered.filter(item =>
          selectedSections.includes(item.section || 'Other')
        );
      }

      // Apply sorting
      this.filteredResults = this.sortResults(filtered);
      this.displayResults(this.filteredResults);
    }, (error) => {
      console.error('Error applying filters:', error);
      this.displayResults(this.filteredResults);
    });
  }

  applySorting() {
    this.filteredResults = this.sortResults(this.filteredResults);
    this.displayResults(this.filteredResults);
  }

  sortResults(results) {
    switch (this.sortOption) {
      case 'relevance':
        // Results are already sorted by relevance from Fuse.js
        return results;

      case 'title':
        return [...results].sort((a, b) => a.title.localeCompare(b.title));

      case 'date':
        // Assuming items have a date property
        return [...results].sort((a, b) =>
          new Date(b.date || 0) - new Date(a.date || 0)
        );

      default:
        return results;
    }
  }

  generateSuggestions(query) {
    this.safeExecute(() => {
      if (!this.fuse) return;

      // Generate suggestions from search index
      const suggestions = this.fuse.search(query, { limit: 5 });
      this.suggestions = suggestions.map(suggestion => suggestion.item.title);

      this.displaySuggestions(this.suggestions);
    }, (error) => {
      console.error('Error generating suggestions:', error);
      this.clearSuggestions();
    });
  }

  displaySuggestions(suggestions) {
    this.safeExecute(() => {
      const suggestionsContainer = document.getElementById('search-suggestions');
      if (!suggestionsContainer) return;

      if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.classList.remove('show');
        return;
      }

      const html = suggestions.map(suggestion => `
        <div class="suggestion-item" role="option" tabindex="0">
          ${suggestion}
        </div>
      `).join('');

      suggestionsContainer.innerHTML = html;
      suggestionsContainer.classList.add('show');

      // Add click handlers for suggestions
      suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.value = item.textContent;
            this.performSearch(item.textContent);
            suggestionsContainer.classList.remove('show');
          }
        });

        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            item.click();
          }
        });
      });
    }, (error) => {
      console.error('Error displaying suggestions:', error);
      this.clearSuggestions();
    });
  }

  clearSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
      suggestionsContainer.classList.remove('show');
    }
  }

  displayResults(results) {
    this.safeExecute(() => {
      const resultsContainer = document.getElementById('search-results');
      const resultsCountElement = document.getElementById('results-count');
      if (!resultsContainer) return;

      if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
        if (resultsCountElement) {
          resultsCountElement.textContent = '0 results';
        }
        return;
      }

      // Limit results to 20 items for better performance
      const limitedResults = results.slice(0, 20);

      const html = limitedResults.map(item => `
        <div class="search-result">
          <a href="${item.url}">
            <h3>${item.title}</h3>
            <p class="search-result-meta">
              <span class="search-result-category">${item.category || 'General'}</span>
              <span class="search-result-section">${item.section || ''}</span>
            </p>
            <p>${this.highlightMatches(item.content, item.matches)}</p>
          </a>
        </div>
      `).join('');

      resultsContainer.innerHTML = html;

      // Update results count
      if (resultsCountElement) {
        resultsCountElement.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
      }
    }, (error) => {
      console.error('Error displaying search results:', error);
      const resultsContainer = document.getElementById('search-results');
      if (resultsContainer) {
        resultsContainer.innerHTML = '<p class="no-results">Error displaying search results</p>';
      }
    });
  }

  clearResults() {
    const resultsContainer = document.getElementById('search-results');
    const resultsCountElement = document.getElementById('results-count');
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      resultsContainer.classList.remove('show');
    }
    if (resultsCountElement) {
      resultsCountElement.textContent = '';
    }
  }

  highlightMatches(content, matches) {
    // Safe execution wrapper for match highlighting
    try {
      if (!matches || matches.length === 0) {
        return content.substring(0, 150) + '...';
      }

      // Extract content matches and sort by position
      const contentMatches = matches
        .filter(match => match.key === 'content')
        .flatMap(match => match.indices)
        .sort((a, b) => a[0] - b[0]);

      if (contentMatches.length === 0) {
        return content.substring(0, 150) + '...';
      }

      // Highlight matched terms in the content
      let highlightedContent = '';
      let lastIndex = 0;

      // Process each match
      for (const [start, end] of contentMatches) {
        // Add text before the match
        highlightedContent += content.substring(lastIndex, start);
        // Add highlighted match
        highlightedContent += `<mark>${content.substring(start, end + 1)}</mark>`;
        lastIndex = end + 1;
      }

      // Add remaining text after last match
      highlightedContent += content.substring(lastIndex);

      // Return excerpt around first match (better UX)
      const firstMatchStart = contentMatches[0][0];
      const excerptStart = Math.max(0, firstMatchStart - 60);
      const excerptEnd = Math.min(highlightedContent.length, excerptStart + 200);

      let excerpt = highlightedContent.substring(excerptStart, excerptEnd);

      // Add ellipsis if needed
      if (excerptStart > 0) {
        excerpt = '...' + excerpt;
      }
      if (excerptEnd < highlightedContent.length) {
        excerpt = excerpt + '...';
      }

      return excerpt;
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
