/**
 * LinkList module.
 * @module @massds/mayflower-react/LinkList
 * @requires module:@massds/mayflower-assets/scss/03-organisms/link-list
 * @requires module:@massds/mayflower-assets/scss/01-atoms/comp-heading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 */
import React from 'react';
import PropTypes from 'prop-types';

// import child components
import CompHeading from 'MayflowerReactHeadings/CompHeading';
import Paragraph from 'MayflowerReactText/Paragraph';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';

const LinkList = (props) => {
  const {
    compHeading, description, stacked, hideBullets, links, more
  } = props;
  const bulletClass = hideBullets ? 'ma__link-list__items--no-bullets' : '';
  const length = links.length;
  const halfLength = Math.ceil(length / 2);
  return(
    <section className="ma__link-list">
      { compHeading && <CompHeading {...compHeading} />}
      { description && <Paragraph {...description} />}
      <div className="ma__link-list__container">
        { (stacked || length < 4) ? (
          <ul className={`ma__link-list__items ${bulletClass}`}>
            { links.map((link, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <li className="ma__link-list__item" key={index}>
                <DecorativeLink {...link} />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul className={`ma__link-list__items ${bulletClass}`}>
              { links.slice(0, halfLength).map((link, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <li className="ma__link-list__item" key={index}>
                  <DecorativeLink {...link} />
                </li>
              ))}
            </ul>
            <ul className={`ma__link-list__items ${bulletClass}`}>
              { links.slice(halfLength, length).map((link, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <li className="ma__link-list__item" key={index + halfLength}>
                  <DecorativeLink {...link} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="ma__link-list__see-all">
        { more && <DecorativeLink {...more} /> }
      </div>
    </section>
  );
};

LinkList.propTypes = {
  /** @atoms/headings/CompHeading */
  compHeading: PropTypes.shape(CompHeading.PropTypes),
  /** short description rendered below the heading, note that this version renders @atoms/text/Paragraph instead of rich text */
  description: PropTypes.shape(Paragraph.PropTypes),
  /** Render links as a stacked list instead of two columns */
  stacked: PropTypes.bool,
  /** Hide bullets for the list of links */
  hideBullets: PropTypes.bool,
  /** List of links rendered */
  links: PropTypes.arrayOf(PropTypes.shape(DecorativeLink.PropTypes)).isRequired,
  /** @atoms/DecorativeLink as see all link */
  more: PropTypes.shape(DecorativeLink.PropTypes)
};

export default LinkList;
