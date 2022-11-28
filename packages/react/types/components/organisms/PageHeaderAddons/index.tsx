// @ts-nocheck
/**
 * PageHeader module.
 * @module @massds/mayflower-react/PageHeaderAddons
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-header-addons
 */
import React from 'react';

// import child components
import Paragraph, { ParagraphProps } from 'MayflowerReactText/Paragraph';
import PublishState from 'MayflowerReactText/PublishState';

export interface PageHeaderAddonsProps {
  /** optional array of paragraphs `@atoms/headings/CompHeading` */
  optionalContents?: ParagraphProps[]
}

const PageHeaderAddons = (pageHeader: PageHeaderAddonsProps) => {
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

export default PageHeaderAddons;
