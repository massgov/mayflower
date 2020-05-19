import React from 'react';
import PropTypes from 'prop-types';
import SelectBox from '../SelectBox/index';
import InputTextTypeAhead from '../InputTextTypeAhead';
import ImagePromo from '../../molecules/ImagePromo';
import './style.scss';

class OrgSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: {}
    };
    this.handleOrgSelectChange = this.handleOrgSelectChange.bind(this);
    this.handleOrgTypeAheadChange = this.handleOrgTypeAheadChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const input = (nextProps.selectBox) ? nextProps.selectBox : nextProps.typeAhead;
    const selectValue = input.options.find((element) => element.text === input.selected);
    if (selectValue !== undefined) {
      const selectedOrg = nextProps.organizations.filter((org) => Object.prototype.hasOwnProperty.call(org, 'value') && org.value === selectValue.value);
      if (selectedOrg.length > 0) {
        this.setState({
          selectedOrg: selectedOrg[0] // protect against multiple matches by returning the first
        });
        // If there is no org match, reset state so no orgInfo renders.
      } else {
        this.setState({
          selectedOrg: {}
        });
      }
    } else {
      this.setState({
        selectedOrg: {}
      });
    }
  }
  /**
   * Sets the selectedOrg to the item selected from the input, so <OrgInfo/>
   * knows what to render.
   *
   * @param input object
   *   @see SelectBox handleSelect method.
   */
  handleOrgSelectChange(input) {
    const selectValue = (input.suggestion) ? input.suggestion : input;
    if (selectValue !== undefined) {
      const checkValue = (input.suggestion) ? selectValue.value : selectValue.selectedValue;
      const selectedOrg = this.props.organizations.filter((org) => Object.prototype.hasOwnProperty.call(org, 'value') && org.value === checkValue);
      if (selectedOrg.length > 0) {
        this.setState({
          selectedOrg: selectedOrg[0] // protect against multiple matches by returning the first
        });
        // If there is no org match, reset state so no orgInfo renders.
      } else {
        this.setState({
          selectedOrg: {}
        });
      }
    } else {
      this.setState({
        selectedOrg: {}
      });
    }
    if (typeof this.props.onChangeOrgCallback === 'function') {
      this.props.onChangeOrgCallback(input);
    }
  }
  handleOrgTypeAheadChange(event, input) {
    // Stop the filters form submission if enter is pressed in the selector.
    event.preventDefault();
    this.handleOrgSelectChange(input);
  }

  render() {
    const selectBoxProps = this.props.selectBox;
    const typeAheadProps = this.props.typeAhead;
    return(
      <section className="ma__org-selector js-org-selector">
        {selectBoxProps && <SelectBox {...selectBoxProps} onChangeCallback={this.handleOrgSelectChange} />}
        {typeAheadProps && <InputTextTypeAhead {...typeAheadProps} onChange={this.handleOrgTypeAheadChange} />}
        <OrgInfo org={this.state.selectedOrg} />
      </section>
    );
  }
}

/**
 * Porting over handlebars template for orgInfo
 * @see https://github.com/massgov/mayflower/blob/dev/styleguide/source/assets/js/templates/orgInfo.html
 */
const OrgInfo = (props) => {
  const org = props.org;
  if (Object.keys(org).length > 0 && Object.prototype.hasOwnProperty.call(org, 'value')) {
    return(
      <div className="ma__org-selector__org-info js-org-info">
        <section className="ma__org-info">
          <ImagePromo
            title={{
              href: org.name.href,
              text: org.name.text
            }}
            tags={null}
            image={{
              alt: org.image.alt,
              src: org.image.src,
              height: org.image.height,
              width: org.image.width
            }}
            stacked
            small
            subTitle={org.jobTitle}
            description={org.message}
            link={{
              text: org.moreLink.text,
              href: org.moreLink.href,
              info: org.moreLink.info
            }}
          />
        </section>
      </div>
    );
  }
  return false;
};

/** An object which has the image, name, title, description, and link to an org.  */
OrgInfo.propTypes = ImagePromo.propTypes;

OrgSelector.propTypes = {
  /** @forms/SelectBox  */
  selectBox: PropTypes.shape(SelectBox.propTypes),
  /** @forms/InputTextTypeAhead  */
  typeAhead: PropTypes.shape(InputTextTypeAhead.propTypes),
  /** An array of objects of org info which renders (as <OrgInfo/>) when that org is selected  */
  organizations: PropTypes.arrayOf(PropTypes.shape(OrgInfo.propTypes)),
  /** A custom function users can add for when onchange is triggered */
  onChangeOrgCallback: PropTypes.func
};

export default OrgSelector;
