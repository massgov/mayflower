import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { HeaderUtilityNav } from 'MayflowerReactMolecules/HeaderNav';
import { LoginItem, TranslateItem, StateItem } from 'MayflowerReactOrganisms/Header/utility-items.data';
// eslint-disable-next-line import/no-unresolved
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
// eslint-disable-next-line import/no-unresolved
import IconLogin from 'MayflowerReactBase/Icon/IconLogin';
import UtilityNav from './index';
import UtilityNavDocs from './UtilityNav.md';
import UtilityNavData from './UtilityNav.knob.options';

export const UtilityNavExample = (args) => <UtilityNav {...args} />;

UtilityNavExample.storyName = 'Default';
UtilityNavExample.args = {
  googleLanguages: false,
  items: UtilityNavData.items.map((item, itemIndex) => {
    const storyProps = {
      text: item.text,
      ariaLabelText: item.ariaLabelText,
      closeText: item.closeText,
      href: item.href,
      panel: item.panel
    };
    storyProps.icon = item.icon;
    return(storyProps);
  })
};
const NavItemLink = (obj) => {
  const item = obj.data;
  const iconProps = {
    ariaHidden: true
  };
  const IconComponent = item.icon === 'building' ? IconBuilding : IconLogin;

  return(
    <li className="ma__utility-nav__item js-util-nav-toggle">
      <a className="ma__utility-nav__link" href={item.href} aria-label={item.ariaLabelText || item.text}>
        <IconComponent {...iconProps} />
        <span>{item.text}</span>
      </a>
    </li>
  );
};

export const UtilityNavFromHeader = (args) => <HeaderUtilityNav {...args} />;
const BudgetItem = () => (<NavItemLink data={UtilityNavData.items[0]} />);

UtilityNavFromHeader.args = {
  narrow: false,
  items: [
    () => (<React.Fragment>Custom Item</React.Fragment>),
    BudgetItem,
    TranslateItem,
    StateItem,
    LoginItem
  ]
};

export const UtilityNavFromHeaderLoop = (args) => <HeaderUtilityNav {...args} />;
UtilityNavFromHeaderLoop.args = {
  narrow: false,
  // Loops over UtilityNavData items array and returns a functional component for each item.
  items: UtilityNavData.items.map((item) => () => <NavItemLink data={item} />)
};

export default {
  title: 'organisms/UtilityNav',
  component: UtilityNav,
  parameters: {
    docs: {
      page: () => <StoryPage Description={UtilityNavDocs} />
    }
  }
};
