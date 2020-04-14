# Mayflower-Tokens
[![npm package][npm-badge]][npm]

Mayflower-tokens provides a bundled up library of design tokens and assets that you will need for theming your front end framework to look and feel like [Mass.gov](https://mass.gov) and other Commonwealth web properties that are in Mayflower ecosystem. Mayflower-tokens includes color token SCSS variables, fonts, icons and other imagery from Mayflower — the [enterprise design system for the Commonwealth of Massachusetts][mayflower-doc].
```
├── dist   
    ├── fonts                 Texta web fonts      
    ├── images             
    │   ├── svg-icons         SVG icon files
    │   ├── stateseal         stateseal png
    │   ├── stateseal-color   stateseal png in color grayscale
    ├── scss        
    │   ├── _colors.scss      Color tokens
    │   ├── _fonts.scss       Texta font imports (needs to set $assets-path)
    │   ├── _index.scss       Default SCSS export
```

- **Codebase:** [Mayflower monorepo][mayflower-github] `assets` subdirectory
  >[Mayflower monorepo][mayflower-github] comprised of [Mayflower documentation][mayflower-doc], two component libraries — [Mayflower React][react-storybook] and [Mayflower PatternLab][patternLab], and their [shared assets][shared-assets].
  > Refer to [Mayflower PatternLab Static Site][patternlab] for the set of UI components consumed in Mass.gov.
- **Live demo:** [mayflower-react storybook][react-storybook]

## Using Mayflower-Tokens in Your Project
1. Install mayflower-tokens into your project as a dependency.
`npm i @massds/mayflower-tokens --save`
2. Import color tokens into your SASS/SCSS file
`@import '[path to node_modules]/@massds/mayflower-tokens/colors/mayflower-color_tokens';`
3. Refer to variables in `@massds/mayflower-tokens/colors/_mayflower-color_tokens.scss` or a [live demo for the colors](https://mayflower.digital.mass.gov/react/?path=/story/brand-colors--colors) to map the Mayflower color tokens in your theming SCSS.
4. You can also find the web fonts Texta that are used in Mayflower (please)
To import into your styles, refer to [mayflower Texta font imports](https://github.com/massgov/mayflower/blob/develop/assets/scss/00-base/_fonts.scss).

## License
Please note that the fonts and the svg-icons are licensed only for the usage on websites that are **owned by the Commonwealth of Massachusetts**. Mayflower is currently using a licensed web font Texta and purchased [Smashing Icons](https://smashicons.com/) for some icons.

### Texta License
Fontspring grants Licensee a perpetual, worldwide, non-exclusive and non-transferrable license to install the Texta as webfont on Websites that are owned by the Commonwealth of Massachusetts using the @font-face selector in CSS files. For other usage, you may have to acquire an additional license through Fontsprint.
For more details about Texta's terms of use, please refer to our [web font license](https://www.fontspring.com/lic/htswufoczd).

## Publish Package

1. `npm login` — Login to the npm account.
>To publish the package, you will have to be a collaborator or have access to the [@massds/mayflower-tokens npm package](https://www.npmjs.com/package/@massds/mayflower-tokens).

1. `npm run build` — Build the distribution folder `dist`.

1. Update `version` in package.json.
1. `npm publish` — Publish `@massds/mayflower-tokens` to npm registry.å
1. Wait a few minutes and check [@massds/mayflower-tokens][npm] on the registry.


[npm-badge]: https://img.shields.io/npm/v/@massds/mayflower-tokens.png?style=flat-square
[npm]: https://www.npmjs.com/package/@massds/mayflower-tokens
[mayflower-github]: https://github.com/massgov/mayflower
[mayflower-doc]: https://www.mass.gov/mayflower
[react-storybook]: https://mayflower.digital.mass.gov/react
[react-starter]: https://github.com/massgov/mayflower-react-starter
[patternlab]: https://mayflower.digital.mass.gov/patternlab
[shared-assets]: https://github.com/massgov/mayflower/tree/develop/assets
