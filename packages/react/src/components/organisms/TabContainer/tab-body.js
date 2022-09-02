import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal/es';

class TabBody extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      nodeList: [this.props.tabBodyRef.current] || []
    };
    // console.log('set state: ' + global.MutationObserver)
    if (global.MutationObserver) {
      this.observer = new MutationObserver((mutations) => {
        const tabContainer = document.getElementById(this.props.tabContainerBodyId);
        console.log('mutated!!!!')
        console.log(mutations)
        mutations.forEach((mutation) => {
          if (!mutation.target) {
            return;
          }
          if (this.props.active && mutation.target.contains(tabContainer)) {
            this.setState({ nodeList: [tabContainer] });
          } else if (!this.props.active && mutation.target.contains(tabContainer)) {
            this.setState({ nodeList: [] });
          }
        });
      });
    }
    this.observer.observe(document, { attributes: true, childList: true, subtree: true });
  }

  componentDidMount() {
    const nodeList = document.getElementById(this.props.tabContainerBodyId);
    if (nodeList) {
      console.log('rendered!!!!!')
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ nodeList: [nodeList] });
    }
    // console.log('did mount: ' + global.MutationObserver)
    if (global.MutationObserver) {
      console.log('mounted!!!!!')
      this.observer.observe(document, { attributes: true, childList: true, subtree: true });
    }
  }

  componentWillUnmount() {
    if (global.MutationObserver) {
      this.observer.disconnect();
    }
  }

  render() {
    // console.log('state: ' +this.state.nodeList)
    console.log(this.props.tabBodyRef.current)
    if (Array.isArray(this.state.nodeList) && this.state.nodeList.length > 0 && this.props.active) {
      return(
        <Portal node={this.state.nodeList[0]}>
          {this.props.children}
        </Portal>
      );
    }
    return null;
  }
}

TabBody.propTypes = {
  /** The tab container body to render Tab children into. */
  tabContainerBodyId: PropTypes.string.isRequired,
  /** Sets if the tab is the currently active tab or not. */
  active: PropTypes.bool,
  /** Children passed to tab body (tab content) */
  children: PropTypes.node
};

export default TabBody;
