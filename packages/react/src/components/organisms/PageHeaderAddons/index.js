/**
 * PageHeader module.
 * @module @massds/mayflower-react/PageHeaderAddons
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-header-addons
 */
import React from 'react';
import PropTypes from 'prop-types';

// import child components
import Paragraph from 'MayflowerReactText/Paragraph';
import PublishState from 'MayflowerReactText/PublishState';

const PageHeaderAddons = (pageHeader) => {
  const {
    optionalContents
  } = pageHeader;

  if (!optionalContents) {
    return null;
  }

  return(
    <section className="ma__page-header-addons">
      <div className="ma__page-header-addons__content">
        { optionalContents && (
          <div className="ma__page-header-addons__optional-content">
            <div className="main-content main-content--two">
              <div className="page-content">
                {
                  /* eslint-disable react/no-array-index-key */
                  optionalContents.map((p, index) => (<Paragraph key={`page-header-optional-content${index}`} {...p.paragraph} />))
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

PageHeaderAddons.propTypes = {
  /** optional array of paragraphs `@atoms/headings/CompHeading` */
  optionalContents: PropTypes.arrayOf(PropTypes.shape(Paragraph.propTypes))
};

export default PageHeaderAddons;
