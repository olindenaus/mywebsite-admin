import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

export const NavigationLinks = (props: any) => {

    let logButton = <NavLink to="/login">Login</NavLink>;

    if (props.isAuthenticated) {
        logButton = (
            <>
                <div onClick={props.logout}>Logout</div>
            </>
        )
    }

    return (
        <>
            {logButton}            
        </>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {dispatch(actions.logout())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationLinks);