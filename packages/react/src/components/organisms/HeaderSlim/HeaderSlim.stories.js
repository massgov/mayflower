import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogoHeader from 'MayflowerReactMedia/SiteLogo';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import HeaderSlim from '.';
import styles from './_index.scss';

export const HeaderSlimExample = (args) => <HeaderSlim {...args} />;

HeaderSlimExample.storyName = 'Default';
HeaderSlimExample.args = {
  siteLogo: (<SiteLogoHeader
    url={{
      domain: 'https://www.mass.gov/'
    }}
    image={{
      src: logo,
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    }}
    siteName="Mass.gov"
    title="Mass.gov homepage"
  />),
  skipNav: <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>
};

export const HeaderSlimWithNavs = (args) => <HeaderSlim {...args} />;

HeaderSlimWithNavs.storyName = 'HeaderSlim with Nav';
HeaderSlimWithNavs.args = {
  siteLogo: (<SiteLogoHeader
    url={{
      domain: 'https://www.mass.gov/'
    }}
    image={{
      src: logo,
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    }}
    siteName="Mass.gov"
    title="Mass.gov homepage"
  />),
  skipNav: <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>,
  mainNav: <ButtonWithIcon icon={<IconSearch />} />,
  utilityNav: (
    <div>
      <a href="#main-content">Nav Link 1</a>
      <a href="#main-content">Nav Link 2</a>
    </div>
  )
};

export default {
  title: 'organisms/HeaderSlim',
  component: HeaderSlim,
  parameters: {
    docs: {
      page: () => <StoryPage styles={styles} />
    }
  }
};
