import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  Title,
  Subtitle,
  Primary,
  ArgsTable,
  Heading,
  ComponentsTable,
  Stories,
  PRIMARY_STORY,
  CURRENT_SELECTION,
  SourceState,
  DocsContext,
  Canvas, Story
} from '@storybook/addon-docs/blocks';
import { ActionBar, Source } from '@storybook/components';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../src/index.scss';

const storyKindOrder = [
  'about', // storyKindOrder.indexOf -1 follow alphabetical order
  'brand', // storyKindOrder.indexOf -1 follow alphabetical order
  'dataviz', // storyKindOrder.indexOf -1 follow alphabetical order
  'forms',
  'atoms',
  'molecules',
  'organisms',
  'others/templates',
  'others/pages'
];

export const StoryPage = ({ StoryComponent = null, showStories = false, Description }) => {
  const docsContext = React.useContext(DocsContext);
  const [showHTML, setShowHTML] = React.useState(false);
  const { id, name, parameters = {}, args } = docsContext;
  const { component } = parameters;
  const HtmlComponent = StoryComponent || component;
  let html = null;
  if (HtmlComponent) {
    html = prettier.format(ReactDOMServer
    .renderToStaticMarkup(
      (
        <HtmlComponent {...args} />
      )),
      {
        htmlWhitespaceSensitivity: 'ignore',
        endOfLine: 'auto',
        parser: 'html',
        plugins: [parserHtml]
      }
    );
  }
  const actionItem = {
    title: showHTML ? 'Hide HTML' : 'Show HTML?', 
    onClick: () => setShowHTML((prev) => !prev)
  };
  return(
    <>
      <Title>Description</Title>
      <Subtitle />
      { Description && <Description />}
      <Primary name={name} />
      {html && (
        <Heading>
          HTML
          <ActionBar actionItems={[actionItem]} />
        </Heading>
      )}
      {!showHTML && <Source storyId={id} error="Click Show HTML above to view markup source." />}
      {html && showHTML && <Source storyId={id} language="html" code={html} dark />}
      <ArgsTable story={CURRENT_SELECTION}/>
      { showStories && <Stories />}
    </>
  );
}

export const parameters = {
  options: {
    storySort: {
      order: storyKindOrder
    },
  },
  controls: {
    expanded: true,
    hideNoControlsWarning: true
  },
  layout: 'padding'
};
