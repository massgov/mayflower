// @ts-nocheck
/**
 * PageHeader module.
 * @module @massds/mayflower-react/PageHeader
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-header
 * @requires module:@massds/mayflower-assets/scss/01-atoms/publish-state
 */
import React from 'react';
import classNames from 'classnames';

// import child components
import Paragraph, { ParagraphProps } from 'MayflowerReactText/Paragraph';
import PublishState, { PublishStateProps } from 'MayflowerReactText/PublishState';

export interface PageHeaderProps {
  /** render publish state above category */
  publishState?: PublishStateProps
  /** render category/prefix above title */
  category?: string
  /** Render title text */
  title?: string
  /** Render subTitle text */
  subTitle?: string
  /** optional array of paragraphs `@atoms/headings/CompHeading` */
  optionalContents?: ParagraphProps[]
}

const PageHeader = (pageHeader: PageHeaderProps) => {
  const {
    category, title, subTitle, optionalContents, publishState
  } = pageHeader;

  const pageHeaderClasses = classNames('ma__page-header', {
    'ma__page-header--has-optional-content': optionalContents
  });

  return(
    <section className={pageHeaderClasses}>
      <div className="ma__page-header__content">

        { publishState && (
          <div className="ma__page-header__publish-state">
            <PublishState {...publishState} />
          </div>
        )}
        { category && (
          <div className="ma__page-header__category">
            { category }
          </div>
        )}
        <h1 className="ma__page-header__title">
          { category && (
            <span className="visually-hidden">
              <span>{ category }</span>
              <span>&nbsp;</span>
            </span>
          )}
          {title}
        </h1>
        { subTitle && (
          <div className="ma__page-header__sub-title">{subTitle}</div>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
