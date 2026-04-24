// Base component class with error handling
export class ComponentBase {
  async safeExecute(fn, errorHandler) {
    try {
      return await fn();
    } catch (error) {
      this.handleError(error, errorHandler);
    }
  }
  
  handleError(error, customHandler) {
    // Log error with context
    console.error('Component error:', {
      component: this.constructor.name,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    // Display user-friendly error messages
    // Track error with analytics if available
    if (window.analytics) {
      window.analytics.trackCustomEvent('component_error', {
        component: this.constructor.name,
        errorType: error.constructor.name,
        errorMessage: error.message,
        url: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    }
    
    // Display user-friendly error notification if feedback component is available
    if (window.feedbackComponent) {
      // Different error messages based on error type
      let userMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.name === 'NetworkError' || error.message.includes('fetch')) {
        userMessage = 'Network error. Please check your connection and try again.';
      } else if (error.name === 'SyntaxError') {
        userMessage = 'Data format error. Some features may not work correctly.';
      } else if (error.message.includes('timeout')) {
        userMessage = 'Request timed out. Please try again.';
      }
      
      // Show error toast notification
      window.feedbackComponent.showToast(userMessage, 'error');
    }
    
    if (customHandler) {
      customHandler(error);
    } else {
      this.defaultErrorHandler(error);
    }
  }
  
  defaultErrorHandler(error) {
    // Graceful degradation strategies
    console.warn(`Gracefully degrading ${this.constructor.name} component due to error:`, error.message);
    
    // Attempt to recover or provide fallback functionality
    // This could be overridden by specific components
    this.attemptRecovery(error);
  }
  
  attemptRecovery(error) {
    // Default recovery strategy - try to re-initialize component after a delay
    console.log(`Attempting recovery for ${this.constructor.name} component...`);
    
    // Clear any existing timeouts for this component
    if (this.recoveryTimeout) {
      clearTimeout(this.recoveryTimeout);
    }
    
    // Try to re-initialize after 5 seconds
    this.recoveryTimeout = setTimeout(() => {
      console.log(`Re-initializing ${this.constructor.name} component...`);
      // This would need to be implemented by each component
      if (this.init && typeof this.init === 'function') {
        this.init().catch(recoveryError => {
          console.error(`Failed to recover ${this.constructor.name} component:`, recoveryError.message);
        });
      }
    }, 5000);
  }
}