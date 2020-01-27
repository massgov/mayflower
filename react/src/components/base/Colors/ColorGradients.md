## Mayflower Color Gradient Variants

Gradients are generated for each Mayflower brand color to provide additional options for data visualization usage. The "Light" and "Dark" spectrums are programmatically generated using functions `tint` and `shade` and a 10% percentage intervals for consistency.

### Use Tint to Generate Light Gradient Variants
`tint` takes in a `$color` and mixes it with color white. It also takes in a percentage to define the percentage of `$color` in the mix.
- 0% is the original `$color` and 100% is the color white.
- Light Gradient Variants include 10%-90% with a 10% interval.

### Use Dark to Generate Dark Gradient Variants
`shade` takes in a `$color` and mixes it with color black. It also takes in a percentage to define the percentage of `$color` in the mix.
- 0% is the original `$color` and 100% is the color black.
- Dark Gradient Variants include 10%-50% with a 10% interval.

### Use the Color Story to Generate Hex Values
`GradientTile` and `GradientSpectrum` components are created as a color display as well as a hex value generation tool for these gradient values, getting the RGB color values from the rendered color from the `tint` and `shade` functions and converting the decimal values to hexadecimal values.
