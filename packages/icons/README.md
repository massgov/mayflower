# Massachusetts Design System Icon Library

A comprehensive icon library for the Massachusetts Design System, featuring SVG icons optimized for web development.

## Overview

Most icons come from the open source [Phosphor icon library](https://phosphoricons.com/), with custom icons designed in Phosphor's style to fill any gaps. Each icon component has variants built in for `regular` and `bold` styles. As a general rule of thumb, we recommend using the bold style icons on icon instances of 24px and below, and regular style icons on icon instances over 24px.

**We recommend using the icon components from this library in your designs as much as possible.** However, you can also use [Phosphor's Figma plugin](https://www.figma.com/community/plugin/898620911119764089) to pull any icons that haven't been published in this library yet.

### Icon Sources

- **Design System**: Icons are programmatically exported from our [Figma Icon Library](https://www.figma.com/design/ZpxjY5M188i4ItGIvW9Y0s/Icons?t=9d9doUJlYvsBBWr2-0)
- **Base Library**: [Phosphor Icons](https://phosphoricons.com/) (open source)
- **Custom Icons**: Designed in Phosphor's style for Massachusetts-specific needs
- **Optimization**: All icons are formatted and optimized for development use

## Usage

### Installation
```bash
npm install @massds/icons
```

### Package Structure
Icons are named in kebab case. Each icon has a corresponding bold icon in the `bold/` directory and is appended with `--bold` in the name.
```
images/
├── alert.svg
├── arrow.svg
├── ...
└── bold/
    ├── alert--bold.svg
    ├── arrow--bold.svg
    └── ...
```

### Browse the Full Library

View all available icons in our [Storybook documentation](https://mayflower.digital.mass.gov/core/index.html?path=/docs/foundation-iconography--icons).


## Development

```bash
rush install
rush build:icons
rush icons
```

### Adding New Icons

1. Place the SVGs into static/icons (make sure that the bold version is added to static/icons/bold simutanously)
2. Run `rushx build`, to optimize and prep svgs in place

#### Add icon to Patternlab:
1. Run `rushx icons` in patternlab/styleguide, to copy the icon SVGs and convert to twig in patternlab —> display in patternlab
2. [The Mayflower PHP icon function](./packages/patternlab/styleguide/source/_twig-components/functions/icon.function.php) uses icons in the assets package

#### Add icon to React:
1. Run `rushx icons` in `react/` (Build each icon into a React component based on icon-template.js. Note that this step has been taken out of the start script, due to the number of icons slowing down the task)

#### Add icon to Core:
1. Run `rushx icons` in `core/` (Build each icon into a React component based on icon-template.js. Note that this step has been taken out of the start script, due to the number of icons slowing down the task)
2. Update [icon options in Core](packages/core/stories/tokens/icons/Icon.knob.options.js) based on [icon options in React](packages/react/src/components/base/Icon/Icon.knob.options.js).