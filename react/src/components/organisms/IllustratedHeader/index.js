import React from 'react';
import PropTypes from 'prop-types';

// import child components
import PageHeader from '../PageHeader';
import PublishState from '../../atoms/text/PublishState';

import './style.css';

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
  /** render PageHeader component @organisms/PageHeader */
  pageHeader: PropTypes.shape(PageHeader.propTypes),
};

IllustratedHeader.defaultProps = {
  categoryAriaHidden: true
};

export default IllustratedHeader;
