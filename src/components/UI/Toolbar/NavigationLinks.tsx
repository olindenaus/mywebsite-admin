import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const NavigationLinks = (props: any) => {

    let personalContent = <NavLink to="/login">Login</NavLink>;

    if (props.isAuthenticated) {
        personalContent = (
            <>
                <NavLink to="/lorem">GTD</NavLink>
                <NavLink to="/ipsum">Coffee</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </>
        )
    }

    return (
        <>
            <NavLink to="/" exact>Map</NavLink>
            <NavLink to="/trainings">Trainings</NavLink>
            <NavLink to="/timekeeper">TimeTracker</NavLink>
            <NavLink to="/song">Song of a Day</NavLink>
            {personalContent}            
        </>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(NavigationLinks);