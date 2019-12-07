import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../components/UI/Spinner/Spinner';

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

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    };

    let form = (
        <>
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
                {errorMessage}
            <button className="submit-button">Log In</button>
        </>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className="auth-form">
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
            </form>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAuth: (email: string, password: string) => dispatch(actions.auth(email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);