// Design Tokens: Motion
// Consistent animation and transition behaviors

export const motion = {
  // Transition Durations
  'duration-instant': '0ms',
  'duration-fast': '150ms',
  'duration-medium': '200ms',
  'duration-slow': '300ms',
  'duration-slower': '500ms',
  
  // Transition Timing Functions
  'timing-function-linear': 'linear',
  'timing-function-ease': 'ease',
  'timing-function-ease-in': 'ease-in',
  'timing-function-ease-out': 'ease-out',
  'timing-function-ease-in-out': 'ease-in-out',
  
  // Custom Timing Functions
  'timing-function-gs-ease': 'cubic-bezier(0.4, 0, 0.2, 1)', // From Tailwind config
  
  // Animation Easing
  'animation-ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'animation-ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'animation-ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Opacity Transitions
  'opacity-transition-enter': 'opacity 150ms ease-out',
  'opacity-transition-exit': 'opacity 150ms ease-in',
};