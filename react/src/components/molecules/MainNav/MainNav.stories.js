import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import MainNav from './index';
import MainNavDocs from './MainNav.md';
import MainNavData from './MainNav.knob.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'MainNav', (() => {
      const newProps = {
        onNavigateCallBack: action('onNavigateCallBack'),
        mainNav: []
      };
      newProps.mainNav = MainNavData.mainNav.map((nav, navIndex) => {
        let active = false;
        if (typeof nav.active === 'string') {
          active = (nav.active.toLowerCase() === 'true');
        } else if (typeof nav.active === 'boolean') {
          active = nav.active;
        } else {
          active = false;
        }
        const storyProps = {
          href: text(`MainNav ${navIndex}: href`, nav.href, `MainNav ${navIndex}`),
          text: text(`MainNav ${navIndex}: text`, nav.text, `MainNav ${navIndex}`),
          active: boolean(`MainNav ${navIndex}: active`, active, `MainNav ${navIndex}`),
          subNav: object(`MainNav ${navIndex}: subNav`, nav.subNav, `MainNav ${navIndex}`)
        };
        return(storyProps);
      });
      return(<MainNav {...newProps} />);
    }),
    { info: MainNavDocs }
  );
