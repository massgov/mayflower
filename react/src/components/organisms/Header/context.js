import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';


const HeaderContext = React.createContext({});

export function withHeader(MyComponent, compProps = {}) {
  class HocComponent extends React.Component {
    render() {
      return(
        <HeaderContext.Consumer>
          {(contextProps) => {
            // Make a copy of compProps to prevent mutation.
            const newProps = {
              ...JSON.parse(JSON.stringify(compProps)),
              headerContext: { ...contextProps }
            };
            const keys = Object.prototype.entries.call(contextProps);
            keys.each((contextProp) => {
              if (Object.prototype.hasOwnProperty.call(newProps, contextProp)) {
                newProps.contextProp = contextProps.contextProp;
              }
            });
            console.log('newProps is: ', newProps);
            return(<MyComponent {...newProps} />);
          }}
        </HeaderContext.Consumer>);
    }
  }
  // Copies static methods over, if any.
  hoistNonReactStatic(HocComponent, MyComponent);
  return HocComponent;
}

export default HeaderContext;
