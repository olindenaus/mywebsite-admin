import React, { useState } from 'react';

import Log from '../Log/Log';
import './Group.scss';

const Group = (props: any) => {

    const [showLogs, setShowLogs] = useState(false);
    const locations = Object.keys(props.logs).reverse().map((locationId: any) => {
            return <Log key={locationId} location={props.logs[locationId]} />
        });

    return (
        <div className="group" onClick={() => setShowLogs(!showLogs)}>
            <div className="group-info">
                <div>{props.country}, {props.start.toLocaleDateString()} - {props.end.toLocaleDateString()}</div>
                <div className="flex-column">
                    {showLogs ? locations : null}
                </div>
            </div>
        </div>
    )
};
export default Group;