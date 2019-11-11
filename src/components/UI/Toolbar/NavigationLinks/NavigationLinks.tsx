import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationLinks.scss';

const navigationLinks = (props: any) => {

    return (
        <div className='navigation-links'>
            <NavLink to="/" exact>Map</NavLink>
            <NavLink to="/trainings">Trainings</NavLink>
            <NavLink to="/timekeeper">TimeKeeper</NavLink>
            <NavLink to="/song">Song of a Day</NavLink>
            <NavLink to="/lorem">GFD</NavLink>
            <NavLink to="/ipsum">Coffee</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
};
export default navigationLinks;