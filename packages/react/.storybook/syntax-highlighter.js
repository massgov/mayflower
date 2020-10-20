import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { PrismLight as ReactSyntaxHighlighter } from 'react-syntax-highlighter';
import { ActionBar, createSyntaxHighlighterElement, EmptyBlock  } from '@storybook/components';
import { styled, ThemeProvider, convert, themes, Global, getScrollAreaStyles } from '@storybook/theming';
import createElement from 'react-syntax-highlighter/dist/esm/create-element';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatter } from '@storybook/components/dist/syntaxhighlighter/formatter';
import '!!style-loader!css-loader!react-virtualized/styles.css'; // only needs to be imported once

const themedSyntax = (theme) =>
  Object.entries(theme.code || {}).reduce((acc, [key, val]) => ({ ...acc, [`* .${key}`]: val }), {});

const Scroller = styled(({ children, className }) => (
  <>
  <div className={className}>
    {children}
  </div>
  </>
))(
  {
    position: 'relative',
  },
  ({ theme }) => ({
    '& code': {
      paddingRight: theme.layoutMargin,
    },
  }),
  ({ theme }) => themedSyntax(theme)
);
  
const Pre = styled.pre(({ theme, padded }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  height: '100%',

  margin: 0,
  padding: padded ? theme.layoutMargin : 0,
}));

const Code = styled.code({
  flex: 1,
  paddingRight: 0,
  opacity: 1,
});



export const Wrapper = styled.div(
  ({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    color: theme.color.defaultText,
    // A speficic number of pixels for the height is
    // required for react virtualization to work.
    height: '700px',

  }),
  ({ theme, bordered }) =>
    bordered
      ? {
          border: `1px solid ${theme.appBorderColor}`,
          borderRadius: theme.borderRadius,
          background: theme.background.content,
        }
      : {},
      // This provides styles to highlight code!
      ({ theme }) => themedSyntax(theme)

);

const SyntaxHighlighter = ({
  children,
  language = 'jsx',
  copyable = true,
  bordered = true,
  padded = false,
  format = true,
  className = null,
  useInlineStyles = false,
  ...rest
}) => {
  if (typeof children !== 'string' || !children.trim()) {
    return null;
  }
  const highlightableCode = format ? formatter(children) : children.trim();
  
  const [copied, setCopied] = React.useState(false);

  const onClick = (e) => {
    e.preventDefault();

    if (navigator) {
      navigator.clipboard
        .writeText(highlightableCode)
        .then(() => {
          setCopied(true);
          if (window) {
            window.setTimeout(() => setCopied(false), 1500);
          }
        })
        .catch(console.error);
    }
  };

  return (
    <>

    <Wrapper bordered={bordered} padded={padded} className={className}>

        <ReactSyntaxHighlighter
          padded={padded || bordered}
          language={language}
          lineNumberContainerStyle={{}}
          PreTag={Pre}
          CodeTag={Code}
          useInlineStyles={useInlineStyles}
          {...rest}
        >
          {highlightableCode}
        </ReactSyntaxHighlighter>
      {copyable ? (
        <ActionBar actionItems={[{ title: copied ? 'Copied' : 'Copy', onClick }]} />
      ) : null}
      </Wrapper>
      </>
  );
};

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({ theme }) => ({
  // DocBlocks-specific styling and overrides
  fontSize: `${theme.typography.size.s2 - 1}px`,
  lineHeight: '19px',
  margin: '25px 0 40px',
  borderRadius: theme.appBorderRadius,
  boxShadow:
    theme.base === 'light' ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0' : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
  'pre.hljs': {
    padding: 20,
    background: 'inherit',
  },
}));

const Source = (props) => {
  const { error } = props;
  if (error) {
    return <EmptyBlock>{error}</EmptyBlock>;
  }

  const { language, code, dark, format, ...rest } = props;

  const syntaxHighlighter = (
    <StyledSyntaxHighlighter
      bordered
      padded
      copyable
      format={format}
      language={language}
      {...rest}
    >
      {code}
    </StyledSyntaxHighlighter>
  );
  if (typeof dark === 'undefined') {
    return syntaxHighlighter;
  }
  const overrideTheme = dark ? themes.dark : themes.light;
  return <ThemeProvider theme={convert(overrideTheme)}>{syntaxHighlighter}</ThemeProvider>;
}

export default Source;

export const Renderer = ({rows, stylesheet, useInlineStyles }) => {
  return(
    
      <AutoSizer>
        {({height, width}) => (
          <List
            columnCount={1}
            height={height}
            width={width}
            columnWidth={400}
            rowHeight={19}
            containerStyle={{overflowX: 'auto'}}
            rowRenderer={({ index, key, style }) => createSyntaxHighlighterElement({
              node: rows[index],
              stylesheet,
              style,
              useInlineStyles: true,
              key
          })}
            rowCount={rows.length}
            />
        )}
      </AutoSizer>
        
)};