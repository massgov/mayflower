import React from 'react';
import PropTypes from 'prop-types';
import SelectBox from '../../atoms/forms/SelectBox';

class OrgSelector extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render () {

    const options = this.props.organizations.map(function(option) {
      var org = {}
      org['value'] = option.value;
      org['text'] = option.jobTitle;
      return org
    })

    console.log(this.props.organizations)

    return(
      <section className="ma__org-selector js-org-selector">
        <SelectBox options={options} label={this.props.selectBox.label}></SelectBox>
        <div className="ma__org-selector__org-info js-org-info"></div>
        <script>
          
        </script>
      </section>
    );

  };
 
};

OrgSelector.propTypes = {
  selectBox: PropTypes.instanceOf(SelectBox).isRequired,
  organizations: PropTypes.arrayOf(PropTypes.shape({
    value:  PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.shape({ 
      href: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
    })),
    name: PropTypes.arrayOf(PropTypes.shape({ 
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    jobTitle: PropTypes.string.isRequired,
    message:  PropTypes.string.isRequired,
    moreLink: PropTypes.arrayOf(PropTypes.shape({ 
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      info: PropTypes.string,
    })),
  })).isRequired,
};

OrgSelector.defaultProps = {
  selectBox: {label: 'State organization', required: false},
  organizations: [
  { value: 'attorney-general-office',
    image: { href: '#', alt: 'Maura Healey', src: '../../assets/images/placeholder/100x100.png', height: '100', width: '100', },
    name: { href: '#', text: 'Maura Healey', },
    jobTitle: "Attorney General",
    message: 'The Attorney General is the chief lawyer and law enforcement officer of the Commonwealth of Massachusetts. In addition, her office is an advocate and resource for the Commonwealth and its residents.',
    moreLink: { href: '#', text: 'more information', info: 'learn more about the Organization', },
  }, {
    value: 'governors-office',
    image: {href: '#', alt: 'Charles Baker', src: '../../assets/images/placeholder/100x100.png', height: '100', width: '100', },
    name: {href: '#', text: 'Charles Baker', },
    jobTitle: "Governor",
    message: 'The Governor is the chief lawyer and law enforcement officer of the Commonwealth of Massachusetts. In addition, her office is an advocate and resource for the Commonwealth and its residents.',
    moreLink: { href: '#', text: 'more information', info: 'learn more about the Organization', },
  }]
}

export default OrgSelector;
