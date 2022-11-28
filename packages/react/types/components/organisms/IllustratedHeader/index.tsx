// @ts-nocheck
/**
 * IllustratedHeader module.
 * @module @massds/mayflower-react/IllustratedHeader
 * @requires module:@massds/mayflower-assets/scss/03-organisms/illustrated-header
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-header
 * * @requires module:@massds/mayflower-assets/scss/03-organisms/page-header-addons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/publish-state
 */
import React from 'react';

// import child components
import PageHeader, { PageHeaderProps } from 'MayflowerReactOrganisms/PageHeader';
import PageHeaderAddons from 'MayflowerReactOrganisms/PageHeaderAddons';
import PublishState from 'MayflowerReactText/PublishState';

export interface IllustratedHeaderProps {
  /** background image aria label */
  bgInfo?: string
  /** background image url */
  bgImage?: string
  /** invert to change style */
  inverted?: boolean
  /** category prefix text rendered in all caps above the page header title */
  category?: string
  /** render PageHeader component `@organisms/PageHeader` */
  pageHeader?: PageHeaderProps
  children?: React.ReactNode
}

const IllustratedHeader = (illustratedHeader: IllustratedHeaderProps) => {
  const {
    bgInfo, bgImage, inverted, category, pageHeader, publishState, children
  } = illustratedHeader;
  const imageAlt = bgInfo || '';
  const pageHeaderProps = pageHeader;
  const illustratedHeaderClass = inverted ? 'ma__illustrated-header--inverted' : '';
  return(
    <section className={`ma__illustrated-header ${illustratedHeaderClass}`}>
      <div className="ma__illustrated-header__container">
        <div className="ma__illustrated-header__content">
          { publishState && publishState.text && (
            <div className="ma__page-header__publish-state">
              <PublishState {...publishState} />
            </div>
          )}
          <div className="ma__illustrated-header__category" aria-hidden="true">
            {category}
          </div>
          <PageHeader {...pageHeaderProps} />
          <PageHeaderAddons {...pageHeaderProps} />
          {
            // Allows IllustratedHeader to render custom children component (this feature is used in rideshare report and it's not in Mayflower PatternLab)
            children
          }
        </div>
      </div>
      { bgImage ? (
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="ma__illustrated-header__image"
          role="img"
          aria-label={imageAlt}
        />
      ) : (
        <div className="ma__illustrated-header__image ma__illustrated-header__image--empty" />
      )}
    </section>

  );
};

export default IllustratedHeader;
