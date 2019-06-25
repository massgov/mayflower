import React from 'react';
import { shallow } from 'enzyme';

import ArrowButton from './index';

describe('ArrowButton', () => {
  it('renders', () => {
    const props = {
      onClick: () => {}
    };
    const wrapper = shallow(<ArrowButton {...props} />);
    expect(wrapper.hasClass('ma__arrow-button')).toBe(true);
  });
});
