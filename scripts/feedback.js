// feedback.js

/**
 * Feedback component event handling.
 * This script is imported by the site layout (or injected where the component is used).
 */

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('feedback-btn')) {
    const feedbackType = e.target.dataset.feedback;
    const responseDiv = e.target.closest('.feedback-component').querySelector('.feedback-response');

    if (feedbackType === 'positive') {
      responseDiv.innerHTML = '<p>Thank you for your feedback! 🙏</p>';
      responseDiv.style.background = 'rgba(219, 234, 254, 0.5)';
    } else {
      responseDiv.innerHTML = '<p>Thank you for your feedback. We\'ll use it to improve our documentation.</p><p><a href="https://github.com/lagebj/docs/issues/new" style="color: #1e40af; text-decoration: underline;">Report an issue</a></p>';
      responseDiv.style.background = 'rgba(254, 226, 226, 0.5)';
    }
    responseDiv.style.display = 'block';

    // Track feedback event
    if (window.analytics) {
      window.analytics.trackCustomEvent('feedback_response', {
        type: feedbackType,
        path: window.location.pathname,
      });
    }
  }
});
