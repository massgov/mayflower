import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { HeaderUtilityNav } from 'MayflowerReactMolecules/HeaderNav';
import { LoginItem, TranslateItem, StateItem } from 'MayflowerReactOrganisms/Header/utility-items';
// eslint-disable-next-line import/no-unresolved
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
// eslint-disable-next-line import/no-unresolved
import IconLogin from 'MayflowerReactBase/Icon/IconLogin';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';

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
    <a className="ma__utility-nav__link" href={item.href} aria-label={item.ariaLabelText || item.text}>
      <IconComponent {...iconProps} />
      <span>{item.text}</span>
    </a>
  );
};

export const UtilityNavFromHeader = (args) => {
  const windowWidth = useWindowWidth();
  // For backstop to not fail, we need this check to make the utility nav display on mobile and tablet.
  const isMobileWindow = windowWidth !== null && windowWidth < 1024;
  const { narrow, ...rest} = args;
  let narrowOverride = narrow;
  if (isMobileWindow) {
    narrowOverride = true;
  }
  return(<HeaderUtilityNav narrow={narrowOverride} {...rest} />);
}
const BudgetItem = React.memo(() => (<NavItemLink data={UtilityNavData.items[0]} />));
const CustomItem = React.memo(() => (<React.Fragment>Custom Item</React.Fragment>));
UtilityNavFromHeader.args = {
  narrow: false,
  items: [
    CustomItem,
    BudgetItem,
    TranslateItem,
    StateItem,
    LoginItem
  ]
};

export const UtilityNavFromHeaderLoop = (args) => {
  const windowWidth = useWindowWidth();
  // For backstop to not fail, we need this check to make the utility nav display on mobile and tablet.
  const isMobileWindow = windowWidth !== null && windowWidth < 1024;
  const { narrow, ...rest} = args;
  let narrowOverride = narrow;
  if (isMobileWindow) {
    narrowOverride = true;
  }
  return(<HeaderUtilityNav narrow={narrowOverride} {...rest} />);
};
UtilityNavFromHeaderLoop.args = {
  narrow: false,
  // Loops over UtilityNavData items array and returns a functional component for each item.
  items: UtilityNavData.items.map((item) => () => <NavItemLink data={item} />)
};
UtilityNavFromHeaderLoop.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={UtilityNavFromHeaderLoop} Description={UtilityNavDocs} />
  }
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
