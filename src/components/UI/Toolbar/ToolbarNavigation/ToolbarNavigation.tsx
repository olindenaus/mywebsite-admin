import React from 'react';

import NavigationLinks from '../NavigationLinks';
import './ToolbarNavigation.scss';

const toolbarNavigation = (props: any) => {

    return (
        <div className='navigation-links'>
            <NavigationLinks />
        </div>
    )
};
export default toolbarNavigation;