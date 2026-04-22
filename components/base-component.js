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
    
    if (customHandler) {
      customHandler(error);
    } else {
      this.defaultErrorHandler(error);
    }
  }
  
  defaultErrorHandler(error) {
    // Graceful degradation strategies
    console.warn(`Gracefully degrading ${this.constructor.name} component due to error:`, error.message);
  }
}