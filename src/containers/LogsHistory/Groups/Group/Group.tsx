import React from 'react';

import Log from '../../Log/Log';
import './Group.scss';

const Group = (props: any) => {
    const locations = Object.keys(props.logs).reverse().map((locationId: any) => {
            return <Log key={locationId} location={props.logs[locationId]} />
        });

    const groupInfo = {
        country: props.country,
        start: props.start,
        end: props.end,
        locations: locations
    }

    return (
        <div className="group" onClick={() => props.clicked(groupInfo)}>
            <div className="group-info">
                <div>{props.country}, {props.start.toLocaleDateString()} - {props.end.toLocaleDateString()}</div>
            </div>
        </div>
    )
};
export default Group;