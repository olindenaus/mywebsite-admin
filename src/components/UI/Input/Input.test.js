import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from './Input';

configure({ adapter: new Adapter() });

describe('<Input />', () => {
    let input;

    beforeEach(() => {
        input = shallow(<Input />);
    });

    it('should display validation-error message when touched and invalid', () => {
        input.setProps({ invalid: true, touched: true })
        expect(input.contains(<p className={'validation-error'}>Please enter a valid value!</p>)).toEqual(true);
    });

    it('should not display validation-error message when not touched', () => {
        input.setProps({ invalid: true, touched: false });
        expect(input.contains(<p className={'validation-error'}>Please enter a valid value!</p>)).toEqual(false);
    });
})