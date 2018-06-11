## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

- Running `npm install` in the component's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.

## Creating New Components
Follow these mayflower-react component [road runner rules](http://thechive.com/2015/03/10/chuck-jones-9-unbreakable-rules-for-the-coyote-and-the-road-runner-cartoon-series-10-photos/):

1. Pattern paths match those of mayflower: `atoms/buttons/` with the exception of `organisms/by-*` which we will ignore (i.e. all organism component folders live in the organisms folder)
1. Component element names are the capital CamelCase version of the mayflower pattern name: `<Button />`
1. Components have their own folder, the name is a capital CamelCase version of the pattern name: `Button/`
1. Structure the component folder as follows:
    ```
    Button/
    ├── index.js (Component file)
    ├── Button.md (Markdown documentation for component)
    ├── Button.stories.js (Component story file)
    └── Button.knobs.options.js (Any enumerable prop options that can be imported in story files)
    ```
1. In the Component file:
    1. Default to `const` over `class` -- these should be simple components which can get implemented in other apps via `class` with lifecycle methods and with redux `connect`.
    1. Set `.defaultProps` **only for non-required** configuration variables which need to be "opted in" to activate (i.e. the pattern would render like the pattern page in mayflower sans content -- see [button for example](https://github.com/massgov/mayflower-react/pull/16/files#diff-71d699cd557ebf06db4e0d195497642cR44))
    1. Do not set `.defaultProps` for content variables (i.e. `button.text` in a template `<button>{button.text}</button>).
    1. Set `.defaultProps` **only for non-required** child components referenced by parent components equal to the existing `.defaultProps` used in child components.
    1. `props` are namespaced with the camelCase version of the component via declaration (but not defined as a prop key): `const button = this.props` and subsequently referenced by `button.propname` (as it appears in twig template).
    1. prop types defined (consult the pattern .md file in mayflower) and documented with comment (this will show up in the story props table):
        ```
        ...
        /** My prop description */
        myProp: PropType.type,
        ...
        ```
1. In the Story file:
    1. Use `withInfo` to pull in an externally authored `.md` docs file to describe the Component (see pattern .md file in mayflower) and link to the mayflower front end version
        1. Wrap the markdown variable in `<div></div>` to ensure the html is rendered (and not printed) - see [button example](https://github.com/massgov/mayflower-react/pull/16/commits/db152f0fe09f77376e1bea82de05bbcd6543d8f5)
    1. Abstract away knob objects for any enumerable properties (so we can import them in the story file for any component which references this one)
    1. Assign `props const` in json structure and render component by passing props via object spread: `<Button {...props}`
1. Export the component in `src/index.js` (in alphabetical order)
