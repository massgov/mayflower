# Massachusetts Design System CSS Variables

For general guidance on how to use the Design System, check out the [Design System Microsite](https://www.mass.gov/massachusetts-design-system).

The semantic variables (found in css/index.css) are created by running the [Token Forge Figma plugin](https://www.figma.com/community/plugin/1566133735926608173/token-forge-variables-tokens-builder) on the [Massachusetts Design System Foundations > Styles](https://www.figma.com/design/gCuxnTFonFcfYMsaaVemo7/Styles?m=auto) Figma file.

Currently they are edited by hand to remove any unhelpful directories/modes imported from Figma. We're working on how to make this process cleaner once we have the tokens looking the way we want. It does, however, allow us to use the prefix for our tokens, `mds`, when exporting.

There are also files for testing these tokens that will not be included in the official release. These are index.html and styles.css in the `test-page` directory. While this is in testing mode, feel free to add elements in these files to test them before adding it to your own project.

For specifically exporting the JSON, one option is to use [Variables to JSON](https://www.figma.com/community/plugin/1468186413196022101/variables-to-json) on Base Tokens and Styles Figma files, as it formats them based on the DTCG standards. Once Figma is synced to our naming convention in the CSS variables, you will also hopefully be able to generate CSS variables from that JSON file using [Style Dictionary](https://styledictionary.com/). However, pulling CSS variables directly from Figma with Token Forge is the preferred method. 

# Token Naming Conventions #

Coming soon! 
