import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const NavigationLinks = (props: any) => {

    let personalContent = <NavLink to="/login">Login</NavLink>;

    if (props.isAuthenticated) {
        personalContent = (
            <>
                <NavLink to="/admin">Admin</NavLink>
            </>
        )
    }

    return (
        <>
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