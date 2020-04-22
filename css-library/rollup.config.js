import postcss from 'rollup-plugin-postcss';
import styles from "rollup-plugin-styles";
import multi from '@rollup/plugin-multi-entry';
import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import css from "@modular-css/rollup";
import sass from 'rollup-plugin-sass';
import path from 'path';
import collectSass from 'rollup-plugin-collect-sass'
import magicImporter from 'node-sass-magic-importer';

const base = './src/assets/scss/00-base';
const atoms = './src/assets/scss/01-atoms';
const options = {
  // Defines the path in which your node_modules directory is found.
  cwd: process.cwd(),
  // Define the package.json keys and in which order to search for them.
  packageKeys: [
    'sass',
    'scss',
    'style',
    'css',
    'main.sass',
    'main.scss',
    'main.style',
    'main.css',
    'main'
  ],
  // You can set the special character for indicating a module resolution.
  packagePrefix: '~',
  // Disable console warnings.
  disableWarnings: false,
  // Disable importing files only once.
  disableImportOnce: false,
  // Add custom node filters.
  customFilters: undefined
};

export default {
  input: [
    //'./src/main.js',
    //`./src/assets/scss/index.scss`,
    // `${base}/_breakpoints.scss`,
    // `${base}/_colors.scss`,
    // `${base}/_fonts.scss`,
    //`${base}/_mixins.scss`,
    //`${base}/mixins/_ma-button.scss`,
    './src/main.js',
    //`./src/address.js`,
    //`./src/arrowButton.js`
    //`${atoms}/_address.scss`,
    //`${base}/_mixins.scss`,
    //`${atoms}/_arrow-button.scss`
  ],
  output: {
    dir: 'dist',
    format: 'esm'
  },
  external: [
    'normalize-scss/sass/normalize',
    'bourbon/core/bourbon',
    'bourbon-neat/app/assets/stylesheets/neat'
  ],
  // manualChunks: {
  //   ''
  // },
  
  plugins: [
    // sass({
    //   options: {
    //     includePaths: [
    //                   'src/assets/scss/',
    //                   'src/assets/fonts/',
    //                   'src/assets/images/'
    //                 ]
    //   }
    // }),
    // collectSass({
    //   importOnce: true,

    // }),
    // scss({
    //   output: 'dist/',
    //   includePaths: [
    //             'src/assets/scss/',
    //             'src/assets/scss/00-base/mixins/',
    //             'src/assets/fonts/',
    //             'src/assets/images/'
    //           ]
    // }),
    postcss({
      syntax: 'postcss-scss',
      extensions: ['.css', '.scss'],
      extract: true,
      modules: true,
      inject: false,
      minimize: false,
      //namedExports: true,
      use: {
        sass: {
          importer: magicImporter(options),
          includePaths: [
            'src/assets/scss',
            'src/assets/fonts',
            'src/assets/images'
          ]
        }
      }
    }),
  ]
};