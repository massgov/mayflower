import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

describe('Button', () => {
  it('renders with no props', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.hasClass('ma__button')).toBe(true);
  });
});
