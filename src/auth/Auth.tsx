import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

import './Auth.scss';
import * as actions from '../store/actions/index';

const Auth = (props: any) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const updateLogin = (e: any) => {
        setLogin(e.target.value);
    }

    const updatePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        props.onAuth(login, password);
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to="/admin" />
    }

    return (
        <div className="auth-form">
            {authRedirect}
            <form onSubmit={submitHandler}>
                <div className="input-wrapper">
                    Login
                    <input type="email" value={login} onChange={updateLogin} />
                    <span className="underline"></span>
                </div>
                <div className="input-wrapper">
                    Password
                <input type="password" value={password} onChange={updatePassword} />
                    <span className="underline"></span>
                </div>
                <button className="submit-button">Log In</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string) => dispatch(actions.auth(email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);