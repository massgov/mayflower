import React from 'react';
import ReactDOM from 'react-dom';
import { Portal } from 'react-portal';

class TabBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeList: []
    };
    if (global.MutationObserver) {
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (!mutation.target) {
            return;
          }
          if (this.props.active && mutation.target.contains(document.getElementById(this.props.tabContainerBodyId))) {
            this.setState({ nodeList: [document.getElementById(this.props.tabContainerBodyId)] });
          } else if (!this.props.active && mutation.target.contains(document.getElementById(this.props.tabContainerBodyId))) {
            this.setState({ nodeList: [] })
          }
        });
      });
    }
  }
  componentDidMount() {
    const nodeList = document.getElementById(this.props.tabContainerBodyId);
    if (nodeList) {
      this.setState({ nodeList: [nodeList] });
    }
    if (global.MutationObserver) {
      this.observer.observe(document, { attributes: true, childList: true, subtree: true });
    }
  }
  componentWillUnmount() {
    if (global.MutationObserver) {
      this.observer.disconnect();
    }
  }
  render() {
    if (this.state.nodeList.length > 0 && this.props.active) {
      return(
        <Portal node={this.state.nodeList[0]}>
          {this.props.children}
        </Portal>
      );
    }
    return null;
  }
}

export default TabBody;
