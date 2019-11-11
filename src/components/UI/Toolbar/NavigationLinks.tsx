import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const linksList = (props: any) => {

    let personalContent = null;

    if (props.isAuthenticated) {
        personalContent = (
            <React.Fragment>
                <NavLink to="/lorem">GTD</NavLink>
                <NavLink to="/ipsum">Coffee</NavLink>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <NavLink to="/" exact>Map</NavLink>
            <NavLink to="/trainings">Trainings</NavLink>
            <NavLink to="/timekeeper">TimeKeeper</NavLink>
            <NavLink to="/song">Song of a Day</NavLink>
            {personalContent}
            <NavLink to="/login">Login</NavLink>
        </React.Fragment>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(linksList);