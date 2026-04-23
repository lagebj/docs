// Design Tokens: Colors
// Semantic color names that map to functional purposes

export const palette = {
  // Brand Colors
  'brand-blue': '#1e40af',
  'brand-slate': '#334155',
  
  // State Colors
  'success': '#059669',
  'warning': '#d97706',
  'danger': '#dc2626',
  
  // Neutral Colors
  'white': '#ffffff',
  'black': '#000000',
  'gray-50': '#f8fafc',
  'gray-100': '#f1f5f9',
  'gray-200': '#e2e8f0',
  'gray-300': '#cbd5e1',
  'gray-400': '#94a3b8',
  'gray-500': '#64748b',
  'gray-600': '#475569',
  'gray-700': '#334155',
  'gray-800': '#1e293b',
  'gray-900': '#0f172a',
};

export const colors = {
  // Brand Tokens
  'brand-primary': palette['brand-blue'],
  'brand-secondary': palette['brand-slate'],
  
  // Surface Tokens
  'surface-background': palette['white'],
  'surface-card': palette['gray-50'],
  'surface-soft': 'linear-gradient(180deg, rgba(219, 234, 254, 0.5) 0%, rgba(248, 250, 252, 0.96) 100%)',
  'surface-band': 'linear-gradient(180deg, rgba(191, 219, 254, 0.42) 0%, rgba(241, 245, 249, 0.92) 100%)',
  
  // Border Tokens
  'border-default': palette['gray-300'],
  'border-muted': 'rgba(51, 65, 85, 0.2)',
  
  // Text Tokens
  'text-primary': palette['gray-900'],
  'text-secondary': palette['gray-600'],
  'text-tertiary': palette['gray-500'],
  'text-disabled': palette['gray-400'],
  'text-inverse': palette['white'],
  
  // Button Tokens
  'button-primary-bg': palette['brand-blue'],
  'button-primary-hover': '#1e3a8a',
  'button-primary-text': palette['white'],
  'button-secondary-bg': palette['gray-50'],
  'button-secondary-hover': palette['gray-200'],
  'button-secondary-text': palette['gray-700'],
  'button-secondary-border': 'rgba(51, 65, 85, 0.2)',
  
  // State Tokens
  'state-success': palette['success'],
  'state-warning': palette['warning'],
  'state-danger': palette['danger'],
  'state-success-bg': 'rgba(5, 150, 105, 0.1)',
  'state-warning-bg': 'rgba(217, 119, 6, 0.1)',
  'state-danger-bg': 'rgba(220, 38, 38, 0.1)',
};