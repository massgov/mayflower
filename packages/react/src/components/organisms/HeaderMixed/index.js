import React from 'react';
// eslint-disable-next-line import/no-unresolved
import GoogleTranslateElement from 'MayflowerReactButtons/GoogleTranslateElement';

const HeaderMixed = () => {
  return(
    <header className="ma__header__hamburger ma__header__mixed" id="header">

      <a className="ma__header__hamburger__skip-nav" href="#main-content">skip to main content</a>

      <nav className="ma__header__hamburger__nav" aria-label="main navigation" id="main-navigation" role="navigation">
        <div className="ma__header__hamburger-wrapper">
          <div className="ma__header__hamburger__button-container js-sticky-header">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Open the main menu for mass.gov"
              className="ma__header__hamburger__menu-button js-header-menu-button"
            >
              <span className="ma__header__hamburger__menu-icon" />
              <span className="ma__header__hamburger__menu-text js-header__menu-text" />
            </button>
            <button
              type="button"
              aria-expanded="false"
              className="ma__header__hamburger__search-access-button js-header-search-access-button"
            >
              <span className="ma__visually-hidden">Access to search</span>
              <svg aria-hidden="true" focusable="false"><use xlinkHref="#ca4a8fa24c4f86ebb9d78a0f427445d0.10" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 20" id="ca4a8fa24c4f86ebb9d78a0f427445d0.10"><path d="M1424.99 107.4L1419.66 102.105C1420.44 100.884 1420.89 99.4383 1420.89 97.8892C1420.89 93.54 1417.3300000000002 90 1412.95 90C1408.57 90 1405.01 93.54 1405.01 97.89C1405.01 102.241 1408.57 105.781 1412.95 105.781C1414.43 105.781 1415.82 105.375 1417.01 104.67L1422.3799999999999 110ZM1407.97 97.89C1407.97 95.1625 1410.2 92.9416 1412.95 92.9416C1415.7 92.9416 1417.93 95.1617 1417.93 97.89C1417.93 100.619 1415.7 102.839 1412.95 102.839C1410.2 102.839 1407.97 100.619 1407.97 97.89Z " transform="matrix(1,0,0,1,-1405,-90)" /></symbol></svg>
            </button>
          </div>
          <div className="ma__header__hamburger__utility-nav ma__header__hamburger__utility-nav--wide js-utility-nav--wide">
            <div className="ma__utility-nav js-util-nav">
              <ul className="ma__utility-nav__items">
                <li className="ma__utility-nav__item">
                  <div className="ma__utility-nav__translate">
                    <GoogleTranslateElement id="google_translate_element_hamburger" />
                  </div>
                </li>
                <li className="ma__utility-nav__item">
                  <a className="ma__utility-nav__link direct-link" href="#">
                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#0845ffd9a67b31548e01e178c0565b35.2" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 16 16" id="0845ffd9a67b31548e01e178c0565b35.2"><path d="M1169.73 14.5924L1169.73 13L1168.27 13L1168.27 14.5924C1166.21 14.9558 1164.6399999999999 16.8309 1164.6399999999999 19.0952L1173.36 19.0952C1173.36 16.8309 1171.79 14.955799999999998 1169.7299999999998 14.592399999999998ZM1176.27 24.4286L1174.09 24.4286L1174.09 21.381C1174.09 20.9604 1173.77 20.619 1173.36 20.619L1164.6399999999999 20.619C1164.2299999999998 20.619 1163.9099999999999 20.9604 1163.9099999999999 21.381L1163.9099999999999 24.4286L1161.7299999999998 24.4286C1161.3299999999997 24.4286 1160.9999999999998 24.7699 1160.9999999999998 25.1905L1160.9999999999998 28.2381C1160.9999999999998 28.659399999999998 1161.3299999999997 29 1161.7299999999998 29L1176.2699999999998 29C1176.6699999999998 29 1176.9999999999998 28.6594 1176.9999999999998 28.2381L1176.9999999999998 25.1905C1176.9999999999998 24.7699 1176.6699999999998 24.4286 1176.2699999999998 24.4286ZM1163.91 27.4762L1162.45 27.4762L1162.45 25.952399999999997L1163.91 25.952399999999997ZM1166.82 27.4762L1165.36 27.4762L1165.36 25.952399999999997L1166.82 25.952399999999997ZM1166.82 23.6667L1165.36 23.6667L1165.36 22.142899999999997L1166.82 22.142899999999997ZM1169.73 27.4762L1168.27 27.4762L1168.27 25.952399999999997L1169.73 25.952399999999997ZM1169.73 23.6667L1168.27 23.6667L1168.27 22.142899999999997L1169.73 22.142899999999997ZM1172.64 27.4762L1171.18 27.4762L1171.18 25.952399999999997L1172.64 25.952399999999997ZM1172.64 23.6667L1171.18 23.6667L1171.18 22.142899999999997L1172.64 22.142899999999997ZM1175.55 27.4762L1174.09 27.4762L1174.09 25.952399999999997L1175.55 25.952399999999997Z " transform="matrix(1,0,0,1,-1161,-13)" /></symbol></svg>
                    <span>State Organizations</span>
                  </a>
                </li>
                <li className="ma__utility-nav__item">
                  <button
                    type="button"
                    className="ma__utility-nav__link js-util-nav-toggle"
                    aria-haspopup="true"
                    aria-label="Log in links for this page"
                    aria-expanded="false"
                  >
                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.4" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.4"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
                    <span>
                      Log in to...
                    </span>
                    <span className="toggle-indicator" aria-hidden="true" />
                  </button>
                  <div aria-hidden="true" className="ma__utility-nav__content js-util-nav-content is-closed">
                    <div className="ma__utility-nav__container">
                      <div className="ma__utility-nav__content-title">
                        <button type="button" className="ma__utility-nav__close js-close-util-nav">
                          <span>Close</span>
                          <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
                        </button>
                        <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.5" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.5"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
                        <h2>Log in to...</h2>
                      </div>
                      <div className="ma__utility-nav__content-body">

                        <div className="ma__utility-panel">
                          <div className="ma__utility-panel__description ma__utility-panel__description--full">

                            <div className="ma__rich-text ">
                              <p>Login links for this page</p>
                            </div>
                          </div>

                          <ul className="ma__utility-panel__items">
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="#"
                                  className="js-clickable-link"
                                >
                                  Contextual Login 1&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.412" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.412"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href=""
                                  className="js-clickable-link"
                                >
                                  Contextual Login 2&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.413" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.413"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="ma__utility-panel">
                          <div className="ma__utility-panel__description ma__utility-panel__description--full">

                            <div className="ma__rich-text ">
                              <p>These are the top requested sites you can log in to access state provided services</p>
                            </div>
                          </div>

                          <ul className="ma__utility-panel__items">
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://uionline.detma.org/Claimant/Core/Login.ASPX"
                                  className="js-clickable-link"
                                >
                                  Unemployment Online&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.414" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.414"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2"
                                  className="js-clickable-link"
                                >
                                  Virtual Gateway (SNAP)&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.415" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.415"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://ecse.cse.state.ma.us/ECSE/Login/login.asp"
                                  className="js-clickable-link"
                                >
                                  Child Support Enforcement&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.416" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.416"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://mtc.dor.state.ma.us/mtc/_/"
                                  className="js-clickable-link"
                                >
                                  MassTaxConnect&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.417" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.417"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://atlas-myrmv.massdot.state.ma.us/myrmv/"
                                  className="js-clickable-link"
                                >
                                  myRmv&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.418" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.418"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://www.mahealthconnector.org/"
                                  className="js-clickable-link"
                                >
                                  Massachusetts Health Connector&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.419" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.419"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://juryduty.majury.gov/ojcweb/public/start.aspx"
                                  className="js-clickable-link"
                                >
                                  Massachusetts Juror Service Website&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.420" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.420"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://massanf.taleo.net/careersection/ex/jobsearch.ftl"
                                  className="js-clickable-link"
                                >
                                  Find a Commonwealth Job&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.421" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.421"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="ma__header__hamburger__nav-container" aria-hidden="true">
            <div className="ma__header__hamburger__logo ma__header__hamburger__logo--mobile">
              <div className="ma__site-logo">
                <a href="/" title="Mass.gov home page">
                  <img src="../../assets/images/logo/stateseal.png" alt="" width="45" height="45" />
                  <span>Mass.gov</span>
                </a>
              </div>
            </div>
            <div className="ma__header__nav-search js-header__nav-search">
              <div className="ma__header-search">
                <form action="#" className="ma__form js-header-search-form" role="search">
                  <label
                    htmlFor="nav-search"
                    className="ma__header-search__label"
                  >
                    Search terms
                  </label>
                  <input
                    id="nav-search"
                    className="ma__header-search__input"
                    placeholder="Search Mass.gov"
                    type="search"
                    inputMode="search"
                  />
                  <button type="submit" className="ma__button-search--secondary">
                    <span className="ma__button-search__label">Search</span>
                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#ca4a8fa24c4f86ebb9d78a0f427445d0.11" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 20" id="ca4a8fa24c4f86ebb9d78a0f427445d0.11"><path d="M1424.99 107.4L1419.66 102.105C1420.44 100.884 1420.89 99.4383 1420.89 97.8892C1420.89 93.54 1417.3300000000002 90 1412.95 90C1408.57 90 1405.01 93.54 1405.01 97.89C1405.01 102.241 1408.57 105.781 1412.95 105.781C1414.43 105.781 1415.82 105.375 1417.01 104.67L1422.3799999999999 110ZM1407.97 97.89C1407.97 95.1625 1410.2 92.9416 1412.95 92.9416C1415.7 92.9416 1417.93 95.1617 1417.93 97.89C1417.93 100.619 1415.7 102.839 1412.95 102.839C1410.2 102.839 1407.97 100.619 1407.97 97.89Z " transform="matrix(1,0,0,1,-1405,-90)" /></symbol></svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="ma__header__hamburger__main-nav">
              <div className="ma__main__hamburger-nav">
                <ul role="menubar" className="ma__main__hamburger-nav__items js-main-nav-hamburger">
                  <li role="none" className="ma__main__hamburger-nav__item  has-subnav js-main-nav-hamburger-toggle">
                    <button type="button" role="menuitem" id="button1" className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded="false" aria-haspopup="true">
                      <span className="visually-hidden show-label">Show the sub topics of </span>
                      Living
                      <span className="toggle-indicator" aria-hidden="true" />
                    </button>
                    <div className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
                      <ul id="menu1" role="menu" aria-labelledby="button1" className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Health & Social Services</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Family & Children</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Housing</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Transportation</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Legal & Justice</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Public Safety</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Voting</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Taxes</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="js-main-nav-hamburger__link ma__main__hamburger-nav__link">
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.15" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.15"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                            <span>
                              <span className="visually-hidden">See all topics under </span>
                              Living
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li role="none" className="ma__main__hamburger-nav__item  has-subnav js-main-nav-hamburger-toggle">
                    <button type="button" role="menuitem" id="button2" className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded="false" aria-haspopup="true">
                      <span className="visually-hidden show-label">Show the sub topics of </span>
                      Working
                      <span className="toggle-indicator" aria-hidden="true" />
                    </button>
                    <div className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
                      <ul id="menu2" role="menu" aria-labelledby="button2" className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Unemployment</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Finding a Job</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Worker’s Rights & Safety</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Business Services & Resources</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Professional Licensing & Certification</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Professional Training</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="js-main-nav-hamburger__link ma__main__hamburger-nav__link">
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.16" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.16"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                            <span>
                              <span className="visually-hidden">See all topics under </span>
                              Working
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li role="none" className="ma__main__hamburger-nav__item  has-subnav js-main-nav-hamburger-toggle">
                    <button type="button" role="menuitem" id="button3" className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded="false" aria-haspopup="true">
                      <span className="visually-hidden show-label">Show the sub topics of </span>
                      Learning
                      <span className="toggle-indicator" aria-hidden="true" />
                    </button>
                    <div className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
                      <ul id="menu3" role="menu" aria-labelledby="button3" className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Early Childhood Education</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">K-12 Schools</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Higher Education</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Continuing Education</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="js-main-nav-hamburger__link ma__main__hamburger-nav__link">
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.17" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.17"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                            <span>
                              <span className="visually-hidden">See all topics under </span>
                              Learning
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li role="none" className="ma__main__hamburger-nav__item is-active has-subnav js-main-nav-hamburger-toggle">
                    <button type="button" role="menuitem" id="button4" className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded="false" aria-haspopup="true">
                      <span className="visually-hidden show-label">Show the sub topics of </span>
                      Visiting & Exploring
                      <span className="toggle-indicator" aria-hidden="true" />
                    </button>
                    <div className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
                      <ul id="menu4" role="menu" aria-labelledby="button4" className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Recreational Licenses & Permits</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="/patterns/05-pages-topic/05-pages-topic.html" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">State Parks & Recreation</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Travel & Tourism</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Arts & Culture</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="/patterns/05-pages-section-landing/05-pages-section-landing.html" className="js-main-nav-hamburger__link ma__main__hamburger-nav__link">
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.18" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.18"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                            <span>
                              <span className="visually-hidden">See all topics under </span>
                              Visiting & Exploring
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li role="none" className="ma__main__hamburger-nav__item  has-subnav js-main-nav-hamburger-toggle">
                    <button type="button" role="menuitem" id="button5" className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded="false" aria-haspopup="true">
                      <span className="visually-hidden show-label">Show the sub topics of </span>
                      Your Government
                      <span className="toggle-indicator" aria-hidden="true" />
                    </button>
                    <div className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
                      <ul id="menu5" role="menu" aria-labelledby="button5" className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Office of the Governor</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">State Agencies</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="/patterns/05-pages-topic-your-government/05-pages-topic-your-government.html" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Executive Branch</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Judicial Branch</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Legislative Branch</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">Local Government</a>
                        </li>
                        <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                          <a role="menuitem" href="#" className="js-main-nav-hamburger__link ma__main__hamburger-nav__link">
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.19" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.19"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                            <span>
                              <span className="visually-hidden">See all topics under </span>
                              Your Government
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li role="none" className="ma__main__hamburger-nav__item  js-main-nav-hamburger-top-link">
                    <a role="menuitem" href="#covid-19-sample-url" className="ma__main__hamburger-nav__top-link cv-alternate-style">Covid 19</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="ma__header__hamburger__utility-nav ma__header__hamburger__utility-nav--narrow js-utility-nav--narrow">
              <div className="ma__utility-nav js-util-nav">
                <ul className="ma__utility-nav__items">
                  <li className="ma__utility-nav__item">
                    <div className="ma__utility-nav__translate">
                      <div id="google_translate_element" />
                      <div className="ma__utility-nav__translate-icon">
                        <svg aria-hidden="true" focusable="false"><use xlinkHref="#45cc01d390b2119ca5cf3e30539a07e0.3" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 24 24" id="45cc01d390b2119ca5cf3e30539a07e0.3"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" /></symbol></svg>
                      </div>
                    </div>
                  </li>
                  <li className="ma__utility-nav__item">
                    <a className="ma__utility-nav__link direct-link" href="#">
                      <svg aria-hidden="true" focusable="false"><use xlinkHref="#0845ffd9a67b31548e01e178c0565b35.3" /></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 16 16" id="0845ffd9a67b31548e01e178c0565b35.3"><path d="M1169.73 14.5924L1169.73 13L1168.27 13L1168.27 14.5924C1166.21 14.9558 1164.6399999999999 16.8309 1164.6399999999999 19.0952L1173.36 19.0952C1173.36 16.8309 1171.79 14.955799999999998 1169.7299999999998 14.592399999999998ZM1176.27 24.4286L1174.09 24.4286L1174.09 21.381C1174.09 20.9604 1173.77 20.619 1173.36 20.619L1164.6399999999999 20.619C1164.2299999999998 20.619 1163.9099999999999 20.9604 1163.9099999999999 21.381L1163.9099999999999 24.4286L1161.7299999999998 24.4286C1161.3299999999997 24.4286 1160.9999999999998 24.7699 1160.9999999999998 25.1905L1160.9999999999998 28.2381C1160.9999999999998 28.659399999999998 1161.3299999999997 29 1161.7299999999998 29L1176.2699999999998 29C1176.6699999999998 29 1176.9999999999998 28.6594 1176.9999999999998 28.2381L1176.9999999999998 25.1905C1176.9999999999998 24.7699 1176.6699999999998 24.4286 1176.2699999999998 24.4286ZM1163.91 27.4762L1162.45 27.4762L1162.45 25.952399999999997L1163.91 25.952399999999997ZM1166.82 27.4762L1165.36 27.4762L1165.36 25.952399999999997L1166.82 25.952399999999997ZM1166.82 23.6667L1165.36 23.6667L1165.36 22.142899999999997L1166.82 22.142899999999997ZM1169.73 27.4762L1168.27 27.4762L1168.27 25.952399999999997L1169.73 25.952399999999997ZM1169.73 23.6667L1168.27 23.6667L1168.27 22.142899999999997L1169.73 22.142899999999997ZM1172.64 27.4762L1171.18 27.4762L1171.18 25.952399999999997L1172.64 25.952399999999997ZM1172.64 23.6667L1171.18 23.6667L1171.18 22.142899999999997L1172.64 22.142899999999997ZM1175.55 27.4762L1174.09 27.4762L1174.09 25.952399999999997L1175.55 25.952399999999997Z " transform="matrix(1,0,0,1,-1161,-13)" /></symbol></svg>
                      <span>State Organizations</span>
                    </a>
                  </li>
                  <li className="ma__utility-nav__item">
                    <button
                      type="button"
                      className="ma__utility-nav__link js-util-nav-toggle"
                      aria-haspopup="true"
                      aria-label="Log in links for this page"
                      aria-expanded="false"
                    >
                      <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.6" /></svg>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.6"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
                      <span>
                        Log in to...
                      </span>
                      <span className="toggle-indicator" aria-hidden="true" />
                    </button>
                    <div aria-hidden="true" className="ma__utility-nav__content js-util-nav-content is-closed">
                      <div className="ma__utility-nav__container">
                        <div className="ma__utility-nav__content-title">
                          <button type="button" className="ma__utility-nav__close js-close-util-nav">
                            <span>Close</span>
                            <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
                          </button>
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.7" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.7"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
                          <h2>Log in to...</h2>
                        </div>
                        <div className="ma__utility-nav__content-body">

                          <div className="ma__utility-panel">
                            <div className="ma__utility-panel__description ma__utility-panel__description--full">

                              <div className="ma__rich-text ">
                                <p>Login links for this page</p>
                              </div>
                            </div>

                            <ul className="ma__utility-panel__items">
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="#"
                                    className="js-clickable-link"
                                  >
                                    Contextual Login 1&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.422" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.422"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href=""
                                    className="js-clickable-link"
                                  >
                                    Contextual Login 2&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.423" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.423"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="ma__utility-panel">
                            <div className="ma__utility-panel__description ma__utility-panel__description--full">

                              <div className="ma__rich-text ">
                                <p>These are the top requested sites you can log in to access state provided services</p>
                              </div>
                            </div>

                            <ul className="ma__utility-panel__items">
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://uionline.detma.org/Claimant/Core/Login.ASPX"
                                    className="js-clickable-link"
                                  >
                                    Unemployment Online&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.424" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.424"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2"
                                    className="js-clickable-link"
                                  >
                                    Virtual Gateway (SNAP)&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.425" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.425"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://ecse.cse.state.ma.us/ECSE/Login/login.asp"
                                    className="js-clickable-link"
                                  >
                                    Child Support Enforcement&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.426" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.426"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://mtc.dor.state.ma.us/mtc/_/"
                                    className="js-clickable-link"
                                  >
                                    MassTaxConnect&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.427" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.427"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://atlas-myrmv.massdot.state.ma.us/myrmv/"
                                    className="js-clickable-link"
                                  >
                                    myRmv&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.428" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.428"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://www.mahealthconnector.org/"
                                    className="js-clickable-link"
                                  >
                                    Massachusetts Health Connector&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.429" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.429"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://juryduty.majury.gov/ojcweb/public/start.aspx"
                                    className="js-clickable-link"
                                  >
                                    Massachusetts Juror Service Website&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.430" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.430"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                              <li className="ma__utility-panel__item js-clickable">
                                <span className="ma__decorative-link">
                                  <a
                                    href="https://massanf.taleo.net/careersection/ex/jobsearch.ftl"
                                    className="js-clickable-link"
                                  >
                                    Find a Commonwealth Job&nbsp;
                                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.431" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.431"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                  </a>
                                </span>
                              </li>
                            </ul>
                          </div>

                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </nav>

      <div className="ma__header__container">
        <div className="ma__header__hamburger__logo" tabIndex="-1">
          <div className="ma__site-logo">
            <a href="/" title="Mass.gov home page">
              <img src="../../assets/images/logo/stateseal.png" alt="" width="45" height="45" />
              <span>Mass.gov</span>
            </a>
          </div>
        </div>
        <div className="ma__header__hamburger__search ma__header__hamburger__search-bar js-header-search-menu">
          <div className="ma__header-search">
            <form action="#" className="ma__form js-header-search-form" role="search">
              <label
                htmlFor="nav-search"
                className="ma__header-search__label"
              >
                Search terms
              </label>
              <input
                id="nav-search"
                className="ma__header-search__input"
                placeholder="Search Mass.gov"
                type="search"
                inputMode="search"
              />
              <button type="submit" className="ma__button-search--secondary">
                <span className="ma__button-search__label">Search</span>
                <svg aria-hidden="true" focusable="false"><use xlinkHref="#ca4a8fa24c4f86ebb9d78a0f427445d0.12" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 20" id="ca4a8fa24c4f86ebb9d78a0f427445d0.12"><path d="M1424.99 107.4L1419.66 102.105C1420.44 100.884 1420.89 99.4383 1420.89 97.8892C1420.89 93.54 1417.3300000000002 90 1412.95 90C1408.57 90 1405.01 93.54 1405.01 97.89C1405.01 102.241 1408.57 105.781 1412.95 105.781C1414.43 105.781 1415.82 105.375 1417.01 104.67L1422.3799999999999 110ZM1407.97 97.89C1407.97 95.1625 1410.2 92.9416 1412.95 92.9416C1415.7 92.9416 1417.93 95.1617 1417.93 97.89C1417.93 100.619 1415.7 102.839 1412.95 102.839C1410.2 102.839 1407.97 100.619 1407.97 97.89Z " transform="matrix(1,0,0,1,-1405,-90)" /></symbol></svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <nav className="ma__header__nav" aria-label="main navigation" id="main-navigation" role="navigation">
        <div className="ma__header__nav-container">
          <div className="ma__header__main-nav">
            <div className="ma__main-nav">
              <ul role="menubar" className="ma__main-nav__items js-main-nav">
                <li role="none" className="ma__main-nav__item  has-subnav js-main-nav-toggle" tabIndex="-1">
                  <button type="button" role="menuitem" id="button1" className="ma__main-nav__top-link" aria-haspopup="true" aria-expanded="false" tabIndex="0">
                    <span className="visually-hidden show-label">Show the sub topics of </span>
                    Living
                  </button>
                  <div className="ma__main-nav__subitems js-main-nav-content is-closed">
                    <ul id="menu1" role="menu" aria-labelledby="button1" className="ma__main-nav__container">
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Living</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Health & Social Services</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Family & Children</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Housing</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Transportation</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Legal & Justice</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Public Safety</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Voting</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Taxes</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.20" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.20"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                          <span>
                            <span className="visually-hidden">See all topics under </span>
                            Living
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li role="none" className="ma__main-nav__item  has-subnav js-main-nav-toggle" tabIndex="-1">
                  <button type="button" role="menuitem" id="button2" className="ma__main-nav__top-link" aria-haspopup="true" aria-expanded="false" tabIndex="0">
                    <span className="visually-hidden show-label">Show the sub topics of </span>
                    Working
                  </button>
                  <div className="ma__main-nav__subitems js-main-nav-content is-closed">
                    <ul id="menu2" role="menu" aria-labelledby="button2" className="ma__main-nav__container">
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Working</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Unemployment</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Finding a Job</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Worker’s Rights & Safety</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Business Services & Resources</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Professional Licensing & Certification</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Professional Training</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.21" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.21"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                          <span>
                            <span className="visually-hidden">See all topics under </span>
                            Working
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li role="none" className="ma__main-nav__item  has-subnav js-main-nav-toggle" tabIndex="-1">
                  <button type="button" role="menuitem" id="button3" className="ma__main-nav__top-link" aria-haspopup="true" aria-expanded="false" tabIndex="0">
                    <span className="visually-hidden show-label">Show the sub topics of </span>
                    Learning
                  </button>
                  <div className="ma__main-nav__subitems js-main-nav-content is-closed">
                    <ul id="menu3" role="menu" aria-labelledby="button3" className="ma__main-nav__container">
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Learning</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Early Childhood Education</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">K-12 Schools</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Higher Education</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Continuing Education</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.22" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.22"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                          <span>
                            <span className="visually-hidden">See all topics under </span>
                            Learning
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li role="none" className="ma__main-nav__item is-active has-subnav js-main-nav-toggle" tabIndex="-1">
                  <button type="button" role="menuitem" id="button4" className="ma__main-nav__top-link" aria-haspopup="true" aria-expanded="false" tabIndex="0">
                    <span className="visually-hidden show-label">Show the sub topics of </span>
                    Visiting & Exploring
                  </button>
                  <div className="ma__main-nav__subitems js-main-nav-content is-closed">
                    <ul id="menu4" role="menu" aria-labelledby="button4" className="ma__main-nav__container">
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="/patterns/05-pages-section-landing/05-pages-section-landing.html" className="ma__main-nav__link">Visiting & Exploring</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Recreational Licenses & Permits</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="/patterns/05-pages-topic/05-pages-topic.html" className="ma__main-nav__link">State Parks & Recreation</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Travel & Tourism</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Arts & Culture</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="/patterns/05-pages-section-landing/05-pages-section-landing.html" className="ma__main-nav__link">
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.23" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.23"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                          <span>
                            <span className="visually-hidden">See all topics under </span>
                            Visiting & Exploring
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li role="none" className="ma__main-nav__item  has-subnav js-main-nav-toggle" tabIndex="-1">
                  <button type="button" role="menuitem" id="button5" className="ma__main-nav__top-link" aria-haspopup="true" aria-expanded="false" tabIndex="0">
                    <span className="visually-hidden show-label">Show the sub topics of </span>
                    Your Government
                  </button>
                  <div className="ma__main-nav__subitems js-main-nav-content is-closed">
                    <ul id="menu5" role="menu" aria-labelledby="button5" className="ma__main-nav__container">
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Your Government</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Office of the Governor</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">State Agencies</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="/patterns/05-pages-topic-your-government/05-pages-topic-your-government.html" className="ma__main-nav__link">Executive Branch</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Judicial Branch</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Legislative Branch</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">Local Government</a>
                      </li>
                      <li role="none" className="ma__main-nav__subitem">
                        <a role="menuitem" href="#" className="ma__main-nav__link">
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#2e82b21e6e4d140bf9763390821f21c5.24" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 21" id="2e82b21e6e4d140bf9763390821f21c5.24"><path d="M135.721 597.277V597.277L138.423 600V600V600L135.721 602.724V602.724L130.318 608.1690000000001L127.61700000000002 605.4470000000001L131.115 601.9190000000001H121.44300000000001V598.0680000000001H131.103L127.61600000000001 594.5530000000001L130.318 591.8300000000002ZM122.882 588.322V601.994H119.105V588.3340000000001Z " fillOpacity="1" transform="matrix(1,0,0,1,-119,-588)" /></symbol></svg>
                          <span>
                            <span className="visually-hidden">See all topics under </span>
                            Your Government
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li role="none" className="ma__main-nav__item  js-main-nav-top-link" tabIndex="-1">
                  <a role="menuitem" href="#covid-19-sample-url" className="ma__main-nav__top-link cv-alternate-style" tabIndex="0">Covid 19</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="ma__header__utility-nav ma__header__utility-nav--narrow">
            <div className="ma__utility-nav js-util-nav">
              <ul className="ma__utility-nav__items">
                <li className="ma__utility-nav__item">
                  <div className="ma__utility-nav__translate">
                    <GoogleTranslateElement />
                  </div>
                </li>
                <li className="ma__utility-nav__item">
                  <a className="ma__utility-nav__link direct-link" href="#">
                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#0845ffd9a67b31548e01e178c0565b35.4" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 16 16" id="0845ffd9a67b31548e01e178c0565b35.4"><path d="M1169.73 14.5924L1169.73 13L1168.27 13L1168.27 14.5924C1166.21 14.9558 1164.6399999999999 16.8309 1164.6399999999999 19.0952L1173.36 19.0952C1173.36 16.8309 1171.79 14.955799999999998 1169.7299999999998 14.592399999999998ZM1176.27 24.4286L1174.09 24.4286L1174.09 21.381C1174.09 20.9604 1173.77 20.619 1173.36 20.619L1164.6399999999999 20.619C1164.2299999999998 20.619 1163.9099999999999 20.9604 1163.9099999999999 21.381L1163.9099999999999 24.4286L1161.7299999999998 24.4286C1161.3299999999997 24.4286 1160.9999999999998 24.7699 1160.9999999999998 25.1905L1160.9999999999998 28.2381C1160.9999999999998 28.659399999999998 1161.3299999999997 29 1161.7299999999998 29L1176.2699999999998 29C1176.6699999999998 29 1176.9999999999998 28.6594 1176.9999999999998 28.2381L1176.9999999999998 25.1905C1176.9999999999998 24.7699 1176.6699999999998 24.4286 1176.2699999999998 24.4286ZM1163.91 27.4762L1162.45 27.4762L1162.45 25.952399999999997L1163.91 25.952399999999997ZM1166.82 27.4762L1165.36 27.4762L1165.36 25.952399999999997L1166.82 25.952399999999997ZM1166.82 23.6667L1165.36 23.6667L1165.36 22.142899999999997L1166.82 22.142899999999997ZM1169.73 27.4762L1168.27 27.4762L1168.27 25.952399999999997L1169.73 25.952399999999997ZM1169.73 23.6667L1168.27 23.6667L1168.27 22.142899999999997L1169.73 22.142899999999997ZM1172.64 27.4762L1171.18 27.4762L1171.18 25.952399999999997L1172.64 25.952399999999997ZM1172.64 23.6667L1171.18 23.6667L1171.18 22.142899999999997L1172.64 22.142899999999997ZM1175.55 27.4762L1174.09 27.4762L1174.09 25.952399999999997L1175.55 25.952399999999997Z " transform="matrix(1,0,0,1,-1161,-13)" /></symbol></svg>
                    <span>State Organizations</span>
                  </a>
                </li>
                <li className="ma__utility-nav__item">
                  <button
                    type="button"
                    className="ma__utility-nav__link js-util-nav-toggle"
                    aria-haspopup="true"
                    aria-label="Log in links for this page"
                    aria-expanded="false"
                  >
                    <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.8" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.8"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
                    <span>
                      Log in to...
                    </span>
                    <span className="toggle-indicator" aria-hidden="true" />
                  </button>
                  <div aria-hidden="true" className="ma__utility-nav__content js-util-nav-content is-closed">
                    <div className="ma__utility-nav__container">
                      <div className="ma__utility-nav__content-title">
                        <button type="button" className="ma__utility-nav__close js-close-util-nav">
                          <span>Close</span>
                          <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
                        </button>
                        <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.9" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.9"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
                        <h2>Log in to...</h2>
                      </div>
                      <div className="ma__utility-nav__content-body">

                        <div className="ma__utility-panel">
                          <div className="ma__utility-panel__description ma__utility-panel__description--full">

                            <div className="ma__rich-text ">
                              <p>Login links for this page</p>
                            </div>
                          </div>

                          <ul className="ma__utility-panel__items">
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="#"
                                  className="js-clickable-link"
                                >
                                  Contextual Login 1&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.432" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.432"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href=""
                                  className="js-clickable-link"
                                >
                                  Contextual Login 2&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.433" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.433"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="ma__utility-panel">
                          <div className="ma__utility-panel__description ma__utility-panel__description--full">

                            <div className="ma__rich-text ">
                              <p>These are the top requested sites you can log in to access state provided services</p>
                            </div>
                          </div>

                          <ul className="ma__utility-panel__items">
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://uionline.detma.org/Claimant/Core/Login.ASPX"
                                  className="js-clickable-link"
                                >
                                  Unemployment Online&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.434" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.434"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2"
                                  className="js-clickable-link"
                                >
                                  Virtual Gateway (SNAP)&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.435" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.435"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://ecse.cse.state.ma.us/ECSE/Login/login.asp"
                                  className="js-clickable-link"
                                >
                                  Child Support Enforcement&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.436" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.436"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://mtc.dor.state.ma.us/mtc/_/"
                                  className="js-clickable-link"
                                >
                                  MassTaxConnect&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.437" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.437"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://atlas-myrmv.massdot.state.ma.us/myrmv/"
                                  className="js-clickable-link"
                                >
                                  myRmv&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.438" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.438"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://www.mahealthconnector.org/"
                                  className="js-clickable-link"
                                >
                                  Massachusetts Health Connector&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.439" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.439"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://juryduty.majury.gov/ojcweb/public/start.aspx"
                                  className="js-clickable-link"
                                >
                                  Massachusetts Juror Service Website&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.440" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.440"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                            <li className="ma__utility-panel__item js-clickable">
                              <span className="ma__decorative-link">
                                <a
                                  href="https://massanf.taleo.net/careersection/ex/jobsearch.ftl"
                                  className="js-clickable-link"
                                >
                                  Find a Commonwealth Job&nbsp;
                                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.441" /></svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.441"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                                </a>
                              </span>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

HeaderMixed.MenuBar = ({ as = 'ul', children, ...rest }) => {
  const Component = as;
  return(
    <Component {...rest} role="menubar">
      {children}
    </Component>
  );
};
HeaderMixed.Menu = ({ as = 'ul', children, MenuItem = HeaderMixed.MenuItem, ...rest }) => {
  const Component = as;
  return(
    <Component {...rest} role="menu">
      {children}
    </Component>
  );
};

HeaderMixed.Link = ({ as = 'a', href, children, ...rest }) => {
  const Component = as;
  return(
    <Component {...rest} href={href} role="menuitem">
      {children}
    </Component>
  );
};

HeaderMixed.MenuItem = ({
  as = 'li',
  children,
  ...rest
}) => {
  const Component = as;
  return(
    <Component {...rest} role="none">
      {children}
    </Component>
  );
};

HeaderMixed.SubMenu = ({
  as = 'div',
  Menu = HeaderMixed.Menu,
  MenuItem = HeaderMixed.MenuItem,
  children,
  ...rest
}) => {
  const Component = as;
  return(
    <Component {...rest} role="none">
      {children}
    </Component>
  );
};

HeaderMixed.NavItem = ({
  as = 'li',
  MenuItem = HeaderMixed.MenuItem,
  Menu = HeaderMixed.Menu,
  SubMenu = HeaderMixed.SubMenu,
  children,
  ...rest
}) => {
  const Component = as;
  return(
    <Component {...rest} role="none">
      <button type="button" role="menuitem" id="button1" className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded="false" aria-haspopup="true">
        <span className="visually-hidden show-label">Show the sub topics of </span>
        Living
        <span className="toggle-indicator" aria-hidden="true" />
      </button>
      { children }
    </Component>
  );
};
HeaderMixed.Button = ({ children, ...rest }) => (
  <button {...rest} type="button" role="menuitem" className="ma__main-nav__top-link" aria-haspopup="true" aria-expanded="false" tabIndex="0">
    <span className="visually-hidden show-label">Show the sub topics of </span>
    {children}
  </button>
);
HeaderMixed.HamburgerButton = ({ children, ...rest }) => (
  <button {...rest} type="button" role="menuitem" className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-expanded="false" aria-haspopup="true">
    <span className="visually-hidden show-label">Show the sub topics of </span>
    {children}
    <span className="toggle-indicator" aria-hidden="true" />
  </button>
);

export default HeaderMixed;
