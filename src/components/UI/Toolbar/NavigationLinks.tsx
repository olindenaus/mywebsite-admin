import React from 'react';
import { NavLink } from 'react-router-dom';

const linksList = () => {

    return (
        <React.Fragment>            
            <NavLink to="/" exact>Map</NavLink>
            <NavLink to="/trainings">Trainings</NavLink>
            <NavLink to="/timekeeper">TimeKeeper</NavLink>
            <NavLink to="/song">Song of a Day</NavLink>
            <NavLink to="/lorem">GFD</NavLink>
            <NavLink to="/ipsum">Coffee</NavLink>
            <NavLink to="/login">Login</NavLink>
        </React.Fragment>
    )
};
export default linksList;