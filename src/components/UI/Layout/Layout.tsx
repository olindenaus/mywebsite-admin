import React, { useState } from 'react';
import Media from 'react-media';
import { NavLink } from 'react-router-dom';

import Burger from  '../Toolbar/Burger/Burger';
import NavigationLinks from '../Toolbar/NavigationLinks/NavigationLinks';

import SideNav from '../Toolbar/SideNav/SideNav';
import './Layout.scss';

const Layout = (props: any) => {

    const [sideWidth, setSideWidth] = useState('0');

    const burgerClicked = () => {
        if (sideWidth === '0') {
            setSideWidth('250px');
        } else {
            setSideWidth('0');
        }
    }

    const handleSideNavClose = () => {
        setSideWidth('0');
    }

    const navigation = (
        <Media query="(max-width: 520px)">
            {matches =>
                matches ? (<React.Fragment><Burger clicked={burgerClicked} />
                    <SideNav width={sideWidth} closeClicked={handleSideNavClose}/>
                </React.Fragment>)
                    : <NavigationLinks />}
        </Media>
    )

    const intViewportHeight = window.innerHeight;

    return (
        <div className="layout" style={{minHeight: intViewportHeight}}>
            <div className="toolbar">
                {navigation}
            </div>
            <div className="content">{props.children}</div>
            <div className="footer"><NavLink to="/login">Oskar Lindenau - 2019</NavLink></div>
        </div>
    )
};
export default Layout;