import gulp from 'gulp';
import del from 'del';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import assetsPath from '@massds/mayflower-assets';
import config from './patternlab-config.mjs';
import patternlabCore from '@pattern-lab/core';
import * as logger from '@pattern-lab/core/src/lib/log.js';
import sourcemaps from 'gulp-sourcemaps';
import gulpRollup from 'rollup-stream';
import gulpNodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { rollup } from 'rollup/dist/es/rollup.js';
import source from 'vinyl-source-stream';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import externalGlobals from "rollup-plugin-external-globals";
import normalizePaths from "node-normalize-scss";
import { terser } from "rollup-plugin-terser";
import legacy from 'rollup-plugin-legacy';


const isProduction = process.env.NODE_ENV === 'production';


const externalId = path.resolve(path.dirname(fileURLToPath(import.meta.url)), './source/js/initGoogleMaps.js' );

//const { nodeResolve } = gulpNodeResolve;
const patternlab = patternlabCore(config);

gulpSass.compiler = sass;

const { src, dest, series, parallel, watch } = gulp;

const clean = () => del([
  './source/fonts',
  './source/images',
  './public'
]);

const cleanPublic = () => del(['./public']);

const moveFonts = () => src([
  './node_modules/@massds/mayflower-assets/static/fonts/**'
])
  .pipe(dest('./source/fonts'));

const moveImages = () => src([
  './node_modules/@massds/mayflower-assets/static/images/**'
])
  .pipe(dest('./source/images'));
const moveTemplates = () => src([
  './source/_patterns/**/*.twig'
])
  .pipe(dest('./public/twig'));
const moveData = () => src([
  './source/data/**'
])
  .pipe(dest('./public/data'));

const watchSass = () => src([
  './source/**/*.scss'
])
  .pipe(sourcemaps.init())
  .pipe(gulpSass({
    sourceMap: true,
    includePaths: ['source/css', path.join(path.dirname(fileURLToPath(import.meta.url)), './node_modules')]
      .concat(assetsPath.includePaths)
      .concat(normalizePaths.includePaths)
  })).on('error', gulpSass.logError)
  .pipe(sourcemaps.write())
  .pipe(dest('./source'));

const cleanStyles = () => del([
  './public/css'
]);

const compileSass = () => watch('source/**/*.scss', { ignoreInitial: false }, watchSass)
const moduleDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), './node_modules')
const compileQueue = new Set();
export const compileJS = () => {
  if (compileQueue.size === 0) {
    logger.default.info('Compiling JS...');
    const compile = rollup({ 
      cache: true,
      input: './source/js/index.js',
      external: [
        'fs',
        'path'
      ],
      plugins: [
        nodePolyfills({ fs: true }),
        gulpNodeResolve.default({ browser: true, preferBuiltins: true }),
        commonjs({
          include: [/node_modules/],
          exclude: [/twig/],
          transformMixedEsModules: true,
        }),
        legacy({
          'node_modules/twig/twig.js': 'global.Twig',
        }),
      ],

      
      
    })
    .then(bundle => {
      return Promise.all([
        bundle.write({
          dir: './public/js',
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
          sourcemap: 'inline',
          format: 'cjs',
        }),
        bundle.write({
          dir: './public/js',
          preferConst: true,
          extend: true,
          chunkFileNames: '[name].mjs',
          entryFileNames: '[name].mjs',
          sourcemap: 'inline',
          format: 'es',
        }),
        bundle.write({
          dir: './public/js',
          chunkFileNames: '[name].min.js',
          entryFileNames: '[name].min.js',
          format: 'cjs',
          plugins: [terser()]
        }),
        bundle.write({
          dir: './public/js',
          preferConst: true,
          extend: true,
          chunkFileNames: '[name].min.mjs',
          entryFileNames: '[name].min.mjs',
          format: 'es',
          plugins: [terser()]
        })
      ]);
    })
    .catch(error => logger.default.error(error));
    compileQueue.add(compile);
    return compile.then(() => compileQueue.clear());
  }
  return Promise.resolve();
}

export const watchJS = () => watch('public/js/**/*.js', { ignoreInitial: false }, compileJS);
export const patternlabBuild = () => {
  // build, optionally watching or choosing incremental builds
return patternlab.build({
  cleanPublic: true,
  watch: false
});
}

//console.log(patternlab);
export const patternlabServe = () => {
  patternlab.events.on('patternlab-pattern-asset-change', compileJS);
  patternlab.server.serve({
    cleanPublic: true,
    watch: true
  });
  return patternlab.events;
}
export default series(clean, parallel(moveFonts, moveImages, moveTemplates, moveData), parallel(patternlabServe, compileSass));

export const build = series(cleanPublic, watchSass, parallel(moveFonts, moveImages, moveTemplates, moveData), patternlabBuild, compileJS);