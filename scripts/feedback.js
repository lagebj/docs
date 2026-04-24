// Enhanced feedback.js with standardized components

/**
 * Enhanced Feedback component with toast notifications, banners, and modals.
 * This script provides a complete feedback system with loading states and animations.
 */

import { ComponentBase } from '../components/base-component.js';
import { LazyLoader } from '../components/lazy-loader.js';

class FeedbackComponent extends ComponentBase {
  constructor() {
    super();
    this.toastContainer = null;
    this.init();
  }

  init() {
    // Create toast container
    this.createToastContainer();

    // Handle click events for all feedback components
    document.addEventListener('click', (e) => {
      // Handle feedback buttons
      if (e.target.classList.contains('feedback-btn')) {
        this.safeExecute(() => {
          this.handleFeedbackClick(e.target);
        }, (error) => {
          console.error('Error handling feedback click:', error);
        });
      }

      // Handle modal triggers
      if (e.target.classList.contains('modal-trigger')) {
        this.safeExecute(() => {
          this.openModal(e.target.dataset.modalTarget);
        }, (error) => {
          console.error('Error opening modal:', error);
        });
      }

      // Handle modal close
      if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
        this.safeExecute(() => {
          this.closeModal(e.target.closest('.feedback-modal'));
        }, (error) => {
          console.error('Error closing modal:', error);
        });
      }
    });

