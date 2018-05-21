import React from 'react';
import PropTypes from 'prop-types';
import SelectBox from '../../atoms/forms/SelectBox/index';
import InputTextTypeAhead from '../../atoms/forms/InputTextTypeAhead';
import './style.css';

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
          <div className="ma__org-info__header">
            { org.image.src && (
            <div className="ma__org-info__image">
              <a href={org.image.href}>
                <img
                  alt={org.image.alt}
                  src={org.image.src}
                  height={org.image.height}
                  width={org.image.width}
                />
              </a>
            </div>
            )}
            <div className="ma__org-info__title">
              <h2 className="ma__org-info__name">
                <span className="ma__decorative-link">
                  <a href={org.name.href}>{org.name.text}&nbsp;
                    <svg
                      aria-hidden="true"
                      id="SvgjsSvg1000"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                    >
                      <defs id="SvgjsDefs1001" />
                      <path
                        id="SvgjsPath1007"
                        d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z "
                        transform="matrix(1,0,0,1,-971,-1881)"
                      />
                    </svg>
                  </a>
                </span>
              </h2>
              {org.jobTitle && (
              <h3 className="ma__org-info__job-title">
                {org.jobTitle}
              </h3>
              )}
            </div>
          </div>
          <div className="ma__org-info__content">
            <div className="ma__rich-text">
              {org.message}
            </div>
            {org.moreLink.href && (
            <div className="ma__org-info__link">
              <span className="ma__decorative-link">
                <a
                  href={org.moreLink.href}
                  aria-label={org.moreLink.info}
                >{org.moreLink.text}&nbsp;
                  <svg
                    aria-hidden="true"
                    id="SvgjsSvg1000"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                  ><defs id="SvgjsDefs1001" /><path
                    id="SvgjsPath1007"
                    d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z "
                    transform="matrix(1,0,0,1,-971,-1881)"
                  />
                  </svg>
                </a>
              </span>
            </div>
            )}
          </div>
        </section>
      </div>
    );
  }
  return false;
};

/** An object which has the image, name, title, description, and link to an org.  */
OrgInfo.propTypes = {
  value: PropTypes.string,
  image: PropTypes.shape({
    href: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string
  }),
  name: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string
  }),
  jobTitle: PropTypes.string,
  message: PropTypes.string,
  moreLink: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
    info: PropTypes.string
  })
};

OrgSelector.propTypes = {
  /** @atoms/forms/SelectBox  */
  selectBox: PropTypes.shape(SelectBox.propTypes),
  /** @atoms/forms/InputTextTypeAhead  */
  typeAhead: PropTypes.shape(InputTextTypeAhead.propTypes),
  /** An array of objects of org info which renders (as <OrgInfo/>) when that org is selected  */
  organizations: PropTypes.arrayOf(PropTypes.shape(OrgInfo.propTypes)),
  /** A custom function users can add for when onchange is triggered */
  onChangeOrgCallback: PropTypes.func
};

export default OrgSelector;
