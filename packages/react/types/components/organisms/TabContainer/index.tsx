// @ts-nocheck
/**
 * TabContainer module.
 * @module @massds/mayflower-react/TabContainer
 * @requires module:@massds/mayflower-assets/scss/03-organisms/tab-container
 */
import React from 'react';
import classNames from 'classnames';
import nanoid from 'nanoid';
import is from 'is';
import TabContext from './context';

export interface TabContainerProps {
  /** When true, the styles of the container changes to drop borders around each tab. */
  nested?: boolean
  /** The numerical index of which tab should default to be open, starting at 0. */
  defaultTab?: number
  /** A callback function for a tab change, receives the tab's id and children */
  onTabChange?(...args: unknown[]): unknown
  /** Children passed to tab container.  */
  children?: React.ReactNode
}

class TabContainer extends React.Component<TabContainerProps> {
  constructor(props) {
    super(props);
    // Allows Tab to interact directly with the tab body div through context.
    this.tabBodyRef = React.createRef();
    // When false, runs key down code for nested containers.
    this.preventBodyKeyDown = false;
    const tabIds = new Map();
    // This only works for class components because it is not re-generated on every render.
    this.spanId = nanoid();
    this.focusOnTabBody = () => {
      this.tabBodyRef.current.setAttribute('tabindex', '0');
      this.tabBodyRef.current.focus();
    };
    const tabRefs = {};
    let activeTab = null;
    React.Children.forEach(props.children, (child, index) => {
      const id = nanoid();
      tabIds.set(index, id);
      tabRefs[tabIds.get(index)] = React.createRef();
      if (index === props.defaultTab) {
        activeTab = id;
      }
    });
    this.state = {
      activeTab,
      // eslint-disable-next-line react/no-unused-state
      setActiveTab: this.setActiveTab,
      // eslint-disable-next-line react/no-unused-state
      focusOnTabBody: this.focusOnTabBody,
      tabIds,
      tabRefs,
      tabContainerId: nanoid(),
      tabContainerBodyId: nanoid(),
      // eslint-disable-next-line react/no-unused-state
      tabBodyRef: this.tabBodyRef
    };
  }

  componentDidMount() {
    // React hydration ignores any differences in attributes for performance
    // reasons. So, it's not able to fix an ID mismatch and we see different
    // IDs in the DOM and in the state. As a temporary workaround, we push
    // different IDs to the state. This triggers a re-rendering and fixes the
    // mismatch.
    // @see https://reactjs.org/docs/react-dom.html#hydrate
    // @todo This component needs a revamp in order to properly support SSR,
    //   because right now it only renders the tabs, but not the tab body. The
    //   workaround below adds another round of re-rendering. It's a performance
    //   issue and could be avoided with a consistent ID generator or something
    //   like the useId() hook introduced in React 18.
    this.setState({
      tabContainerId: nanoid(),
      tabContainerBodyId: nanoid()
    });
  }

  setActiveTab = (tabId) => {
    const state = {
      activeTab: tabId
    };
    this.setState(state, () => {
      if (is.fn(this.props.onTabChange)) {
        this.props.onTabChange(this.state.tabRefs[tabId], tabId);
      }
    });
    if (this.state.tabRefs[tabId].current.focus) {
      this.state.tabRefs[tabId].current.focus();
    }
  };

  render() {
    const classes = classNames({
      'ma__tab-container': true,
      'ma__tab-container--nested': this.props.nested
    });
    const ulClasses = classNames({
      'ma__tab-container-head': true,
      'ma__tab-container-head--nested': this.props.nested,
      'ma__tab-container-head--parent': !this.props.nested
    });
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, (child, index) => {
      const newProps = {
        active: this.state.activeTab === this.state.tabIds.get(index),
        tabIdent: this.state.tabIds.get(index),
        tabRef: this.state.tabRefs[this.state.tabIds.get(index)]
      };
      return React.cloneElement(child, newProps, child.props.children);
    });
    return(
      <TabContext.Provider value={this.state}>
        <div className={classes}>
          <ul
            className={ulClasses}
            id={this.state.tabContainerId}
            role="tablist"
          >
            <span id={this.spanId} className="ma__visually-hidden">
              Use left and right arrows to navigate between tabs, up and down
              arrows to navigate between active tab and its content.
            </span>
            {childrenWithProps}
          </ul>
          <div
            aria-labelledby={this.state.activeTab}
            className="ma__tab-container-body"
            tabIndex={0}
            ref={this.tabBodyRef}
            role="tabpanel"
            id={this.state.tabContainerBodyId}
          />
        </div>
      </TabContext.Provider>
    );
  }
}

TabContainer.defaultProps = {
  nested: false,
  defaultTab: 0
};

export default TabContainer;
