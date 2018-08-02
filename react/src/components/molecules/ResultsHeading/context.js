import React from 'react';

const ResultsHeadingContext = React.createContext({
  selectBoxProps: {},
  tagsProps: {}
});

export function withResultsHeading(MyComponent, compProps = {}) {
  return class extends React.Component {
    render() {
      return(
        <ResultsHeadingContext.Consumer>
          {(contextVars) => <MyComponent {...compProps} {...contextVars} />}
        </ResultsHeadingContext.Consumer>);
    }
  };
}

export default ResultsHeadingContext;
