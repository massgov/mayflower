/**
 * ContactGroup module.
 * @module @massds/mayflower-react/ContactGroup
 * @requires module:@massds/mayflower-assets/scss/01-atoms/01-atoms/content-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/02-molecules/contact-group
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import IconMarker from 'MayflowerReactBase/Icon/IconMarker';
import IconPhone from 'MayflowerReactBase/Icon/IconPhone';
import IconLaptop from 'MayflowerReactBase/Icon/IconLaptop';
import IconFax from 'MayflowerReactBase/Icon/IconFax';

const ContactGroup = (contactGroup) => {
  const icons = {
    SvgMarker: <IconMarker />, SvgPhone: <IconPhone />, SvgLaptop: <IconLaptop />, SvgFax: <IconFax />
  };
  const Element = `h${contactGroup.level ? contactGroup.level : 2}`;
  const createItems = (item) => {
    switch (item.type) {
      case 'online':
        return(<DecorativeLink {...item.link} />);
      case 'phone':
        return(<a href={`tel:${item.link.href}`} className="ma__content-link ma__content-link--phone">{item.link.text}</a>);
      case 'email':
        return(<a href={`mailto:${item.link.href}`} className="ma__content-link">{item.link.text}</a>);
      case 'address':
        return(
          <>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="ma__contact-group__address" dangerouslySetInnerHTML={{ __html: item.address }} />
            { item.link.href && (
            <div className="ma__contact-group__directions">
              <DecorativeLink {...item.link} />
            </div>
            )}
          </>
        );
      default:
        return(<span className="ma__contact-group__value">{item.link.text}</span>);
    }
  };
  return(
    <div className="ma__contact-group">
      { contactGroup.name && contactGroup.icon && (
        <Element className="ma__contact-group__name">
          {icons[contactGroup.icon]}
          <span>{contactGroup.name}</span>
        </Element>
      )}
      { contactGroup.items && contactGroup.items.map((item, itemIndex) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <React.Fragment key={`contactGroup.item.${itemIndex}`}>
          <div className="ma__contact-group__item">
            { item.label && (
            <span className="ma__contact-group__label">{item.label}</span>
            )}
            {createItems(item)}
          </div>
          { item.details && (
          <p className="ma__contact-group__details">{item.details}</p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

ContactGroup.propTypes = {
  /** icon to pass to the contact group */
  icon: PropTypes.oneOf(['SvgMarker', 'SvgPhone', 'SvgLaptop', 'SvgFax']),
  /** The heading text  */
  text: PropTypes.string,
  /** The name of the contact info */
  name: PropTypes.oneOf(['Phone', 'Online', 'Fax', 'Address']),
  /** The heading level, default is 2 */
  level: PropTypes.number,
  /** A set of contact info items */
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['phone', 'online', 'email', 'address']),
    label: PropTypes.string,
    address: PropTypes.string,
    link: PropTypes.shape(DecorativeLink.props),
    details: PropTypes.string
  }))
};

export default ContactGroup;
