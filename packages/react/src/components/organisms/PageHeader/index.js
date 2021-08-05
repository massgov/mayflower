/**
 * PageHeader module.
 * @module @massds/mayflower-react/PageHeader
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-header
 * @requires module:@massds/mayflower-assets/scss/01-atoms/publish-state
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import child components
import Paragraph from 'MayflowerReactText/Paragraph';
import PublishState from 'MayflowerReactText/PublishState';

const PageHeader = (pageHeader) => {
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
              { category }
&nbsp;
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

PageHeader.propTypes = {
  /** render publish state above category */
  publishState: PropTypes.shape(PublishState.propTypes),
  /** render category/prefix above title */
  category: PropTypes.string,
  /** Render title text */
  title: PropTypes.string,
  /** Render subTitle text */
  subTitle: PropTypes.string,
  /** optional array of paragraphs `@atoms/headings/CompHeading` */
  optionalContents: PropTypes.arrayOf(PropTypes.shape(Paragraph.propTypes))
};

export default PageHeader;
