import React from 'react';

const ResultsHeadingContext = React.createContext({
  selectBoxProps: {},
  tagsProps: {}
});

export function withResultsHeading(Component, props) {
  return() => (
    <ResultsHeadingContext.Consumer>
      {(contextVars) => <Component {...props} resultsHeading={contextVars} />}
    </ResultsHeadingContext.Consumer>
  );
}

export default ResultsHeadingContext;
