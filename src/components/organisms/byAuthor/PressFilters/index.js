import React from 'react';
import PropTypes from 'prop-types';


import Button from '../../../atoms/buttons/Button';
import ColoredHeading from "../../../atoms/headings/ColoredHeading";
import DateRange from '../../../molecules/DateRange';
import OrgSelector from '../../../molecules/OrgSelector';
import SelectBox from '../../../atoms/forms/SelectBox';

class PressFilters extends React.Component {

  constructor(props){
    super(props);
  }

  render () {
    const {action, coloredHeading, topic, orgSelector, pressType, dateRange, submitButton} = this.props;
    return(
      <section className="ma__press-filters">
        <div className="ma__press-filters__container">
          <header className="ma__press-filters__heading">
            <ColoredHeading {...coloredHeading} />
          </header>
          <form className="ma__press-filters__form js-press-filters" action={ action }>
            <div className="ma__press-filters__organizations">
              <OrgSelector {...orgSelector} />
            </div>
            <div className="ma__press-filters__topic">
              <SelectBox {...topic}/>
            </div>
            <div className="ma__press-filters__type">
              <SelectBox {...pressType}/>
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
}

PressFilters.propTypes = {
  pressFilters: PropTypes.shape({
    action: PropTypes.string,
    // coloredHeading: PropTypes.shape({coloredHeading: PropTypes.oneOf([ColoredHeading])}),
    coloredHeading: PropTypes.instanceOf(ColoredHeading),
    topic: PropTypes.instanceOf(SelectBox).isRequired,
    pressType: PropTypes.instanceOf(SelectBox).isRequired,
    orgSelector: PropTypes.instanceOf(OrgSelector).isRequired,
    dateRange: PropTypes.instanceOf(DateRange).isRequired,
    submitButton: PropTypes.instanceOf(Button).isRequired
  })
};

PressFilters.defaultProps = {
  pressFilters: {
    action: '#',
    coloredHeading: ColoredHeading.defaultProps,
    topic: SelectBox.defaultProps,
    pressType: SelectBox.defaultProps,
    orgSelector: OrgSelector.defaultProps,
    dateRange: DateRange.defaultProps,
    submitButton: Button.defaultProps
  }
};

export default PressFilters;
