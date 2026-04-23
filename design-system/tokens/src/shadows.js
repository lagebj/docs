// Design Tokens: Shadows
// Consistent elevation and depth effects

export const shadows = {
  // Shadow Levels
  'shadow-none': 'none',
  'shadow-xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'shadow-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  'shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Custom Shadows from Tailwind Config
  'shadow-gs-chrome': '0 14px 34px rgba(30, 64, 175, 0.12)',
  'shadow-gs-card': '0 14px 34px rgba(30, 64, 175, 0.12)',
  
  // Focus Shadows
  'shadow-focus': '0 0 0 3px rgba(30, 64, 175, 0.2)',
  'shadow-focus-success': '0 0 0 3px rgba(5, 150, 105, 0.2)',
  'shadow-focus-warning': '0 0 0 3px rgba(217, 119, 6, 0.2)',
  'shadow-focus-danger': '0 0 0 3px rgba(220, 38, 38, 0.2)',
};