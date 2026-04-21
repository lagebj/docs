// Simple analytics implementation for tracking UX metrics
class AnalyticsTracker {
  constructor() {
    this.init();
  }

  init() {
    // Track page views
    this.trackPageView();
    
    // Track outbound link clicks
    this.trackOutboundLinks();
    
    // Track search usage
    this.trackSearch();
    
    // Track feedback responses
    this.trackFeedback();
  }

  trackPageView() {
    // Simple page view tracking
    if (window.plausible) {
      window.plausible('pageview');
    }
    
    // Custom event for documentation page views
    this.sendEvent('doc_page_view', {
      path: window.location.pathname,
      title: document.title
    });
  }

  trackOutboundLinks() {
    // Track clicks on outbound links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.hostname && link.hostname !== window.location.hostname) {
        this.sendEvent('outbound_link_click', {
          url: link.href,
          text: link.textContent.trim()
        });
      }
    });
  }

  trackSearch() {
    // Track search usage
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      let searchTimeout;
      
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          if (e.target.value.length > 2) {
            this.sendEvent('search_query', {
              query: e.target.value
            });
          }
        }, 1000);
      });
      
      // Track search result clicks
      const resultsContainer = document.getElementById('search-results');
      if (resultsContainer) {
        resultsContainer.addEventListener('click', (e) => {
          const resultLink = e.target.closest('a');
          if (resultLink) {
            this.sendEvent('search_result_click', {
              url: resultLink.href,
              query: searchInput.value
            });
          }
        });
      }
    }
  }

  trackFeedback() {
    // Track feedback responses
    document.addEventListener('click', (e) => {
      const feedbackBtn = e.target.closest('.feedback-btn');
      if (feedbackBtn) {
        const feedbackType = feedbackBtn.dataset.feedback;
        this.sendEvent('feedback_response', {
          type: feedbackType,
          path: window.location.pathname
        });
      }
    });
  }

  sendEvent(eventName, props = {}) {
    // Send event to analytics service
    if (window.plausible) {
      window.plausible(eventName, { props });
    }
    
    // For demonstration, log to console
    console.log('Analytics Event:', eventName, props);
  }

  // Method to track custom events
  trackCustomEvent(eventName, props = {}) {
    this.sendEvent(eventName, props);
  }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.analytics = new AnalyticsTracker();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnalyticsTracker;
}