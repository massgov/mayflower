import React from 'react';
import PropTypes from 'prop-types';
import './section.scss';

const Section = (props) => {
  const { children, ...rest } = props;
  return(
    <section className="ma__section-wrapper" {...rest} >
      <div className="ma__container">
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Section;
