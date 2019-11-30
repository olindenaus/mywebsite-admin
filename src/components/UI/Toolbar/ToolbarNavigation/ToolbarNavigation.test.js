import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavigationLinks } from '../NavigationLinks';

import { NavLink }  from 'react-router-dom';

configure({adapter: new Adapter()});

describe('ToolbarNavigation />', () => {

    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<NavigationLinks />);
    });

    it('should render 5 <NavLink /> elements if not authenticated', () => {
        expect(wrapper.find(NavLink)).toHaveLength(5);
    });

    it('should have a login button if not authenticated', () => {
        expect(wrapper.contains(<NavLink to="/login">Login</NavLink>));
    });

    it('should render 7 <NavLink /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavLink)).toHaveLength(7);
    });

    it('should render admin panel button if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavLink to="/admin">Admin</NavLink>));
    })
})