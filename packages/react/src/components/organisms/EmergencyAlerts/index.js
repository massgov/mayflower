/**
 * EmergencyAlerts module.
 * @module @massds/mayflower-react/EmergencyAlerts
 * @requires module:@massds/mayflower-assets/scss/03-organisms/emergency-alerts
 * @requires module:@massds/mayflower-assets/scss/02-molecules/emergency-alert
 * @requires module:@massds/mayflower-assets/scss/02-molecules/emergency-header
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import Collapse from 'MayflowerReactAnimations/Collapse';
import ButtonAlert from 'MayflowerReactButtons/ButtonAlert';
import EmergencyAlert from 'MayflowerReactMolecules/EmergencyAlert';
import EmergencyHeader from 'MayflowerReactMolecules/EmergencyHeader';

const EmergencyAlerts = ({
  id, emergencyHeader, buttonAlert, alerts, theme, buttonClose, onButtonAlertClick, onButtonCloseClick
}) => {
  const [state, setState] = React.useState({
    open: false,
    close: false
  });
  const handleClick = (e) => {
    const { currentTarget } = e;
    setState({
      open: !state.open
    });
    if (is.fn(onButtonAlertClick)) {
      onButtonAlertClick({ open: state.open, currentTarget });
    }
  };

  const handleClose = (e) => {
    const { currentTarget } = e;
    setState({
      close: !state.close
    });
    if (is.fn(onButtonCloseClick)) {
      onButtonCloseClick({ close: state.close, currentTarget });
    }
  };

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
    open: state.open,
    closed: !state.open
  });
  const hideButtonClasses = classNames({
    'ma__emergency-alerts__hide': true,
    'js-emergency-alerts-link': true,
    [`ma__emergency-alerts__hide--${theme}`]: theme
  });
  return(
    <Collapse in={!state.close} dimension="height">
      <section className={sectionClasses} data-id={id}>
        <div className={headerClasses}>
          <div className="ma__emergency-alerts__container">
            {emergencyHeader && <EmergencyHeader {...emergencyHeader} theme={theme} />}
            { alerts ? (
              <div className="ma__emergency-alerts__header-interface js-accordion-link">
                {buttonAlert && <ButtonAlert {...buttonAlert} onClick={handleClick} isOpen={state.open} />}
              </div>
            ) : (buttonClose && (
              <button
                type="button"
                className={hideButtonClasses}
                title="hide alert"
                aria-label="hide alert"
                onClick={handleClose}
              >
                +
              </button>
            )
            )}
          </div>
        </div>
        { alerts && (
          <>
            <Collapse in={state.open} dimension="height">
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
              {buttonAlert && <ButtonAlert {...buttonAlert} onClick={handleClick} isOpen={state.open} />}
            </div>
          </>
        )}
      </section>
    </Collapse>
  );
};

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
  /** An array of alert messages: <br />
   * `message:` A message describing the event.<br />
   * `timeStamp:` A string representing the time of the event.<br />
   * `link:` An optional function whose return value is a link to take the user to page with more information.
  */
  alerts: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    timeStamp: PropTypes.string,
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
