import React from 'react';
import PropTypes from 'prop-types';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import AccordionItem from '../AccordionItem';

class SectionCard extends React.Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.state = {
      width: 1200,
      expanded: false
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  getCardContent = (mobile) => {
    const {
      description, index, title, children, seeAll
    } = this.props;
    return(
      <React.Fragment>
        <nav className={mobile ? 'ma__section-links__toggle-content-mobile' : 'ma__section-links__toggle-content'} aria-labelledby={mobile ? null : `sectionCard${index}`} id={mobile ? null : `sectionCardContent${index}`}>
          { description && <p className="ma__section-links__description">{description}</p>}
          <div className="ma__section-links__mobile-title">
            {
            (title.href && title.href.length > 0) && (
              <div className="ma__section-links__mobile-title">
                <DecorativeLink href={title.href} text="Learn More" info={`learn more about ${title.text}`} />
              </div>
            )
          }
          </div>
          <ul className="ma__section-links__items">
            {
            // eslint-disable-next-line react/prop-types
            children && children.map((child, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="ma__section-links__item" key={`sectionCard${index}.Link${i}`}>{child}</li>
            ))
          }
          </ul>
        </nav>
        {seeAll && (
        <div className="ma__section-links__footer">
          <DecorativeLink href={seeAll.href} text={seeAll.text} />
        </div>
        )}
      </React.Fragment>
    );
  };

  handleClick = (e) => {
    e.preventDefault();
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  updateWindowDimensions() {
    // eslint-disable-next-line no-undef
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { expanded, width } = this.state;
    const { index, title } = this.props;
    const accordionClasses = expanded ? 'is-open' : 'is-closed';
    if (width > 481) {
      return(
        <section className="ma__section-links">
          <div className="ma__section-links__content">
            <h2 className="ma__section-links__title" id={`sectionCard${index}`}>
              {
                (title.href && title.href.length > 0) ? (
                  <DecorativeLink href={title.href} text={title.text} />
                ) : title.text
              }
            </h2>
            {this.getCardContent(false)}
          </div>
        </section>
      );
    }
    return(
      <section className={`ma__section-links ${accordionClasses}`}>
        <AccordionItem title={title.text} emphasize={false} icon={null} id={`sectionCard${index}`}>
          {this.getCardContent(true)}
        </AccordionItem>
      </section>
    );
  }
}

SectionCard.propTypes = {
  // The title of the card, it can be a link or just a heading text.
  // If title is a link (has href), the link will be rendered as a "Learn More" link on mobile below the title and description.
  title: PropTypes.shape({
    // If href is provided, the card title will render as a decorative link. Otherwise it will render as a heading text
    href: PropTypes.string,
    text: PropTypes.string.isRequired
  }),
  // An optional decorative link rendered at the bottom of the card on desktop. This is usually used to link to a landing page for the category.
  seeAll: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string
  }),
  // An optional description of the card rendered below the card title.
  description: PropTypes.string,
  // A unique number index of the card used for setting key and id
  index: PropTypes.number,
  // An array of child components to render as links inside of the card. Currently the options passed into the card from budget homepages are either CalloutLinks or DecorativeLinks.
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SectionCard;
