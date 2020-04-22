import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import Collapse from '../../animations/Collapse';
import ButtonAlert from '../../atoms/buttons/ButtonAlert';
import EmergencyAlert from '../../molecules/EmergencyAlert';
import EmergencyHeader from '../../molecules/EmergencyHeader';
import './style.css';

class EmergencyAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      close: false
    };
  }
  handleClick = (e) => {
    const { currentTarget } = e;
    this.setState({
      open: !this.state.open
    });
    if (is.fn(this.props.onButtonAlertClick)) {
      this.props.onButtonAlertClick({ open: !this.state.open, currentTarget });
    }
  }
  handleClose = (e) => {
    const { currentTarget } = e;
    this.setState({
      close: !this.state.close
    });
    if (is.fn(this.props.onButtonCloseClick)) {
      this.props.onButtonCloseClick({ close: !this.state.close, currentTarget });
    }
  }
  render() {
    const {
      id, emergencyHeader, buttonAlert, alerts, theme, buttonClose
    } = this.props;
    const sectionClasses = classNames({
      'ma__emergency-alerts': true,
      [`ma__emergency-alerts--${theme}`]: theme
    });
    const alertsWrapperClasses = classNames({
      'ma__emergency-alerts__content': true,
      'js-accordion-content': true,
      [`ma__emergency-alerts__content--${theme}`]: theme
    });
    const headerClasses = classNames({
      'ma__emergency-alerts__header': true,
      [`ma__emergency-alerts__header--${theme}`]: theme
    });
    const interfaceClasses = classNames({
      'ma__emergency-alerts__interface': true,
      'js-accordion-link': true,
      [`ma__emergency-alerts__interface--${theme}`]: theme,
      open: this.state.open,
      closed: !this.state.open
    });
    const hideButtonClasses = classNames({
      'ma__emergency-alerts__hide': true,
      'js-emergency-alerts-link': true,
      [`ma__emergency-alerts__hide--${theme}`]: theme
    });
    return(
      <Collapse in={!this.state.close} dimension="height">
        <section className={sectionClasses} data-id={id}>
          <div className={headerClasses}>
            <div className="ma__emergency-alerts__container">
              {emergencyHeader && <EmergencyHeader {...emergencyHeader} theme={theme} />}
              { alerts ? (
                <div className="ma__emergency-alerts__header-interface js-accordion-link">
                  {buttonAlert && <ButtonAlert {...buttonAlert} onClick={this.handleClick} isOpen={this.state.open} />}
                </div>
              ) : (buttonClose && (
                <button
                  className={hideButtonClasses}
                  title="hide alert"
                  aria-label="hide alert"
                  onClick={this.handleClose}
                >
                  +
                </button>
              )
              )}
            </div>
          </div>
          { alerts && (
            <React.Fragment>
              <Collapse in={this.state.open} dimension="height">
                <div className={alertsWrapperClasses}>
                  <div className="ma__emergency-alerts__container">
                    {
                      /* eslint-disable-next-line react/no-array-index-key */
                      alerts.map((alert, i) => <EmergencyAlert {...alert} theme={theme} key={`alert-nested--${i}`} />)
                    }
                  </div>
                </div>
              </Collapse>
              <div className={interfaceClasses}>
                {buttonAlert && <ButtonAlert {...buttonAlert} onClick={this.handleClick} isOpen={this.state.open} />}
              </div>
            </React.Fragment>
          )}
        </section>
      </Collapse>
    );
  }
}

EmergencyAlerts.propTypes = {
  /** The data-id of the organism */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** A string that controls different color themes for the component. */
  theme: PropTypes.oneOf(['c-warning', 'c-primary-alt', 'c-primary', 'c-gray', 'c-error']),
  /** An on button alert click callback function */
  onButtonAlertClick: PropTypes.func,
  /** An on button close click callback function */
  onButtonCloseClick: PropTypes.func,
  /** The emergency header props */
  emergencyHeader: PropTypes.shape(EmergencyHeader.propTypes),
  /** The props for the button alert */
  buttonAlert: PropTypes.shape(ButtonAlert.propTypes),
  /* An array of alter messages */
  alerts: PropTypes.arrayOf(PropTypes.shape({
    /** A message describing the event. */
    message: PropTypes.string.isRequired,
    /** A string representing the time of the event. */
    timeStamp: PropTypes.string,
    /** An optional function whose return value is a link to take the user to page with more information. */
    link: PropTypes.func
  })),
  /** Whether or not to render a close button if not alerts are provided */
  buttonClose: PropTypes.bool
};

EmergencyAlerts.defaultProps = {
  theme: 'c-warning',
  buttonClose: true
};

export default EmergencyAlerts;
