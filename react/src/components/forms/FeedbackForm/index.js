/**
 * FeedbackForm module.
 * @module @massds/mayflower-react/FeedbackForm
 */
import React from 'react';
import PropTypes from 'prop-types';
import CharacterCounter from 'react-character-counter';
import classNames from 'classnames';
import is from 'is';
import Paragraph from 'MayflowerReactText/Paragraph';

// These components exist to make it clear in FeedbackForm's render what's going on.
const RefererField = (props) => <input type="hidden" {...props} />;
const NodeIdField = (props) => <input type="hidden" {...props} />;
// Required for jsonp responses to work.
const JsonPField = () => <input type="hidden" name="jsonp" value={1} />;
// A hidden input field that prevents FormStack from looking for a required field that wasn't filled in.
const HiddenFields = (props) => {
  const { formId, ...rest } = props;
  return(<input type="hidden" name="hidden_fields" id={`hidden_fields${formId}`} {...rest} />);
};
HiddenFields.propTypes = {
  /** The form id that the hidden input will be rendered within. */
  formId: PropTypes.number
};

export default class FeedbackForm extends React.Component {
  static propTypes = {
    /** A ref object as created by React.createRef(). Will be applied to the form element. */
    formRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any })
    ]),
    /** A function whose return value is displayed after a successful form submission. */
    successMessage: PropTypes.func.isRequired,
    /** The field id number for the yes textarea. */
    yesFeedbackId: PropTypes.number,
    /** The field id number for the no textarea. */
    noFeedbackId: PropTypes.number,
    /** The field id number for the referer. */
    refererId: PropTypes.number,
    /** The id number for the form from FormStack. */
    formId: PropTypes.number,
    /** The field id number for the yes/no radio buttons. */
    radioId: PropTypes.number,
    /** A drupal node id number for the referer. */
    nodeId: PropTypes.number,
    /** A function whose return value is rendered under the yes textarea. */
    yesDisclaimer: PropTypes.func,
    /** A function whose return value is rendered under the no textarea. */
    noDisclaimer: PropTypes.func
  }

  static defaultProps = {
    formId: 2521317,
    radioId: 47054416,
    yesFeedbackId: 52940022,
    noFeedbackId: 47054414,
    refererId: 47056299
  };

  state = {
    yesText: '',
    noText: '',
    errorMessage: <Paragraph className="error">Please go back and fill in any required fields (marked with an *)</Paragraph>,
    feedbackChoice: null,
    hasError: [],
    success: false,
    formSubmitted: false
  };

  componentDidMount() {
    if (window) {
      // We don't have the FormStack class available, but we can fake like we do:
      window[`form${this.props.formId}`] = {
        onSubmitError: (err) => {
          if (err) {
            const hasError = [...this.state.hasError];
            hasError.push(this.props.radioId);
            hasError.push(this.props.noFeedbackId);
            const errorMessage = <Paragraph className="error">{err.error}</Paragraph>;
            this.setState({ hasError, errorMessage });
          }
        },
        onPostSubmit: () => {
          this.setState({ success: true });
        }
      };
    }
  }

  yesRadio = React.createRef();

  yesTextArea = React.createRef();

  noRadio = React.createRef();

  noTextArea = React.createRef();

  submitButton = React.createRef();

  defaultDisclaimer = () => (
    <div id="feedback-note" className="ma__disclaimer">
      We use your feedback to help us improve this site but we are not able to respond directly.
      <strong>Please do not include personal or contact information.</strong>
      {' '}
      If you need a response, please locate the contact information elsewhere on this page or in the footer.
    </div>
  );

  prefixLabel = (id) => `label${id}`;

  prefixField = (id) => `field${id}`;

  handleRadioChange = (e) => {
    if (e.currentTarget === this.yesRadio.current) {
      return{ feedbackChoice: true };
    }
    if (e.currentTarget === this.noRadio.current) {
      return{ feedbackChoice: false };
    }
    return{};
  }

  // Handles the onChange event for the yes/no radio buttons as well as the yes/no textareas.
  handleChange = (e) => {
    let newState = {};
    e.persist();
    if (e.currentTarget === this.yesRadio.current || e.currentTarget === this.noRadio.current) {
      newState = Object.assign(newState, this.handleRadioChange(e));
    }
    if (e.currentTarget === this.yesTextArea.current) {
      newState = Object.assign(newState, { yesText: e.currentTarget.value });
    }
    if (e.currentTarget === this.noTextArea.current) {
      newState = Object.assign(newState, { noText: e.currentTarget.value });
    }
    // If the form was previously submitted but the user made a new change, reset the form submitted status.
    if (this.state.formSubmitted && Object.keys(newState).length > 0) {
      newState.formSubmitted = false;
      newState.success = false;
      newState.successMessage = '';
    }
    this.setState(newState, this.checkForErrors);
  }

  removeError = (errors, idToRemove) => errors.filter((fieldId) => !is.equal(fieldId, idToRemove));

  checkForErrors = () => {
    let hasError = [...this.state.hasError];
    const { radioId, noFeedbackId } = this.props;
    const { feedbackChoice, formSubmitted } = this.state;
    // The user has not selected yes or no.
    if (!hasError.includes(radioId) && feedbackChoice === null) {
      hasError.push(radioId);
    }
    if (hasError.includes(radioId) && !is.nil(feedbackChoice)) {
      hasError = this.removeError(hasError, radioId);
    }
    // The user has selected no but has not typed any feedback.
    if (!hasError.includes(noFeedbackId) && feedbackChoice === false && formSubmitted && is.empty(this.noTextArea.current.value)) {
      hasError.push(noFeedbackId);
    } else if (hasError.includes(noFeedbackId) && feedbackChoice === false && !is.empty(this.noTextArea.current.value)) {
      hasError = this.removeError(hasError, noFeedbackId);
    }
    // If the user changed choices from no to yes, remove the error for no if there was one.
    if (feedbackChoice === true && hasError.includes(noFeedbackId)) {
      hasError = this.removeError(hasError, noFeedbackId);
    }
    // Prevent calling setState too often while typing in textareas.
    if (!is.equal(hasError, this.state.hasError)) {
      this.setState({ hasError });
    }
    return hasError;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Update the component state to know that the form was just submitted,
    // then check the form for any errors based on this new state.
    this.setState({ formSubmitted: true }, () => {
      // checkForErrors doesn't immediately update state, so it returns what this.state.hasError is being set to.
      const errors = this.checkForErrors();
      // If no remaining errors, submit form.
      // Since we have to use jsonp and this component could be used with server side rendering, ensure that window exists.
      if (window && is.array.empty(errors)) {
        import('b-jsonp').then((module) => {
          const jsonp = module.default;
          const form = document.getElementById(`fsForm${this.props.formId}`);
          const data = new FormData(form);
          const body = {};
          new Map(data.entries()).forEach((value, key) => {
            body[key] = value;
          });
          // This library leaves behind the script added by formstack in the head of the document.
          // Any errors are handled by onSubmitError and the response is handled through onPostSubmit.
          // jsonp requires you to pass a function for the last param though.
          jsonp('https://www.formstack.com/forms/index.php', body, {
            prefix: `form${this.props.formId}`,
            name: 'onPostSubmit'
          }, () => {});
        });
      }
    });
  };

  render() {
    const {
      yesFeedbackId, yesDisclaimer, noFeedbackId, noDisclaimer, refererId, formId, formRef, radioId, nodeId, successMessage
    } = this.props;
    const {
      hasError, success, feedbackChoice, formSubmitted, noText, yesText, errorMessage
    } = this.state;
    const yesId = this.prefixField(yesFeedbackId);
    const noId = this.prefixField(noFeedbackId);
    const formProps = {
      id: `fsForm${formId}`,
      method: 'post',
      className: 'formForm',
      onSubmit: this.handleSubmit,
      action: 'https://www.formstack.com/forms/index.php',
      encType: 'multipart/form-data'
    };
    // Allows other components to have direct access to the form element.
    if (formRef) {
      formProps.ref = formRef;
    }
    const refererProps = {
      id: this.prefixField(refererId),
      name: this.prefixField(refererId),
      size: '50',
      value: window.location.href,
      className: 'fsField'
    };
    const yesFieldSetClassNames = classNames({
      'radio-yes': true,
      error: (hasError.includes(yesFeedbackId))
    });
    const noFieldSetClassNames = classNames({
      'radio-no': true,
      error: (hasError.includes(noFeedbackId))
    });
    const noTextAreaClassNames = classNames({
      'fsField required': true,
      error: (hasError.includes(noFeedbackId))
    });
    const radiosClassNames = (hasError.includes(radioId)) ? 'error' : null;
    const messsageClassNames = classNames({
      messages: true,
      hide: success === false && is.array.empty(hasError)
    });
    const messageStyle = {
      fontWeight: 'bold'
    };
    if (!is.array.empty(hasError)) {
      messageStyle.color = 'red';
    }
    const characterCounterProps = {
      maxLength: 10000,
      wrapperStyle: {
        display: 'block',
        fontSize: '17px',
        lineHeight: '1.625rem',
        textAlign: 'right'
      },
      characterCounterStyle: {
        position: 'relative',
        display: 'block',
        bottom: '32px',
        right: '5px',
        top: 'auto',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.625rem'
      },
      overrideStyle: true
    };
    return(success && formSubmitted) ? (
      <div className="ma__feedback-form" data-mass-feedback-form>
        <h2 className="visually-hidden">Feedback</h2>
        <form noValidate {...formProps}>
          <fieldset>
            <div className={messsageClassNames} style={messageStyle}>
              {is.fn(successMessage) && successMessage()}
            </div>
          </fieldset>
        </form>
      </div>
    ) : (
      <div className="ma__feedback-form" data-mass-feedback-form>
        <h2 className="visually-hidden">Feedback</h2>
        <form noValidate {...formProps}>
          <input type="hidden" name="form" value={formId} />
          <JsonPField />
          <input type="hidden" name="viewkey" value="vx39GBYJhi" />
          { feedbackChoice === true && <HiddenFields formId={formId} value={noId} />}
          { feedbackChoice === false && <HiddenFields formId={formId} value={yesId} />}
          <input type="hidden" name="_submit" value="1" />
          <input type="hidden" name="style_version" value="3" />
          <input type="hidden" id="viewparam" name="viewparam" value="524744" />
          <RefererField {...refererProps} />
          <NodeIdField id="field58154059" name="field58154059" value={nodeId} />
          <NodeIdField id="field57432673" name="field57432673" value={nodeId} />
          <fieldset className={radiosClassNames}>
            <legend className="fsLabel requiredLabel fsLabelVertical">
              Did you find what you were looking for on this webpage?
              <span>
                {' '}
                *
                <span className="visually-hidden">required</span>
              </span>
            </legend>
            <div className="ma__input-group__items ma__input-group__items--inline">
              <div className="ma__input-group__item">
                <span className="ma__input-radio">
                  <input className="fsField required" id={`${this.prefixField(radioId)}_1`} onChange={this.handleChange} ref={this.yesRadio} name={this.prefixField(radioId)} type="radio" value="Yes" />
                  <label className="fsOptionLabel ma__input-radio__label" htmlFor={`${this.prefixField(radioId)}_1`}>Yes</label>
                </span>
              </div>

              <div className="ma__input-group__item">
                <span className="ma__input-radio">
                  <input className="fsField required" id={`${this.prefixField(radioId)}_2`} onChange={this.handleChange} ref={this.noRadio} name={this.prefixField(radioId)} type="radio" value="No" />
                  <label className="fsOptionLabel ma__input-radio__label" htmlFor={`${this.prefixField(radioId)}_2`}>No</label>
                </span>
              </div>
            </div>
          </fieldset>

          {(feedbackChoice === false)
          && (
            <fieldset className={noFieldSetClassNames}>
              <label htmlFor={noId}>
                If &#34;No,&#34; please tell us what you were looking for:
                <span>
                  {' '}
                  *
                  <span className="visually-hidden">required</span>
                </span>
              </label>
              <div className="ma__textarea__wrapper">
                <CharacterCounter value={noText} {...characterCounterProps}>
                  <textarea
                    id={noId}
                    ref={this.noTextArea}
                    onChange={this.handleChange}
                    className={noTextAreaClassNames}
                    name={noId}
                    aria-required="true"
                    maxLength="10000"
                    disabled={feedbackChoice === false ? null : 'disabled'}
                    aria-describedby="feedback-note"
                  />
                </CharacterCounter>
              </div>
              <input type="hidden" id={yesId} name={yesId} value="" />
              {(is.fn(noDisclaimer)) ? noDisclaimer() : this.defaultDisclaimer()}
            </fieldset>
          )}
          {(feedbackChoice === true) && (
            <fieldset className={yesFieldSetClassNames}>
              <label htmlFor={yesId}>Is there anything else you would like to tell us?</label>
              <div className="ma__textarea__wrapper">
                <CharacterCounter value={yesText} {...characterCounterProps}>
                  <textarea
                    ref={this.yesTextArea}
                    onChange={this.handleChange}
                    id={yesId}
                    name={yesId}
                    maxLength="10000"
                    disabled={feedbackChoice === true ? null : 'disabled'}
                    aria-describedby="feedback-note2"
                  />
                </CharacterCounter>
              </div>
              <input type="hidden" id={noId} name={noId} value="" />
              {is.fn(yesDisclaimer) ? yesDisclaimer() : this.defaultDisclaimer()}
            </fieldset>
          )}
          <fieldset className="ma_feedback-fieldset ma__mass-feedback-form__form--submit-wrapper">
            <div className={messsageClassNames} style={messageStyle}>
              {success === false && errorMessage}
            </div>
            <input
              id="submitButton2521317"
              ref={this.submitButton}
              className="submitButton ma__button ma__button--small"
              style={{ display: 'block' }}
              type="submit"
              value="Send Feedback"
            />
          </fieldset>
        </form>
      </div>
    );
  }
}
