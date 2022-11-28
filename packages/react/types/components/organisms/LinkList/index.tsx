// @ts-nocheck
/**
 * LinkList module.
 * @module @massds/mayflower-react/LinkList
 * @requires module:@massds/mayflower-assets/scss/03-organisms/link-list
 * @requires module:@massds/mayflower-assets/scss/01-atoms/comp-heading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 */
import React from 'react';

// import child components
import CompHeading, { CompHeadingProps } from 'MayflowerReactHeadings/CompHeading';
import Paragraph, { ParagraphProps } from 'MayflowerReactText/Paragraph';
import DecorativeLink, { DecorativeLinkProps } from 'MayflowerReactLinks/DecorativeLink';

export interface LinkListProps {
  /** `@atoms/headings/CompHeading` */
  compHeading?: CompHeadingProps
  /** short description rendered below the heading, note that this version renders `@atoms/text/Paragraph` instead of rich text */
  description?: ParagraphProps
  /** Render links as a stacked list instead of two columns */
  stacked?: boolean
  /** Hide bullets for the list of links */
  hideBullets?: boolean
  /** List of links rendered */
  links: DecorativeLinkProps[]
  /** `@atoms/DecorativeLink` as see all link */
  more?: DecorativeLinkProps
}

const LinkList = (props: LinkListProps) => {
  const {
    compHeading, description, stacked, hideBullets, links, more
  } = props;
  const bulletClass = hideBullets ? 'ma__link-list__items--no-bullets' : '';
  const length = links.length;
  const halfLength = Math.ceil(length / 2);
  return (
    (<section className="ma__link-list">
      { compHeading && <CompHeading {...compHeading} />}
      { description && <Paragraph {...description} />}
      <div className="ma__link-list__container">
        { (stacked || length < 4) ? (
          <ul className={`ma__link-list__items ${bulletClass}`}>
            { links.map((link, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              (<li className="ma__link-list__item" key={index}>
                <DecorativeLink {...link} />
              </li>)
            ))}
          </ul>
        ) : (
          <>
            <ul className={`ma__link-list__items ${bulletClass}`}>
              { links.slice(0, halfLength).map((link, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                (<li className="ma__link-list__item" key={index}>
                  <DecorativeLink {...link} />
                </li>)
              ))}
            </ul>
            <ul className={`ma__link-list__items ${bulletClass}`}>
              { links.slice(halfLength, length).map((link, index) => (
                /* eslint-disable-next-line react/no-array-index-key */
                (<li className="ma__link-list__item" key={index + halfLength}>
                  <DecorativeLink {...link} />
                </li>)
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="ma__link-list__see-all">
        { more && <DecorativeLink {...more} /> }
      </div>
    </section>)
  );
};

export default LinkList;
