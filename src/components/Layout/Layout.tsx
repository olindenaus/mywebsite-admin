import React from 'react';

import NavigationLinks from '../NavigationLinks/NavigationLinks';
import './Layout.scss';

const layout = (props: any) => {

    return (
        <div className="layout">
            <div className="toolbar">
                <NavigationLinks />
            </div>
            <div className="content">{props.children}</div>
            <div className="footer">Oskar Lindenau {'\u00A9'} 2019</div>
        </div>
    )
};
export default layout;