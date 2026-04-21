// Mobile navigation component
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navTabs = document.querySelector('#navbar .nav-tabs');
  const hamburger = document.querySelector('.hamburger');
  
  if (mobileMenuToggle && navTabs && hamburger) {
    mobileMenuToggle.addEventListener('click', () => {
      navTabs.classList.toggle('active');
      hamburger.classList.toggle('active');
      
      // Set aria-expanded attribute for accessibility
      const isExpanded = navTabs.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navTabs.classList.contains('active') && 
          !navTabs.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        navTabs.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', false);
      }
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navTabs.classList.contains('active')) {
        navTabs.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', false);
      }
    });
  }
});