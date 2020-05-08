# Mayflower Assets
The styles provided by this package require compiling with a tool that supports the [npm sass package](https://www.npmjs.com/package/sass). 

## License
Please note that the fonts and the svg-icons are licensed only for the usage on websites that are **owned by the Commonwealth of Massachusetts**. Mayflower is currently using a licensed web font Texta and purchased [Smashing Icons](https://smashicons.com/) for some icons.

## Texta License
Fontspring grants Licensee a perpetual, worldwide, non-exclusive and non-transferrable license to install the Texta as webfont on Websites that are owned by the Commonwealth of Massachusetts using the @font-face selector in CSS files. For other usage, you may have to acquire an additional license through Fontsprint.
For more details about Texta's terms of use, please refer to our [web font license](https://www.fontspring.com/lic/htswufoczd).

## Publishing Instructions
>To publish the package, you will have to be a collaborator or have access to the [@massds/mayflower-assets npm package](https://www.npmjs.com/package/@massds/mayflower-assets).

1. Once you're done making changes and ready to publish, run `npm login` to login to the npm account.
2. Update `version` in package.json and run `npm publish`. Wait a few minutes and check [@massds/mayflower-assets](https://www.npmjs.com/package/@massds/mayflower-assets) on the npm registry.



## Setup and Usage (fonts/images)
If you're using this package only for its fonts and images, you can skip installing bourbon and sass. Assets can be found under `fonts` and `images`.

## Setup and Usage (Sass)
When using this package for the .scss files, you should set the sass package's include paths to include bourbon's include paths as well as this package's own. This package's include paths are:
```
scss
scss/00-base
scss/00-base/mixins
scss/01-atoms
scss/03-organisms
scss/04-templates
scss/05-dataviz
scss/08-print
```
These include paths allow you to include files with paths like `00-base/name-of-file` in your code.

You can also set up your include paths by using an `.env` file at the root of your project. Sass can use the node environment variable `SASS_PATH` for setting your include paths:
```
// .env file
SASS_PATH=./node_modules/@massds/mayflower-assets/scss:./node_modules/@massds/mayflower-assets/scss/00-base:./node_modules/@massds/mayflower-assets/scss/00-base/mixins:./node_modules/@massds/mayflower-assets/scss/01-atoms:./node_modules/@massds/mayflower-assets/scss/02-molecules:./node_modules/@massds/mayflower-assets/scss/03-organisms:./node_modules/@massds/mayflower-assets/scss/04-templates/./node_modules/@massds/mayflower-assets/scss/05-dataviz:./node_modules/@massds/mayflower-assets/scss/08-print
```

Many of the components require the file `00-base/_layout.scss` to be included at least once before their use. It's recommended for your project to create a single .scss file that includes all the shared files for your needs. This file should use `@forward` to forward sass modules that your other files need:
```
// example.scss

// Assuming 'node_modules' is your include paths here...
// forwards the normalize-scss library's normalize styling.
@forward "normalize-scss/sass/normalize";
@forward "00-base/layout";
// Let all your scss files have access to colors without having to remember that.
@forward "00-base/colors";
// Grab the fonts from this package for inclusion:
@forward "00-base/fonts";
```
```
// some-other-file.scss

// This path depends on what's in your include paths...
@use "path/to/example.scss" as *;
// You can also scope it:
@use "path/to/example.scss";
.elementClass {
  ... rules go here ...
}
```
Creating a shared file is NOT required. You can also just ensure that you include the box-sizing styling:
```
// some-other-file.scss
@use "00-base/layout";
.elementClass {
  ... rules go here ...
}
```
## Including SCSS Files
To include a `.scss` file, please do NOT use `@import`. All previous uses of `@import` have been replaced by `@use` for [Sass Modules](https://sass-lang.com/documentation/at-rules/use) support:
```
// Scoped inclusion of variables. All variables will now
// be under the variables scope.
@use "00-base/variables";
$my-new-var: variables.$column;
// Or you can do this to place all variables
// in the global scope for the file:
@use "00-base/variables" as *;
$my-new-var: $column;
```
## Variable Overrides
All provided variables of this package allow for overrides by the user:
```
// You can define your overrides before the @use call.
// Doing so will ensure the file you're calling with @use uses the overrides.
$column: 60px;
@use "00-base/variables";
// You can also just pass the override to the file you're calling @use on:
@use "00-base/variables" with (
  $column: 60px;
);
```
## Recommended Fonts
Some reccomended fonts you can use can be found under `00-base/fonts`.
## Example Compilation of Styles

The following example uses gulp to compile all .scss files under src (with exceptions to those .scss files under `00-base/`). The script will place the compiled files under `dist/` within the same directories they originated.
```
// gulpfile.js
const { src, dest, series } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const flatmap = require('gulp-flatmap');
const del = require('del');
const bourbon = require('bourbon');
const path = require('path');
// Replaces node_sass with sass.
sass.compiler = require('sass');

const compileSass = () => {
  return src([
    // Compile all scss files
    './src/scss/**/*.scss',
    // But skip over base directory files.
    '!./src/scss/00-base/**'
  ])
  .pipe(rename(function(assetPath) {
    // Sass will not compile files that start with an underscore,
    // so rename them to remove it.
    assetPath.basename = assetPath.basename.replace('_', '');
    return assetPath;
  }))
  // Loops over all files in the stream with flatmap.
  .pipe(flatmap((stream, file) => {
    // Normally you should require/import the index file
    // to get the includePaths used but that points to 
    // the dist/ directory. Here we mimic that by just replacing
    // dist/ with src/.
    return stream
    
    .pipe(sass({
      includePaths: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'src/scss'),
        path.join(__dirname, 'src/scss/00-base'),
        path.join(__dirname, 'src/scss/00-base/mixins'),
        path.join(__dirname, 'src/scss/01-atoms'),
        path.join(__dirname, 'src/scss/03-organisms'),
        path.join(__dirname, 'src/scss/04-templates'),
        path.join(__dirname, 'src/scss/05-dataviz'),
        path.join(__dirname, 'src/scss/08-print'),
        'node_modules',
      ],
    }).on('error', sass.logError))
    .on('error', (err) => console.log(err))
  }))
  .pipe(dest('./dist/css'));
};
exports.default = series(compileSass);

```
## Development with Assets Package
When working on changing styling, you can use `npm link` with another project so that changes made to `.scss` files show up live time. First, run `npm link` under the mayflower repo's assets directory. Next, in your other project's root directory run `npm link @massds/mayflower-assets`. This will make it so that under node_modules for your project, this package is symlinked (from @massds/mayflower-assets) to the mayflower repo's assets directory.