    // Handle keyboard events globally
    document.addEventListener('keydown', (e) => {
      // Handle Enter and Space keys for feedback buttons
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('feedback-btn')) {
        e.preventDefault();
        this.safeExecute(() => {
          this.handleFeedbackClick(e.target);
        }, (error) => {
          console.error('Error handling feedback keyboard event:', error);
        });
      }

      // Handle Escape key to close feedback response or modals
      if (e.key === 'Escape') {
        this.safeExecute(() => {
          // Close feedback response
          const responseDiv = document.querySelector('.feedback-response[style*="display: block"]');
          if (responseDiv) {
            responseDiv.style.display = 'none';
            // Focus back to the button that opened it
            const feedbackBtn = responseDiv.closest('.feedback-component').querySelector('.feedback-btn');
            if (feedbackBtn) {
              feedbackBtn.focus();
            }
          }

          // Close modals
          const openModal = document.querySelector('.feedback-modal.active');
          if (openModal) {
            this.closeModal(openModal);
          }
        }, (error) => {
          console.error('Error handling escape key:', error);
        });
      }
    });
  }

  /**
   * Create container for toast notifications
   */
  createToastContainer() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.id = 'feedback-toast-container';
    this.toastContainer.className = 'toast-container';
    this.toastContainer.setAttribute('role', 'alert');
    this.toastContainer.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.toastContainer);

    // Add styles for toast container
    const style = document.createElement('style');
    style.textContent = `
      .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      }

      .toast {
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 14px;
        animation: slideInUp 0.3s ease forwards;
        pointer-events: auto;
        display: flex;
        align-items: center;
        gap: 8px;
        max-width: 350px;
      }

      .toast.success {
        background: #dcfce7;
        border: 1px solid #bbf7d0;
        color: #15803d;
      }

      .toast.error {
        background: #fee2e2;
        border: 1px solid #fecaca;
        color: #b91c1c;
      }

      .toast.info {
        background: #dbeafe;
        border: 1px solid #bfdbfe;
        color: #1d4ed8;
      }

      .toast-close {
        background: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
        padding: 0;
        margin: 0 0 0 auto;
        opacity: 0.7;
      }

      .toast-close:hover {
        opacity: 1;
      }

      @keyframes slideInUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
          transform: translateY(-20px);
        }
      }

      .fade-out {
        animation: fadeOut 0.3s ease forwards;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Handle feedback button click/keyboard activation
   * @param {HTMLElement} button - The feedback button element
   */
  handleFeedbackClick(button) {
    const feedbackType = button.dataset.feedback;
    const responseDiv = button.closest('.feedback-component').querySelector('.feedback-response');
    const showResponse = button.dataset.showResponse !== 'false';

    // Show loading state if requested
    if (button.dataset.loading === 'true') {
      this.showLoadingState(button);
    }

    if (feedbackType === 'positive') {
      if (showResponse && responseDiv) {
        responseDiv.innerHTML = '<p>Thank you for your feedback! 🙏</p>';
        responseDiv.style.background = 'rgba(219, 234, 254, 0.5)';
        responseDiv.style.display = 'block';

        // Focus the response div for screen readers
        responseDiv.setAttribute('tabindex', '-1');
        responseDiv.focus();
      }

      // Show success toast
      this.showToast('Thank you for your positive feedback!', 'success');
    } else if (feedbackType === 'negative') {
      if (showResponse && responseDiv) {
        responseDiv.innerHTML = '<p>Thank you for your feedback. We\'ll use it to improve our documentation.</p><p><a href="https://github.com/lagebj/docs/issues/new" style="color: #1e40af; text-decoration: underline;">Report an issue</a></p>';
        responseDiv.style.background = 'rgba(254, 226, 226, 0.5)';
        responseDiv.style.display = 'block';

        // Focus the response div for screen readers
        responseDiv.setAttribute('tabindex', '-1');
        responseDiv.focus();
      }

      // Show info toast
      this.showToast('We appreciate your feedback to help us improve.', 'info');
    } else if (feedbackType === 'custom') {
      // Handle custom feedback actions
      const action = button.dataset.action;
      switch (action) {
        case 'copy':
          this.copyToClipboard(button.dataset.copyText || '');
          this.showToast('Copied to clipboard!', 'success');
          break;
        case 'share':
          this.shareContent(button.dataset.shareText || '', button.dataset.shareUrl || window.location.href);
          this.showToast('Shared successfully!', 'success');
          break;
        default:
          this.showToast('Action completed!', 'info');
      }
    }

    // Remove loading state
    if (button.dataset.loading === 'true') {
      this.hideLoadingState(button);
    }

    // Track feedback event
    if (window.analytics) {
      window.analytics.trackCustomEvent('feedback_response', {
        type: feedbackType,
        path: window.location.pathname,
        action: button.dataset.action || 'click'
      });
    }
  }

  /**
   * Show loading state on button
   * @param {HTMLElement} button - The button element
   */
  showLoadingState(button) {
    button.originalText = button.innerHTML;
    button.innerHTML = '<span class="loading-spinner"></span> Processing...';
    button.disabled = true;

    // Add loading spinner styles if not already present
    if (!document.getElementById('loading-spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'loading-spinner-styles';
      style.textContent = `
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Hide loading state on button
   * @param {HTMLElement} button - The button element
   */
  hideLoadingState(button) {
    if (button.originalText) {
      button.innerHTML = button.originalText;
    }
    button.disabled = false;
  }

  /**
   * Show toast notification
   * @param {string} message - The message to display
   * @param {string} type - The type of toast (success, error, info)
   */
  showToast(message, type = 'info') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');

    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    this.toastContainer.appendChild(toast);

    // Add close event listener
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      this.hideToast(toast);
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.hideToast(toast);
    }, 5000);
  }

  /**
   * Hide toast notification
   * @param {HTMLElement} toast - The toast element to hide
   */
  hideToast(toast) {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }

  /**
   * Copy text to clipboard
   * @param {string} text - The text to copy
   */
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  /**
   * Share content
   * @param {string} text - The text to share
   * @param {string} url - The URL to share
   */
  async shareContent(text, url) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: text,
          url: url
        });
      } catch (err) {
        console.error('Error sharing:', err);
        // Fallback to copying URL
        this.copyToClipboard(url);
      }
    } else {
      // Fallback to copying URL
      this.copyToClipboard(url);
    }
  }

  /**
   * Open modal dialog
   * @param {string} modalId - The ID of the modal to open
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');

      // Focus first focusable element in modal
      const firstFocusable = modal.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }

      // Trap focus within modal
      this.trapFocus(modal);
    }
  }

  /**
   * Close modal dialog
   * @param {HTMLElement} modal - The modal element to close
   */
  closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');

      // Return focus to the element that opened the modal
      const trigger = document.querySelector(`[data-modal-target="${modal.id}"]`);
      if (trigger) {
        trigger.focus();
      }
    }
  }

  /**
   * Trap focus within an element
   * @param {HTMLElement} element - The element to trap focus within
   */
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });
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
        if (!button.hasAttribute('aria-label')) {
          button.setAttribute('aria-label', button.dataset.feedback === 'positive' ? 'Rate this page positively' : 'Rate this page negatively');
        }
      });

      // Ensure response div has proper aria attributes
      const responseDiv = component.querySelector('.feedback-response');
      if (responseDiv) {
        responseDiv.setAttribute('role', 'alert');
        responseDiv.setAttribute('aria-live', 'polite');
      }
    });

    // Initialize modals
    const modals = document.querySelectorAll('.feedback-modal');
    modals.forEach(modal => {
      modal.setAttribute('aria-hidden', 'true');

      // Ensure close buttons have proper attributes
      const closeButtons = modal.querySelectorAll('.modal-close');
      closeButtons.forEach(button => {
        button.setAttribute('aria-label', 'Close dialog');
      });
    });
  }
}

// Initialize the feedback component
const feedbackComponent = new FeedbackComponent();
window.feedbackComponent = feedbackComponent;

// Global functions for backward compatibility
window.handleFeedbackClick = function(button) {
  feedbackComponent.handleFeedbackClick(button);
};

// Initialize feedback components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  feedbackComponent.initializeFeedbackComponents();
});
