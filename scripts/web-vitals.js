// Web Vitals monitoring script
// Implements Core Web Vitals tracking using the web-vitals library

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * Web Vitals Tracker Class
 * Tracks Core Web Vitals metrics and sends them to analytics
 */
class WebVitalsTracker {
  constructor() {
    this.init();
  }

  /**
   * Initialize Web Vitals tracking
   */
  init() {
    // Only track in production environment
    if (process.env.NODE_ENV === 'production') {
      this.trackCoreWebVitals();
    } else {
      // In development, still track but with console logging
      this.trackCoreWebVitals(true);
    }
  }

  /**
   * Track Core Web Vitals metrics
   * @param {boolean} debug - Whether to log metrics to console
   */
  trackCoreWebVitals(debug = false) {
    // Track Cumulative Layout Shift
    getCLS((metric) => {
      this.sendMetric('CLS', metric, debug);
    });

    // Track First Input Delay
    getFID((metric) => {
      this.sendMetric('FID', metric, debug);
    });

    // Track First Contentful Paint
    getFCP((metric) => {
      this.sendMetric('FCP', metric, debug);
    });

    // Track Largest Contentful Paint
    getLCP((metric) => {
      this.sendMetric('LCP', metric, debug);
    });

    // Track Time to First Byte
    getTTFB((metric) => {
      this.sendMetric('TTFB', metric, debug);
    });
  }

  /**
   * Send metric to analytics service
   * @param {string} name - Metric name
   * @param {Object} metric - Metric object from web-vitals library
   * @param {boolean} debug - Whether to log to console
   */
  sendMetric(name, metric, debug = false) {
    // Send to analytics service if available
    if (window.analytics) {
      window.analytics.trackCustomEvent('web_vitals', {
        metricName: name,
        value: metric.value,
        rating: this.getRating(name, metric.value),
        navigationType: metric.navigationType,
        timestamp: new Date().toISOString()
      });
    }

    // Also send to plausible if available
    if (window.plausible) {
      window.plausible('web_vitals', {
        props: {
          metricName: name,
          value: metric.value,
          rating: this.getRating(name, metric.value),
          navigationType: metric.navigationType
        }
      });
    }

    // Log to console in debug mode
    if (debug) {
      console.log(`Web Vitals - ${name}:`, metric);
    }
  }

  /**
   * Get rating for a metric value
   * @param {string} name - Metric name
   * @param {number} value - Metric value
   * @returns {string} Rating (good, needs-improvement, poor)
   */
  getRating(name, value) {
    switch (name) {
      case 'CLS':
        if (value <= 0.1) return 'good';
        if (value <= 0.25) return 'needs-improvement';
        return 'poor';
      case 'FID':
        if (value <= 100) return 'good';
        if (value <= 300) return 'needs-improvement';
        return 'poor';
      case 'FCP':
        if (value <= 1800) return 'good';
        if (value <= 3000) return 'needs-improvement';
        return 'poor';
      case 'LCP':
        if (value <= 2500) return 'good';
        if (value <= 4000) return 'needs-improvement';
        return 'poor';
      case 'TTFB':
        if (value <= 800) return 'good';
        if (value <= 1800) return 'needs-improvement';
        return 'poor';
      default:
        return 'unknown';
    }
  }
}

// Initialize Web Vitals tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add slight delay to ensure analytics is loaded
  setTimeout(() => {
    new WebVitalsTracker();
  }, 1000);
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebVitalsTracker;
}