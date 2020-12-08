import { addons } from '@storybook/addons';
import mayflowerTheme from './mayflowerTheme';

addons.setConfig({
    theme: mayflowerTheme,
    showNav: true,
    showPanel: true // show the code panel by default,
});
