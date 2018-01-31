import React from 'react';
import PropTypes from 'prop-types';
import SelectBox from '../../atoms/forms/SelectBox';

class OrgSelector extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      org: {}
    };
    this.renderOrgData = this.renderOrgData.bind(this)
  }

  renderOrgData (selectedIndex, selected, selectedValue) {
    if(selectedValue) {
      this.setState({
        org: this.props.organizations[selectedIndex]
      });
    }
    else {
      this.setState({
        org: {}
      });
    }
  }

  render () {
    return(
      <section className="ma__org-selector js-org-selector">
        <SelectBox options={this.props.selectBox.options} label={this.props.selectBox.label} onChangeCallback={this.renderOrgData}></SelectBox>
        <div className="ma__org-selector__org-info js-org-info"></div>
        <OrgInfo org={this.state.org}></OrgInfo>
      </section>
    );
  };
}

OrgSelector.propTypes = {
  selectBox: PropTypes.instanceOf(SelectBox).isRequired,
  organizations: PropTypes.arrayOf(PropTypes.shape({
    value:  PropTypes.string.isRequired,
    image: PropTypes.shape({
      href: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
    }),
    name: PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
    jobTitle: PropTypes.string.isRequired,
    message:  PropTypes.string.isRequired,
    moreLink: PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      info: PropTypes.string,
    }),
  })).isRequired,
};

OrgSelector.defaultProps = {
  selectBox: {
    label: 'State organization',
    required: false,
    options: [
      {
        value: '',
        text: 'All Organizations'
      },
      {
        value: 'attorney-general-office',
        text: 'Attorney General\'s Office'
      },
      {
        value: 'governors-office',
        text: 'Governor\'s Office'
      }
    ]
  },
  organizations: [
  {
    value: '',
    image: null,
    name: null,
    jobTitle: '',
    message: '',
    moreLink: null
  },
  {
    value: 'attorney-general-office',
    image: {
      href: '#',
      alt: 'Maura Healey',
      src: 'https://mayflower.digital.mass.gov/assets/images/placeholder/100x100.png',
      height: '100',
      width: '100',
    },
    name: {
      href: '#',
      text: 'Maura Healey',
    },
    jobTitle: "Attorney General",
    message: 'The Attorney General is the chief lawyer and law enforcement officer of the Commonwealth of Massachusetts. In addition, her office is an advocate and resource for the Commonwealth and its residents.',
    moreLink: {
      href: '#',
      text: 'more information',
      info: 'learn more about the Organization',
    },
  },
  {
    value: 'governors-office',
    image: {
      href: '#',
      alt: 'Charles Baker',
      src: 'https://mayflower.digital.mass.gov/assets/images/placeholder/100x100.png',
      height: '100',
      width: '100',
    },
    name: {
      href: '#',
      text: 'Charles Baker',
    },
    jobTitle: "Governor",
    message: 'The Governor is the chief lawyer and law enforcement officer of the Commonwealth of Massachusetts. In addition, her office is an advocate and resource for the Commonwealth and its residents.',
    moreLink: {
      href: '#',
      text: 'more information',
      info: 'learn more about the Organization',
    },
  }]
};

/**
 * Porting over handlebars template for orgInfo
 * @see https://github.com/massgov/mayflower/blob/dev/styleguide/source/assets/js/templates/orgInfo.html
 */
class OrgInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const org = this.props.org;
    if (!org.value) {
      return false;
    }
    else {
      return (
        <section className="ma__org-info">
          <div className="ma__org-info__header">
            {org.image.src && (
                <div className="ma__org-info__image">
                  <a href={org.image.href}>
                    <img
                        alt={org.image.alt}
                        src={org.image.src}
                        height={org.image.height}
                        width={org.image.width}/>
                  </a>
                </div>
            )}
            <div className="ma__org-info__title">
              <h2 className="ma__org-info__name">
                <span className="ma__decorative-link">
                  <a href={org.name.href}>{org.name.text}&nbsp;
                    <svg aria-hidden="true" id="SvgjsSvg1000" xmlns="http://www.w3.org/2000/svg" version="1.1"
                         width="16" height="18" viewBox="0 0 16 18"><defs id="SvgjsDefs1001"></defs><path
                        id="SvgjsPath1007"
                        d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z "
                        transform="matrix(1,0,0,1,-971,-1881)"></path></svg></a>
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
                    aria-label={org.moreLink.info}>{org.moreLink.text}&nbsp;
                  <svg aria-hidden="true" id="SvgjsSvg1000" xmlns="http://www.w3.org/2000/svg" version="1.1"
                       width="16" height="18" viewBox="0 0 16 18"><defs id="SvgjsDefs1001"></defs><path
                      id="SvgjsPath1007"
                      d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z "
                      transform="matrix(1,0,0,1,-971,-1881)"></path></svg></a>
              </span>
                </div>
            )}
          </div>
        </section>
      )
    }
  }
}

OrgInfo.propTypes = {
  org: PropTypes.string
};

export default OrgSelector;
