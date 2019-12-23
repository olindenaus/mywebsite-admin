import React from 'react';

import './Scale.scss';

const scale = (props: any) => {
    const max = props.max;
    const min = props.min;

    return (
        <div className="scale">
            <div className="fourth row top-text"><span>{props.max}h</span></div>
            <div className="third row"><span></span></div>
            <div className="second row top-text"><span>{props.half}h</span></div>
            <div className="first row bot-text"><span>{props.min}h</span></div>
            {props.children}
        </div>
    )
};
export default scale;