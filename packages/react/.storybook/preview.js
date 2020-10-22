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
import SyntaxHighlighter, { Renderer, Wrapper } from './syntax-highlighter';

import '../src/components/styles/_index.scss';

import logo from '!url-loader!@massds/mayflower-assets/static/images/stateseal.png';

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

export const StoryPage = ({ StoryComponent = null, showStories = false, Description, styles = null }) => {
  const docsContext = React.useContext(DocsContext);
  const [showHTML, setShowHTML] = React.useState(true);
  const [showCSS, setShowCSS] = React.useState(true);
  
  const css = React.useMemo(() => showCSS && styles ? styles.toString() : null, [showCSS, styles]);

  const { id, name, parameters = {}, args } = docsContext;
  const { component } = parameters;
  const HtmlComponent = StoryComponent || component;
  
  let html = React.useMemo(() => {
    const markup = ReactDOMServer.renderToStaticMarkup((
      <HtmlComponent {...args} />
    ));
    const prettyMarkup = prettier.format(markup,
    {
      htmlWhitespaceSensitivity: 'ignore',
      endOfLine: 'auto',
      parser: 'html',
      plugins: [parserHtml]
    });
    // Replaces the path to the state seal with a base64 image.
    return prettyMarkup.replace(/static\/media\/stateseal\.(.*)\.png/, logo);
  }, [args]);

  const actionItem = {
    title: showHTML ? 'Hide HTML' : 'Show HTML?', 
    onClick: () => setShowHTML((prev) => !prev)
  };
  const cssActionItem = {
    title: showCSS ? 'Hide Styles' : 'Show Styles?', 
    onClick: () => setShowCSS((prev) => !prev)
  };
  
  return(
    <>
      <Title>{component.displayName}</Title>
      <Subtitle />
      { Description && <Description />}
      <Primary name={name} />
      <ArgsTable story={CURRENT_SELECTION}/>
        {html && (
          <Heading>
            HTML
            <ActionBar actionItems={[actionItem]} />
          </Heading>
        )}
        {!showHTML && <Source storyId={id} error="Click Show HTML above to view markup source." />}
        {html && showHTML && <SyntaxHighlighter format={false} renderer={Renderer} language="html" code={html} dark />}
        <Heading>Styles<ActionBar actionItems={[cssActionItem]} /></Heading>
        {!showCSS && <Source storyId={id} error="Click Show Styles above to view styles source." />}
        {css && showCSS && <SyntaxHighlighter format={false} renderer={Renderer} language="css" code={css} dark />}
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
