// Mobile navigation component with enhanced accessibility and touch optimization
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navTabs = document.querySelector('.gs-navbar .gs-nav-tabs');
  const hamburger = document.querySelector('.hamburger');
  
  if (mobileMenuToggle && navTabs && hamburger) {
    // Set initial aria attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-controls', 'mobile-navigation');
    navTabs.setAttribute('role', 'menubar');
    
    // Improve touch targets
    mobileMenuToggle.style.minHeight = '44px'; // Minimum touch target size
    mobileMenuToggle.style.minWidth = '44px';
    
    mobileMenuToggle.addEventListener('click', () => {
      navTabs.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Set aria-expanded attribute for accessibility
      const isExpanded = navTabs.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      
      // Focus first link when menu opens
      if (isExpanded) {
        const firstLink = navTabs.querySelector('a');
        if (firstLink) {
          firstLink.focus();
        }
      }
    });
    
    // Keyboard navigation support
    mobileMenuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenuToggle.click();
      }
    });
    
    // Add keyboard navigation within the menu
    navTabs.addEventListener('keydown', (e) => {
      const links = navTabs.querySelectorAll('a');
      if (links.length === 0) return;
      
      const currentIndex = Array.from(links).indexOf(document.activeElement);
      
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          navTabs.classList.remove('active');
          hamburger.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          mobileMenuToggle.focus();
          break;
          
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < links.length - 1) {
            links[currentIndex + 1].focus();
          }
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            links[currentIndex - 1].focus();
          } else {
            // Focus goes back to the toggle button
            mobileMenuToggle.focus();
          }
          break;
          
        case 'Home':
          e.preventDefault();
          links[0].focus();
          break;
          
        case 'End':
          e.preventDefault();
          links[links.length - 1].focus();
          break;
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navTabs.classList.contains('active') && 
          !navTabs.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        navTabs.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navTabs.classList.contains('active')) {
        navTabs.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Add focus trapping when menu is open
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    // Trap focus within the mobile menu when it's open
    navTabs.addEventListener('keydown', (e) => {
      if (!navTabs.classList.contains('active')) return;
      
      const focusableElementsInMenu = navTabs.querySelectorAll(focusableElements);
      const firstFocusable = focusableElementsInMenu[0];
      const lastFocusable = focusableElementsInMenu[focusableElementsInMenu.length - 1];
      
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
    
    // Add touch optimization for navigation links
    const navLinks = navTabs.querySelectorAll('a');
    navLinks.forEach(link => {
      // Ensure minimum touch target size
      link.style.minHeight = '44px';
      link.style.display = 'flex';
      link.style.alignItems = 'center';
      
      // Add touch-specific styles
      link.addEventListener('touchstart', () => {
        link.classList.add('touch-active');
      });
      
      link.addEventListener('touchend', () => {
        link.classList.remove('touch-active');
      });
    });
  }
  
  // Add skip link for keyboard users
  createSkipLink();
});

// Create skip link for keyboard navigation
function createSkipLink() {
  // Check if skip link already exists
  if (document.getElementById('skip-link')) return;
  
  const skipLink = document.createElement('a');
  skipLink.id = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  
  // Add to beginning of body
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add styles for skip link
  const style = document.createElement('style');
  style.textContent = `
    .skip-link {
      position: fixed;
      top: -40px;
      left: 0;
      background: #1e40af;
      color: white;
      padding: 8px;
      z-index: 10000;
      transition: top 0.2s;
    }
    
    .skip-link:focus {
      top: 0;
    }
  `;
  document.head.appendChild(style);
}

// Base component class with error handling
class ComponentBase {
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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ComponentBase };
}