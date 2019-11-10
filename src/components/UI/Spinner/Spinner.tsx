import React from 'react';

import './Spinner.scss';

const spinner = (props: any) => {

    return (
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>            
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};
export default spinner;