import henderea from 'eslint-config-henderea';

export default [
  ...henderea,
  {
    ignores: ['.vercel/*', '.idea/*', 'build/*', '.next/*', 'public/generated/*', 'public/sw.js', 'public/workbox-*.js']
  }
];
