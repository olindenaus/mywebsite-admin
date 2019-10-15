import React from 'react';

import './Auth.scss';

const auth = () => {

    return (
        <div className="auth-form">
            <form>
                <div className="input-wrapper">
                    {/* Login */}
                    <input type="email"/>
                    <span className="underline"></span>
                </div>
                <div className="input-wrapper">
                    {/* Password */}
                <input type="password"/>
                    <span className="underline"></span>
                </div>
            </form>
        </div>
    )
};
export default auth;