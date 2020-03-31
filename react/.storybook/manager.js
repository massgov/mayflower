import { addons } from '@storybook/addons';
import mayflowerTheme from './mayflowerTheme';
import { themes } from '@storybook/theming';


addons.setConfig({
    theme: themes.dark,
    showNav: true,
    showPanel: true, // show the code panel by default,
});