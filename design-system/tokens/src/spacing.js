// Design Tokens: Spacing
// Consistent spacing scale for layout and components

export const spacing = {
  // Fixed Spacing Scale (based on 4px grid)
  'xxs': '0.25rem',   // 4px
  'xs': '0.5rem',     // 8px
  'sm': '1rem',       // 16px
  'md': '1.5rem',     // 24px
  'lg': '2rem',       // 32px
  'xl': '2.5rem',     // 40px
  'xxl': '3rem',      // 48px
  'xxxl': '4rem',     // 64px
  
  // Responsive Spacing
  'vertical': 'clamp(2.5rem, 2rem + 1vw, 3.5rem)', // Responsive vertical rhythm
  
  // Component Spacing
  'component-padding-xs': '0.25rem',
  'component-padding-sm': '0.5rem',
  'component-padding-md': '1rem',
  'component-padding-lg': '1.5rem',
  'component-padding-xl': '2rem',
  
  // Layout Spacing
  'layout-padding-sm': '1rem',
  'layout-padding-md': '1.5rem',
  'layout-padding-lg': '2rem',
  'layout-gap-xs': '0.5rem',
  'layout-gap-sm': '1rem',
  'layout-gap-md': '1.5rem',
  'layout-gap-lg': '2rem',
};