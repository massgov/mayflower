import React from 'react';
import Icon from '../../atoms/icons/Icon'
import SiteLogo from '../../atoms/media/SiteLogo';

import './style.css';

export default () => (
  <footer className="ma__footer_slim" id="footer">
    <div className="ma__footer_slim--container ma__container">
      <SiteLogo />
      <div className="ma__footer_slim--container-inner">
        <section className="ma__footer_slim--info">
          <h3>Massachusetts Executive Office of Eductation (EDU)</h3>
          <p>
            The Department of Early Education and Care&apos;s mission is to
            support the healthy growth and development of all children by
            providing high quality programs and resources for families
          </p>
          <p className="ma__footer_slim--copyright">
            &copy; 2018 Commonwealth of Massachusetts
          </p>
        </section>
        <section className="ma__footer_slim--details">
          <div className="ma__footer_slim--links">
            <a href="#">Lead Agencies Policies</a>
            <a href="#">Child Care Licensing Procedures</a>
          </div>
          <div className="ma__footer_slim--contact">
            <p>
              <Icon name="marker" svgWidth={20} svgHeight={20} />
              <span>51 Sleeper St. 4th Floor, Boston, MA 02210</span>
            </p>
            <p>
              <Icon name="phone" svgWidth={20} svgHeight={20} />
              <span>(617) 988-6600</span>
            </p>
            <p>
              <Icon name="laptop" svgWidth={20} svgHeight={20} />
              <a href="#">EEC Official Website</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </footer>
);
