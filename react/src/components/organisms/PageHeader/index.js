import React from 'react';
import PropTypes from 'prop-types';

// import child components
import Paragraph from '../../atoms/text/Paragraph';
import PublishState from '../../atoms/text/PublishState';
import './style.css';

import './style.css';

const PageHeader = (pageHeader) => {
  const {
    category, title, subTitle, optionalContents, publishState
  } = pageHeader;
  return(
    <section className="ma__page-header">
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
          <span className="visually-hidden">{ category }&nbsp;</span>
        )}{title}
        </h1>
        { subTitle && (
          <div className="ma__page-header__sub-title">{subTitle}</div>
        )}
        { optionalContents && (
          <div className="ma__page-header__optional-content">
            <div className="main-content main-content--two">
              <div className="page-content">
                { optionalContents.map((p) => (<Paragraph {...p.paragraph} />))
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

PageHeader.propTypes = {
  /** render publish state above category */
  publishState: PropTypes.shape(PublishState.PropTypes),
  /** render category/prefix above title */
  category: PropTypes.string,
  /** Render title text */
  title: PropTypes.string,
  /** Render subTitle text */
  subTitle: PropTypes.string,
  /** optional array of paragraphs @atoms/headings/CompHeading */
  optionalContents: PropTypes.arrayOf(Paragraph.PropTypes)
};

export default PageHeader;
