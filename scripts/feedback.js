// feedback.js

/**
 * Feedback component event handling with keyboard navigation support and error handling.
 * This script is imported by the site layout (or injected where the component is used).
 */

import { ComponentBase } from '../components/base-component.js';
import { LazyLoader } from '../components/lazy-loader.js';

class FeedbackComponent extends ComponentBase {
  constructor() {
    super();
    this.init();
  }
  
  init() {
    // Set up lazy loading for feedback components
    const feedbackContainers = document.querySelectorAll('.feedback-component');
    
    if (feedbackContainers.length > 0) {
      const lazyLoader = new LazyLoader({
        rootMargin: '100px' // Start loading 100px before entering viewport
      });
      
      feedbackContainers.forEach(container => {
        lazyLoader.observe(container, () => {
          this.setupEventListeners(container);
          this.safeExecute(() => {
            this.initializeFeedbackComponent(container);
          }, (error) => {
            console.error('Error initializing feedback component:', error);
          });
        });
      });
    }
  }
  
  /**
   * Set up event listeners for a feedback container
   * @param {HTMLElement} container - Feedback component container
   */
  setupEventListeners(container) {
    // Handle click events
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('feedback-btn')) {
        this.safeExecute(() => {
          this.handleFeedbackClick(e.target);
        }, (error) => {
          console.error('Error handling feedback click:', error);
        });
      }
    });

    // Handle keyboard events for accessibility
    container.addEventListener('keydown', (e) => {
      // Handle Enter and Space keys for feedback buttons
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('feedback-btn')) {
          e.preventDefault();
          this.safeExecute(() => {
            this.handleFeedbackClick(e.target);
          }, (error) => {
            console.error('Error handling feedback keyboard event:', error);
          });
        }
      }
      
      // Handle Escape key to close feedback response
      if (e.key === 'Escape') {
        this.safeExecute(() => {
          const responseDiv = container.querySelector('.feedback-response[style*="display: block"]');
          if (responseDiv) {
            responseDiv.style.display = 'none';
            // Focus back to the button that opened it
            const feedbackBtn = responseDiv.closest('.feedback-component').querySelector('.feedback-btn');
            if (feedbackBtn) {
              feedbackBtn.focus();
            }
          }
        }, (error) => {
          console.error('Error handling escape key:', error);
        });
      }
    });
  }
  
  /**
   * Handle feedback button click/keyboard activation
   * @param {HTMLElement} button - The feedback button element
   */
  handleFeedbackClick(button) {
    const feedbackType = button.dataset.feedback;
    const responseDiv = button.closest('.feedback-component').querySelector('.feedback-response');

    if (feedbackType === 'positive') {
      responseDiv.innerHTML = '<p>Thank you for your feedback! 🙏</p>';
      responseDiv.style.background = 'rgba(219, 234, 254, 0.5)';
    } else {
      responseDiv.innerHTML = '<p>Thank you for your feedback. We\'ll use it to improve our documentation.</p><p><a href="https://github.com/lagebj/docs/issues/new" style="color: #1e40af; text-decoration: underline;">Report an issue</a></p>';
      responseDiv.style.background = 'rgba(254, 226, 226, 0.5)';
    }
    responseDiv.style.display = 'block';
    
    // Focus the response div for screen readers
    responseDiv.setAttribute('tabindex', '-1');
    responseDiv.focus();

    // Track feedback event
    if (window.analytics) {
      window.analytics.trackCustomEvent('feedback_response', {
        type: feedbackType,
        path: window.location.pathname,
      });
    }
  }

  /**
   * Initialize a feedback component with accessibility attributes
   * @param {HTMLElement} component - Feedback component container
   */
  initializeFeedbackComponent(component) {
    // Ensure buttons are focusable and have proper aria attributes
    const buttons = component.querySelectorAll('.feedback-btn');
    buttons.forEach(button => {
      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
      button.setAttribute('aria-label', button.dataset.feedback === 'positive' ? 'Rate this page positively' : 'Rate this page negatively');
    });
    
    // Ensure response div has proper aria attributes
    const responseDiv = component.querySelector('.feedback-response');
    if (responseDiv) {
      responseDiv.setAttribute('role', 'alert');
      responseDiv.setAttribute('aria-live', 'polite');
    }
  }
}

// Initialize the feedback component
document.addEventListener('DOMContentLoaded', () => {
  new FeedbackComponent();
});
