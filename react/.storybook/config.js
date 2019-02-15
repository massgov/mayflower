import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';

import { configure as enzymeconfigure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzymeconfigure({ adapter: new Adapter() });

// automatically import all files ending in *.stories.js
const req = requireContext('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
