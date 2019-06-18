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
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const { target } = e;
    this.setState({
      open: !this.state.open
    });
    if (is.fn(this.props.onButtonClick)) {
      this.props.onButtonClick({ open: !this.state.open, target });
    }
  }
  render() {
    const {
      id, emergencyHeader, buttonAlert, alerts, theme
    } = this.props;
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
    return(
      <section className="ma__emergency-alerts" data-id={id}>
        <div className={headerClasses}>
          <div className="ma__emergency-alerts__container">
            {emergencyHeader && <EmergencyHeader {...emergencyHeader} theme={theme} />}
            { alerts && (
              <div className="ma__emergency-alerts__header-interface js-accordion-link">
                {buttonAlert && <ButtonAlert {...buttonAlert} onClick={this.handleClick} isOpen={this.state.open} />}
              </div>
            )}
          </div>
        </div>
        { alerts && (
          <React.Fragment>
            <Collapse in={this.state.open} dimension="height">
              <div className={alertsWrapperClasses}>
                <div className="ma__emergency-alerts__container">
                  {alerts.map((alert, i) => <EmergencyAlert {...alert} theme={theme} key={`alert-nested--${i}`} />)}
                </div>
              </div>
            </Collapse>
            <div className={interfaceClasses}>
              {buttonAlert && <ButtonAlert {...buttonAlert} onClick={this.handleClick} isOpen={this.state.open} />}
            </div>
          </React.Fragment>
        )}
      </section>
    );
  }
}

EmergencyAlerts.propTypes = {
  /** The data-id of the organism */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** A string that controls different color themes for the component. */
  theme: PropTypes.oneOf(['c-warning', 'c-primary-alt', 'c-primary', 'c-gray', 'c-error']),
  /** An on button alert click callback function */
  onButtonClick: PropTypes.func,
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
  }))
};

EmergencyAlerts.defaultProps = {
  theme: 'c-warning'
};

export default EmergencyAlerts;
