import React from 'react';
import PropTypes from 'prop-types';

// import child components
import PageHeader from 'MayflowerReactOrganisms/PageHeader';
import PublishState from 'MayflowerReactText/PublishState';

const IllustratedHeader = (illustratedHeader) => {
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

IllustratedHeader.propTypes = {
  /** background image aria label */
  bgInfo: PropTypes.string,
  /** background image url */
  bgImage: PropTypes.string,
  /** invert to change style */
  inverted: PropTypes.bool,
  /** category prefix text rendered in all caps above the page header title */
  category: PropTypes.string,
  /** render PageHeader component @organisms/PageHeader */
  pageHeader: PropTypes.shape(PageHeader.propTypes)
};

export default IllustratedHeader;
