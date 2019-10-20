import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideNav.scss';

const SideNav = (props: any) => {

    return (
        <div className="side-nav" style={{width: props.width}}>
            <a href="/" className="close-btn" onClick={props.closeClicked}>&times;</a>          
            <NavLink to="/" exact>Map</NavLink>
            <NavLink to="/trainings">Trainings</NavLink>
            <NavLink to="/timekeeper">TimeKeeper</NavLink>
            <NavLink to="/song">Song of a Day</NavLink>
            <NavLink to="/lorem">Lorem</NavLink>
            <NavLink to="/ipsum">Ipsum</NavLink>
        </div>
    )
};
export default SideNav;