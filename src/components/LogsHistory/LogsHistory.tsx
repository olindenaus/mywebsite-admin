import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import './LogsHistory.scss';

const LogsHistory = (props: any) => {

    useEffect(() => {
        props.onFetchLocationLogs();
    }, []);

    const locations = Object.keys(props.locations).reverse()
        .map((locationId: any) => {
            const lat = props.locations[locationId].latitude;
            const lng = props.locations[locationId].longitude;
            const date = new Date(props.locations[locationId].timestamp);
            const route = `https://maps.google.com/?q=${lat},${lng}`
            return (
                <li key={locationId} >
                    <Link to={route} target="_blank" onClick={(event) => { event.preventDefault(); window.open(route); }}>
                            ({lat}, {lng}), {date.toLocaleString()}
                    </Link>
                </li>
            )

        });

    return (
        <div className={"locations-history"}>
            <div className={"logs-container"}>
                <ul>
                    {locations}
                </ul>
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        locations: state.logs.locations
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchLocationLogs: () => dispatch(actions.fetchLocations())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogsHistory);