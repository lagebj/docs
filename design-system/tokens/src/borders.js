// Design Tokens: Borders
// Consistent border styles and radii

export const borders = {
  // Border Widths
  'border-width-none': '0',
  'border-width-hairline': '0.5px',
  'border-width-thin': '1px',
  'border-width-thick': '2px',
  'border-width-heavy': '4px',
  
  // Border Styles
  'border-style-solid': 'solid',
  'border-style-dashed': 'dashed',
  'border-style-dotted': 'dotted',
  
  // Border Radius
  'border-radius-none': '0',
  'border-radius-sm': '0.125rem',   // 2px
  'border-radius-md': '0.25rem',    // 4px
  'border-radius-lg': '0.5rem',     // 8px
  'border-radius-xl': '0.75rem',    // 12px
  'border-radius-2xl': '1rem',      // 16px
  'border-radius-3xl': '1.5rem',    // 24px
  'border-radius-full': '9999px',   // Pill shape
  
  // Component-Specific Radii
  'border-radius-card': '1rem',     // 16px - from Tailwind config
  'border-radius-button': '0.5rem', // 8px - from Tailwind config
  'border-radius-pill': '9999px',   // Pill shape - from Tailwind config
};