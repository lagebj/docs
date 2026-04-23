// Lazy loading utility for components using Intersection Observer API
// This helps defer loading of non-critical components until they're needed

export class LazyLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    };
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.options
      );
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      this.observer = null;
      console.warn('IntersectionObserver not supported, lazy loading disabled');
    }
  }
  
  /**
   * Observe an element for lazy loading
   * @param {HTMLElement} element - Element to observe
   * @param {Function} callback - Function to call when element is in viewport
   */
  observe(element, callback) {
    if (!this.observer) {
      // If IntersectionObserver is not supported, call callback immediately
      callback();
      return;
    }
    
    // Store callback as data attribute on element
    element._lazyLoadCallback = callback;
    this.observer.observe(element);
  }
  
  /**
   * Stop observing an element
   * @param {HTMLElement} element - Element to stop observing
   */
  unobserve(element) {
    if (this.observer) {
      this.observer.unobserve(element);
      delete element._lazyLoadCallback;
    }
  }
  
  /**
   * Handle intersection events
   * @param {IntersectionObserverEntry[]} entries - Entries that have intersected
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is in viewport, call the callback
        const callback = entry.target._lazyLoadCallback;
        if (callback) {
          callback(entry.target);
        }
        
        // Stop observing this element
        this.unobserve(entry.target);
      }
    });
  }
  
  /**
   * Load component when it enters the viewport
   * @param {string} selector - CSS selector for elements to lazy load
   * @param {Function} loader - Function to load/create the component
   */
  static loadOnDemand(selector, loader) {
    const lazyLoader = new LazyLoader();
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      lazyLoader.observe(element, () => {
        loader(element);
      });
    });
  }
  
  /**
   * Lazy load images with native loading="lazy" as fallback
   * @param {string} selector - CSS selector for images to lazy load
   */
  static lazyLoadImages(selector = 'img[data-src]') {
    const images = document.querySelectorAll(selector);
    
    // Native lazy loading as progressive enhancement
    images.forEach(img => {
      if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        img.loading = 'lazy';
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      } else if ('IntersectionObserver' in window) {
        // Use IntersectionObserver for lazy loading
        const lazyLoader = new LazyLoader();
        lazyLoader.observe(img, () => {
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.classList.remove('lazy');
        });
      } else {
        // Immediate loading fallback
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.remove('lazy');
      }
    });
  }
}

// Auto-initialize lazy loading of images
document.addEventListener('DOMContentLoaded', () => {
  LazyLoader.lazyLoadImages();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LazyLoader };
}