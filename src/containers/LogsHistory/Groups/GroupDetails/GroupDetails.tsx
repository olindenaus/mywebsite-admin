import React from 'react';

import './GroupDetails.scss';

const groupDetails = (props: any) => {

    const startTime = new Date(props.start).toLocaleDateString();
    const endTime = new Date(props.end).toLocaleDateString();

    return (
        <div className="group-detail">
            <h1>{props.country}</h1>
            <h4>{startTime} - {endTime}</h4>
            <div className="logs">
                {props.logs}
            </div>
        </div>
    )
};
export default groupDetails;