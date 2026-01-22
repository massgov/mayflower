# Massachusetts Design System Icon Library

See the whole icon library [here](https://mayflower.digital.mass.gov/core/index.html?path=/docs/foundation-iconography--icons).


## Adding New Icons

1. Place the SVGs into static/icons (make sure that the bold version is added to static/icons/bold simutanously)
2. Run `rushx build`, to optimize and prep svgs in place

### Add icon to Patternlab:
1. Run `rushx icons` in patternlab/styleguide, to copy the icon SVGs and convert to twig in patternlab —> display in patternlab
2. Mayflower PHP icon function —> packages/patternlab/styleguide/source/_twig-components/functions/icon.function.php —> use icons in shared assets

### Add icon to React:
1. Run `rushx icons` in the react/ (Build each icon into a React component based on icon-template.js. Note that this step has been taken out of the start script, due to the number of icons slowing down the task)

### Add icon to Core:
1. Run `rushx icons` in the react/ (Build each icon into a React component based on icon-template.js. Note that this step has been taken out of the start script, due to the number of icons slowing down the task)
2. Update `packages/core/stories/tokens/icons/Icon.knob.options.js` based on `packages/react/src/components/base/Icon/Icon.knob.options.js`.