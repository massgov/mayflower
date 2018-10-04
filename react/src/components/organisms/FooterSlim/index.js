import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Icon from '../../atoms/icons/Icon'
import SiteLogo from '../../atoms/media/SiteLogo';

import './style.css';


const FooterSlim = (props) => {
  const year = '';
  return (
  <footer className="ma__footer_slim" id="footer">
    <div className="ma__footer_slim--container ma__container">
      <SiteLogo />
      <div className="ma__footer_slim--container-inner">
        <section className="ma__footer_slim--info">
          <h3>{ props.FooterSlimTitle }</h3>
          <p>{ props.FooterSlimDescription }</p>
          <p className="ma__footer_slim--copyright">
            &copy; {moment().year()} Commonwealth of Massachusetts
          </p>
        </section>
        <section className="ma__footer_slim--details">
          <div className="ma__footer_slim--links">
            {/* todo: */}
            <a href="#">Lead Agencies Policies</a>
            <a href="#">Child Care Licensing Procedures</a>
          </div>
          <div className="ma__footer_slim--contact">
            {props.FooterSlimAddress ? (<p><Icon name="marker" svgWidth={20} svgHeight={20} /><span>props.FooterSlimAddress}</span></p>) : ''}
            {props.FooterSlimPhone ? (<p><Icon name="phone" svgWidth={20} svgHeight={20} /><span>{props.FooterSlimPhone}</span></p>) : ''}
            <p>
              <Icon name="laptop" svgWidth={20} svgHeight={20} />
              <a href={props.FooterSlimLink.href}>{props.FooterSlimLink.title}</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </footer>
)};

FooterSlim.propTypes = {
  FooterSlimTitle: PropTypes.text,
  FooterSlimDescription: PropTypes.text,
  FooterSlimAddress: PropTypes.text,
  FooterSlimPhone: PropTypes.text,
  FooterSlimLink: PropTypes.shape({
    href: PropTypes.text,
    title: PropTypes.title
  })
};

export default FooterSlim;
