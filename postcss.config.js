module.exports = {
  plugins: [
    // Tailwind CSS plugin for utility-first CSS framework
    require('@tailwindcss/postcss'),

    // Autoprefixer for adding vendor prefixes to CSS rules
    require('autoprefixer'),

    // Conditionally enable plugins based on environment
    ...(process.env.NODE_ENV === 'production' ? [
      // CSSNano for minifying CSS in production
      require('cssnano')({
        preset: 'default',
      }),
    ] : []),
  ],
}
