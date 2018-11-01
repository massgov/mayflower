import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const SocialLinks = (socialLinks) => (
  <section className="ma__social-links">
    {socialLinks.label && <span className="ma__social-links__label">{socialLinks.label}</span>}
    <ul className="ma__social-links__items">
      {
        socialLinks.items.map((socialLink, i) => (
          <SocialLink {...socialLink} key={`socialLink_${i}`} index={i} />
        ))
      }
    </ul>
  </section>
);

// Create <svg>s for those types which could possible render
const icons = {
  Facebook:
  <svg
    id="SvgjsSvg1000"
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="20"
    viewBox="0 0 11 20"
  >
    <path
      id="SvgjsPath1007"
      d="M87.162 56.75H84.73880000000001C83.9625 56.75 83.3816 57.065 83.3816 57.8612V59.25H87.162L86.86080000000001 63H83.3816V73H79.60130000000001V63H77.081V59.25H79.60130000000001V56.8463C79.60130000000001 54.318799999999996 80.94210000000001 53 83.9625 53H87.162Z"
      fill="#395999"
      transform="translate(-77 -53)"
    />
  </svg>,
  Instagram:
  <svg
    id="SvgjsSvg1020"
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
  >
    <path
      id="SvgjsPath1022"
      d="M346.878 59.6663C345.022 59.6663 343.518 61.158699999999996 343.518 63C343.518 64.8425 345.022 66.3338 346.878 66.3338C348.735 66.3338 350.239 64.8412 350.239 63C350.239 61.1587 348.73499999999996 59.6663 346.878 59.6663ZM350.952 54.86C349.89 54.8125 349.57 54.8025 346.878 54.8025C344.187 54.8025 343.868 54.8125 342.804 54.861200000000004C340.07 54.9838 338.79699999999997 56.27 338.673 58.96C338.625 60.0137 338.613 60.33 338.613 63C338.613 65.67 338.625 65.9863 338.674 67.0425C338.79699999999997 69.72630000000001 340.066 71.0175 342.806 71.1413C343.86699999999996 71.1887 344.18699999999995 71.1987 346.878 71.1987C349.57099999999997 71.1987 349.89 71.1875 350.954 71.14C353.688 71.0175 354.96000000000004 69.7287 355.086 67.0413C355.134 65.9863 355.144 65.67 355.144 63.00000000000001C355.144 60.330000000000005 355.134 60.01370000000001 355.086 58.96000000000001C354.96000000000004 56.27000000000001 353.684 54.98380000000001 350.952 54.86000000000001ZM346.878 68.135C344.02 68.135 341.702 65.8362 341.702 63.00000000000001C341.702 60.16380000000001 344.019 57.86500000000001 346.878 57.86500000000001C349.736 57.86500000000001 352.055 60.16380000000001 352.055 63.00000000000001C352.055 65.8362 349.738 68.135 346.878 68.135ZM352.259 58.8625C351.591 58.8625 351.04900000000004 58.324999999999996 351.04900000000004 57.662499999999994C351.04900000000004 56.99999999999999 351.591 56.46249999999999 352.259 56.46249999999999C352.927 56.46249999999999 353.469 56.99999999999999 353.469 57.662499999999994C353.469 58.324999999999996 352.928 58.8625 352.259 58.8625ZM356.899 67.1225C356.734 70.7587 354.692 72.77380000000001 351.036 72.94C349.959 72.9888 349.617 73 346.878 73C344.14 73 343.799 72.9888 342.723 72.94C339.058 72.7738 337.027 70.755 336.858 67.1225C336.809 66.05630000000001 336.797 65.7162 336.797 63C336.797 60.285 336.809 59.9438 336.858 58.8762C337.027 55.241299999999995 339.061 53.226299999999995 342.723 53.059999999999995C343.79900000000004 53.0113 344.14 52.99999999999999 346.878 52.99999999999999C349.61699999999996 52.99999999999999 349.959 53.01129999999999 351.036 53.061299999999996C354.7 53.2275 356.734 55.24999999999999 356.899 58.8775C356.948 59.943799999999996 356.959 60.285 356.959 63C356.959 65.7162 356.948 66.0563 356.899 67.1225Z"
      transform="matrix(1,0,0,1,-336,-53)"
    />
  </svg>,
  LinkedIn:
  <svg
    id="SvgjsSvg1011"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <path
      id="SvgjsPath1013"
      d="M182.645 71.75H178.864V58H182.645ZM180.754 56.415C179.53699999999998 56.415 178.54899999999998 55.4275 178.54899999999998 54.21C178.54899999999998 52.9925 179.53699999999998 52.005 180.754 52.005C181.97199999999998 52.005 182.95999999999998 52.9925 182.95999999999998 54.21C182.95999999999998 55.4275 181.97299999999998 56.415 180.754 56.415ZM197.766 63.3012C197.766 56.735 190.706 56.973800000000004 188.945 60.2063V58H185.165V71.75H188.945V64.745C188.945 60.8537 193.986 60.535000000000004 193.986 64.745V71.75H197.766Z"
      fill="#0078b6"
      transform="translate(-178 -52)"
    />
  </svg>,
  Twitter:
  <svg
    id="SvgjsSvg1008"
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="17"
    viewBox="0 0 21 17"
  >
    <path
      id="SvgjsPath1010"
      d="M143.558 59.5463C143.82 65.3175 139.482 71.7525 131.801 71.7525C129.46499999999997 71.7525 127.29099999999998 71.0737 125.46 69.9088C127.65499999999999 70.165 129.845 69.5612 131.584 68.21C129.774 68.1763 128.246 66.99 127.721 65.36C128.37 65.4825 129.007 65.4463 129.588 65.29C127.59899999999999 64.89380000000001 126.226 63.116200000000006 126.27 61.215C126.827 61.5225 127.466 61.7075 128.143 61.7287C126.302 60.5075 125.78 58.095000000000006 126.863 56.25C128.903 58.7325 131.951 60.3663 135.389 60.5375C134.785 57.9713 136.74800000000002 55.5 139.419 55.5C140.608 55.5 141.68300000000002 55.9975 142.43800000000002 56.7962C143.38000000000002 56.6125 144.26600000000002 56.2712 145.06500000000003 55.8012C144.75700000000003 56.76 144.10000000000002 57.5638 143.247 58.0713C144.084 57.9713 144.881 57.751200000000004 145.622 57.425000000000004C145.068 58.245000000000005 144.366 58.9675 143.55800000000002 59.5463Z"
      fill="#16a2f3"
      transform="translate(-125 -55)"
    />
  </svg>,
  YouTube:
  <svg
    id="SvgjsSvg1014"
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="16"
    viewBox="0 0 21 16"
  >
    <path
      id="SvgjsPath1016"
      d="M238.795 59.6663L245.515 62.9938L238.795 66.3338ZM251.396 63C251.37099999999998 57.8463 250.98899999999998 55.875 247.713 55.6537C244.685 55.4488 237.942 55.45 234.91899999999998 55.6537C231.64499999999998 55.875 231.259 57.8375 231.23399999999998 63C231.259 68.1538 231.641 70.125 234.91699999999997 70.3462C237.93999999999997 70.55 244.68299999999996 70.5513 247.71099999999998 70.3462C250.98499999999999 70.125 251.37099999999998 68.1625 251.396 63Z"
      fill="#CC181E"
      transform="translate(-231 -55)"
    />
  </svg>
};

const SocialLink = (socialLink) => (
  <li className="ma__social-links__item">
    <a
      href={socialLink.href}
      className="ma__social-links__link js-social-share"
      data-social-share={socialLink.linkType}
      title={socialLink.altText}
    >
      {icons[socialLink.component]}
    </a>
  </li>
);

SocialLink.propTypes = {
  /** The URL for the link */
  href: PropTypes.string.isRequired,
  /** The type of social link */
  linkType: PropTypes.string.isRequired,
  /** Alt text for accessibility */
  altText: PropTypes.string.isRequired,
  /** The social link icon to use */
  component: PropTypes.oneOf(['Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'Instagram']).isRequired
};

SocialLinks.propTypes = {
  /** The optional label for the social links */
  label: PropTypes.string,
  /** The social links to display */
  items: PropTypes.arrayOf(PropTypes.shape(SocialLink.propTypes)).isRequired
};

SocialLinks.defaultProps = {
  label: ''
};

export default SocialLinks;
