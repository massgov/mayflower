import React from 'react';
import PropTypes from 'prop-types';

// import child components
import Button from '../../atoms/buttons/Button';
import ColoredHeading from '../../atoms/headings/ColoredHeading';
import DateRange from '../../molecules/DateRange';
import OrgSelector from '../../molecules/OrgSelector';
import SelectBox from '../../atoms/forms/SelectBox';

const PressFilters = (props) => {
  const {
    action, coloredHeading, topic, orgSelector, pressType, dateRange, submitButton
  } = props;
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
            <SelectBox {...pressType} />
          </div>
          <div className="ma__press-filters__date">
            <DateRange {...dateRange} />
          </div>
          <div className="ma__press-filters__button">
            <Button {...submitButton} />
          </div>
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
  /** @atoms/forms/SelectBox */
  topic: PropTypes.shape(SelectBox.PropTypes),
  /** @atoms/forms/SelectBox */
  pressType: PropTypes.shape(SelectBox.PropTypes).isRequired,
  /** @molecules/OrgSelector */
  orgSelector: PropTypes.shape(OrgSelector.PropTypes).isRequired,
  /** @molecules/DateRange */
  dateRange: PropTypes.shape(DateRange.PropTypes).isRequired,
  /** @atoms/forms/Button */
  submitButton: PropTypes.shape(Button.PropTypes).isRequired
};

PressFilters.defaultProps = {
  action: '#',
  coloredHeading: ColoredHeading.defaultProps
};

export default PressFilters;
