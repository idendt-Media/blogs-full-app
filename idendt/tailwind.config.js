// tailwind.config.js
module.exports = {
  // ...
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      // Paths to your HTML and React components
      './public/**/*.html',
      './src/**/*.js',
    ],
  },
  // ...
};
