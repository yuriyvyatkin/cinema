const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css')
//     .sourceMaps();

mix.js('resources/js/client/homePage.js', 'public/js/client')
  .js('resources/js/client/sessionPage.js', 'public/js/client')
  .js('resources/js/admin/script.js', 'public/js/admin');

mix.disableNotifications();

mix.webpackConfig({stats: {children: true}});
