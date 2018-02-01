import React from 'react';
import PropTypes from 'prop-types';
import SelectBox from '../../atoms/forms/SelectBox/index';

class OrgSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrg: {}
    };
    this.setSelectedOrgState = this.setSelectedOrgState.bind(this);
  }

  /**
   * Sets the state of selected from the SelectBox, so <OrgInfo/> knows what to render.
   * @param selectedIndex
   * @param selected
   * @param selectedValue
   */
  setSelectedOrgState (selectedIndex, selected, selectedValue) {
    // Get the selected org based on the selected value
    const selectedOrg = this.props.organizations.filter(org => org.value === selectedValue);
    // If there is an org that matches the value, return it
    if (selectedOrg.length > 0) {
      this.setState({
        selectedOrg: selectedOrg[0] // protect against multiple matches by returning the first
      });
    }
    else {
      this.setState({
        selectedOrg: {}
      });
    }
  }

  render() {
    const orgSelector = this.props;
    return(
      <section className="ma__org-selector js-org-selector">
        <SelectBox id={orgSelector.selectBox.id} options={orgSelector.selectBox.options} label={orgSelector.selectBox.label} onChangeCallback={this.setSelectedOrgState} />
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
  if (Object.keys(org).length > 0 && org.hasOwnProperty("value")) {
    return (
      <div className="ma__org-selector__org-info js-org-info">
        <section className="ma__org-info">
          <div className="ma__org-info__header">
            {org.image.src && (
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
                    <defs id="SvgjsDefs1001"/>
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
                  ><defs id="SvgjsDefs1001"/><path
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

OrgInfo.propTypes = {
  org: PropTypes.shape({
    value: PropTypes.string.isRequired,
    image: PropTypes.shape({
      href: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired
    }),
    name: PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    }),
    jobTitle: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    moreLink: PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      info: PropTypes.string
    })
  }).isRequired
};

OrgSelector.propTypes = {
  /** @atoms/forms/SelectBox  */
  selectBox: PropTypes.instanceOf(SelectBox).isRequired,
  /** An array of objects of org info which renders (as <OrgInfo/>) when that org is selected  */
  organizations: PropTypes.instanceOf(OrgInfo)
};

export default OrgSelector;
