// feedback.js

/**
 * Feedback component event handling with keyboard navigation support and error handling.
 * This script is imported by the site layout (or injected where the component is used).
 */

import { ComponentBase } from '../components/base-component.js';

class FeedbackComponent extends ComponentBase {
  constructor() {
    super();
    this.init();
  }
  
  init() {
    // Handle click events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('feedback-btn')) {
        this.safeExecute(() => {
          this.handleFeedbackClick(e.target);
        }, (error) => {
          console.error('Error handling feedback click:', error);
        });
      }
    });

    // Handle keyboard events for accessibility
    document.addEventListener('keydown', (e) => {
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
          const responseDiv = document.querySelector('.feedback-response[style*="display: block"]');
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

    // Initialize feedback components when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.safeExecute(() => {
        this.initializeFeedbackComponents();
      }, (error) => {
        console.error('Error initializing feedback components:', error);
      });
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
   * Initialize feedback components with accessibility attributes
   */
  initializeFeedbackComponents() {
    const feedbackComponents = document.querySelectorAll('.feedback-component');
    
    feedbackComponents.forEach(component => {
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
    });
  }
}

// Initialize the feedback component
new FeedbackComponent();

// Handle keyboard events for accessibility
document.addEventListener('keydown', (e) => {
  // Handle Enter and Space keys for feedback buttons
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.classList.contains('feedback-btn')) {
      e.preventDefault();
      handleFeedbackClick(e.target);
    }
  }
  
  // Handle Escape key to close feedback response
  if (e.key === 'Escape') {
    const responseDiv = document.querySelector('.feedback-response[style*="display: block"]');
    if (responseDiv) {
      responseDiv.style.display = 'none';
      // Focus back to the button that opened it
      const feedbackBtn = responseDiv.closest('.feedback-component').querySelector('.feedback-btn');
      if (feedbackBtn) {
        feedbackBtn.focus();
      }
    }
  }
});

/**
 * Handle feedback button click/keyboard activation
 * @param {HTMLElement} button - The feedback button element
 */
function handleFeedbackClick(button) {
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

// Initialize feedback components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const feedbackComponents = document.querySelectorAll('.feedback-component');
  
  feedbackComponents.forEach(component => {
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
  });
});
