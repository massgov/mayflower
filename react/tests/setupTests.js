/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

/* eslint-disable no-undef */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 240000;
configure({ adapter: new Adapter() });
