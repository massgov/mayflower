import {configure, addDecorator} from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
addDecorator(withA11y);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}
configure(loadStories, module);
