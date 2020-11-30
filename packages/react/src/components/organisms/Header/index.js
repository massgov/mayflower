import React from 'react';
import HeaderNav, { HeaderUtilityNav, HeaderLogo, HeaderNavSearch } from 'MayflowerReactMolecules/HeaderNav';

const Header = ({
  Logo,
  NavSearch,
  UtilityNav,
  Container,
  mainItems = [],
  utilityItems = []
}) => {
  const RenderedContainer = Container || HeaderContainer;
  const RenderedUtilityNav = UtilityNav || HeaderUtilityNav;
  return(
    <header className="ma__header" id="header">
      <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>
      <RenderedUtilityNav translateId="google-translate-element" narrow={false} items={utilityItems} />
      <RenderedContainer Logo={Logo} NavSearch={NavSearch} />
      <HeaderNav Logo={null} mainItems={mainItems} utilityItems={utilityItems} />
    </header>
  );
};

const HeaderContainer = ({ Logo = HeaderLogo, NavSearch = HeaderNavSearch }) => (
  <div className="ma__header__container">
    {Logo && <Logo mobile={false} />}
    {NavSearch && <NavSearch />}
  </div>
);

export default Header;
