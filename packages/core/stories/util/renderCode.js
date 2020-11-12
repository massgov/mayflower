import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Story, DocsContext } from '@storybook/addon-docs/blocks';


export const renderReactMarkup = (component) => (
  ReactDOMServer.renderToStaticMarkup(component)
)

// can't pass DocsContext from .mdx
// export const StoryCode = ({ children }) => (
//   <Story
//     name="test"
//     parameters={{ docs: { transformSource: (src) => renderReactMarkup(children) } }}
//   >
//     {children}
//   </Story>
// )
