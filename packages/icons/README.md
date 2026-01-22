# Adding a new icon to Mayflower

## For Designers:

Add an icon to the Mayflower Figma icon library and export it for development
* Resize the icon to fit a 20x20 square 
* Flatten the icon, and remove masks, excess layers, strokes and shapes
* Export the icon as SVG
* Name the SVG using kebab-case, for example: arrow.svg, date-picker.svg
* Optimize the icon using [SVGOMG](https://svgomg.net/) or a similar tool
* Add the icon into the appropriate group(s) in Mayflower Figma icon library. 

Before optimization (1kb):
```html
<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_2114_12" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="26">
<rect y="0.305908" width="24" height="24.8638" fill="white"/>
<rect x="1" y="1.30591" width="22" height="22.8638" stroke="#EB06FF" stroke-opacity="0.5" stroke-width="2"/>
</mask>
<g mask="url(#mask0_2114_12)">
<path d="M6.33526 3.77258C8.62822 5.79802 11.0945 9.90477 12.0001 12.1087C12.9056 9.90493 15.3718 5.79798 17.6649 3.77258C19.3193 2.3111 22 1.1803 22 4.77859C22 5.49721 21.6498 10.8154 21.4444 11.6788C20.7306 14.6806 18.1292 15.4462 15.8152 14.9828C19.86 15.7928 20.8889 18.4758 18.6668 21.1588C14.4465 26.2543 12.601 19.8803 12.1278 18.247C12.0412 17.9476 12.0006 17.8076 12 17.9267C11.9994 17.8076 11.9588 17.9476 11.8721 18.247C11.3993 19.8803 9.55378 26.2545 5.33322 21.1588C3.11103 18.4758 4.13995 15.7926 8.18483 14.9828C5.87077 15.4462 3.26934 14.6806 2.55555 11.6788C2.35016 10.8153 2 5.49713 2 4.77859C2 1.1803 4.68074 2.3111 6.33515 3.77258H6.33526Z" fill="#14558F"/>
</g>
</svg>
```

After optimization (529b):
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
  <path d="M4.835 2c2.293 1.955 4.76 5.92 5.665 8.046.906-2.127 3.372-6.091 5.665-8.046C17.819.59 20.5-.502 20.5 2.971c0 .694-.35 5.827-.555 6.66-.714 2.898-3.316 3.637-5.63 3.19 4.045.782 5.074 3.371 2.852 5.961-4.22 4.919-6.066-1.234-6.54-2.81-.086-.29-.126-.425-.127-.31 0-.115-.041.02-.128.31-.473 1.576-2.318 7.729-6.539 2.81-2.222-2.59-1.193-5.18 2.852-5.961-2.314.447-4.916-.292-5.63-3.19C.85 8.799.5 3.666.5 2.972.5-.502 3.18.59 4.835 2Z"/>
</svg>
```

## For Developers:
* Make sure the icon has the following attributes:
    * aria-hidden="true" (icons should be for presentation only)
    * xmlns
    * version
    * viewbox (so we can properly scale the icon)
* Make sure the svg and its paths don’t have the following attributes
    * fill or stroke (to allow colors to be set using CSS)
* Add the svg file to packages/assets/static/images/icon

### Add icon to Patternlab:
* Copy the svg file into packages/patternlab/styleguide/source/_patterns/01-atoms/05-icons
* Change the extension to .twig (add icon to Patternlab)
* Add width and height attributes (match viewbox values)

### Add icon to React:
* Copy the svg file into packages/react/src/components/base/Icon/assets
* Prefix the file name with “icon-“
* Run rush build:react to export the icon as a React component
* Add the icon to the storybook knob in packages/react/src/components/base/Icon/Icon.knob.options.js

### Add icon to Core:
* Add the icon to the storybook knob in packages/core/stories/tokens/icons/Icon.knob.options.js or just copy and paste from packages/react/src/components/base/Icon/Icon.knob.options.js.