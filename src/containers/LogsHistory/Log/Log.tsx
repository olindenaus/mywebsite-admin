import React from 'react';

import './Log.scss';

const log = (props: any) => {
    const lat = props.location.latitude;
    const lng = props.location.longitude;
    const date = new Date(props.location.timestamp);
    const logClicked = (event: any) => {
        const route = `https://maps.google.com/?q=${lat},${lng}`
        event.preventDefault(); window.open(route);
    }

    return (
        <div className="log" onClick={logClicked}>
            {date.toLocaleString()}
        </div>
    )
};
export default log;