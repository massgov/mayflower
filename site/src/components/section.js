import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classname';
import './section.scss';

const Section = (props) => {
  const { children, bgColor, ...rest } = props;
  const wrapperClasses = classNames({
    'ma__section-wrapper': true,
    [`ma__section-wrapper--${bgColor}`]: bgColor
  })
  return(
    <section className={wrapperClasses} {...rest} >
      <div className="ma__container">
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  bgColor: PropTypes.oneOf(['primary', 'primar-alt', 'gray'])
};

export default Section;
