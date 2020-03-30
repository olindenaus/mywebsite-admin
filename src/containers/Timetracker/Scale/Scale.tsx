import React from 'react';

import './Scale.scss';

const scale = (props: any) => {

    const max = props.max;
    const min = props.min;

    return (
        <div className="scale">
            <div className="fourth row top-text"><span>{max}h</span></div>
            <div className="row"><span></span></div>
            <div className="row top-text"><span>{max / 2}h</span></div>
            <div className="row bot-text"><span>{min}h</span></div>
            {props.children}
        </div>
    )
};

export default scale;