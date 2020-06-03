/**
 * PressFilters module.
 * @module @massds/mayflower-react/PressFilters
 * @requires module:@massds/mayflower-assets/scss/03-organisms/press-filters
 * @requires module:@massds/mayflower-assets/scss/01-atoms/buttons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/colored-heading
 * @requires module:@massds/mayflower-assets/scss/02-molecules/date-range
 * @requires external:pikaday/scss/pikaday
 * @requires module:@massds/mayflower-assets/scss/00-base/pikaday
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-date
 * @requires module:@massds/mayflower-assets/scss/02-molecules/org-selector
 * @requires module:@massds/mayflower-assets/scss/01-atoms/select-box
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 * @requires module:@massds/mayflower-assets/scss/02-molecules/image-promo
 * @requires module:@massds/mayflower-assets/scss/02-molecules/org-info
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 */
import React from 'react';
import PropTypes from 'prop-types';

// import child components
import Button from 'MayflowerReactButtons/Button';
import ColoredHeading from 'MayflowerReactHeadings/ColoredHeading';
import DateRange from 'MayflowerReactForms/DateRange';
import OrgSelector from 'MayflowerReactForms/OrgSelector';
import SelectBox from 'MayflowerReactForms/SelectBox';
import InputTextTypeAhead from 'MayflowerReactForms/InputTextTypeAhead';

const PressFilters = (props) => {
  const {
    action, coloredHeading, topic, orgSelector, pressType, dateRange, submitButton, clearButton
  } = props;
  const handleClear = () => {
    if (typeof props.clearButton.onClearCallback === 'function') {
      props.clearButton.onClearCallback();
    }
  };
  const selectBoxProps = pressType.selectBox;
  const typeAheadProps = pressType.typeAhead;
  return(
    <section className="ma__press-filters">
      <div className="ma__press-filters__container">
        <header className="ma__press-filters__heading">
          <ColoredHeading {...coloredHeading} />
        </header>
        <form className="ma__press-filters__form js-press-filters" action={action}>
          <div className="ma__press-filters__organizations">
            <OrgSelector {...orgSelector} />
          </div>
          {topic && (
            <div className="ma__press-filters__topic">
              <SelectBox {...topic} />
            </div>
          )}
          <div className="ma__press-filters__type">
            {selectBoxProps && <SelectBox {...selectBoxProps} />}
            {typeAheadProps && <InputTextTypeAhead {...typeAheadProps} />}
          </div>
          <div className="ma__press-filters__date">
            <DateRange {...dateRange} />
          </div>
          <div className="ma__press-filters__button">
            <Button {...submitButton} />
          </div>
          {clearButton && (
            <button type="button" aria-label={clearButton.info} className="ma__press-filters__clear js-press-filters-clear" onClick={() => handleClear()}>
              {clearButton.text}
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

PressFilters.propTypes = {
  /** The form action  */
  action: PropTypes.string,
  /** @atoms/headings/ColoredHeading */
  coloredHeading: PropTypes.shape(ColoredHeading.PropTypes),
  /** @forms/SelectBox */
  topic: PropTypes.shape(SelectBox.PropTypes),
  /** @forms/SelectBox or /** @forms/InputTextTypeAhead  */
  pressType: PropTypes.oneOf([
    PropTypes.shape({ selectBox: SelectBox.propTypes }),
    PropTypes.shape({ typeAhead: InputTextTypeAhead.propTypes })
  ]),
  /** @molecules/OrgSelector */
  orgSelector: PropTypes.shape(OrgSelector.PropTypes).isRequired,
  /** @molecules/DateRange */
  dateRange: PropTypes.shape(DateRange.PropTypes).isRequired,
  /** @forms/Button */
  submitButton: PropTypes.shape(Button.PropTypes).isRequired,
  /** Clear all button at the bottom of the filter */
  clearButton: PropTypes.shape({
    text: PropTypes.string,
    info: PropTypes.string,
    onClearCallback: PropTypes.func
  })
};

PressFilters.defaultProps = {
  action: '#',
  coloredHeading: ColoredHeading.defaultProps
};

export default PressFilters;
