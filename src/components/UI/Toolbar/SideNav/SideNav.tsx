import React from 'react';

import NavigationLinks from '../NavigationLinks';
import './SideNav.scss';

const SideNav = (props: any) => {

    return (
        <div className="side-nav" style={{width: props.width}}>
            <a href="#" className="close-btn" onClick={props.closeClicked}>&times;</a>   
            <NavigationLinks />
        </div>
    )
};
export default SideNav;