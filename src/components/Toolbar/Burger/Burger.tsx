import React from 'react';

import './Burger.scss';

const burger = (props: any) => {

    return (
        <div className="burger" onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};
export default burger;