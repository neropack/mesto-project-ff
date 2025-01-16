const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    // подключите плагины к PostCSS
    plugins: [
      // подключите autoprefixer
      autoprefixer,
      // cssnano при подключении нужно передать объект опций
      cssnano({ preset: 'default' })
    ]
  }; 