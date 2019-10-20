import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/'
import './AdminPanel.scss';

type tLocationLog = { timestamp: number, latitude: number, longitude: number };

const AdminPanel = (props: any) => {

    const [message, setMessage] = useState('');
    const [manual, setManual] = useState(false);
    const [latManual, setLatManual] = useState('');
    const [lonManual, setLonManual] = useState('');
    const [locationLog, setLocationLog] = useState({
        timestamp: 0,
        latitude: 0,
        longitude: 0
    });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onLocationGetSuccess, onLocationGetFail, { enableHighAccuracy: true });
        }
    }
    
    const onLocationGetSuccess = (position: any) => {
        const logDate = Date.now();
        const tempLocationLog = {
            timestamp: logDate,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        setLocationLog(tempLocationLog);
        const dateVal = new Date(tempLocationLog.timestamp).toLocaleString();
        setMessage(`Logged: ${dateVal}, Lat: ${tempLocationLog.latitude}, Long: ${tempLocationLog.longitude}`);
    }

    const onLocationGetFail = (a: any) => {
        setMessage(a.message);
    }

    const trimLocation = () => {
        const trimmedLat = parseFloat(locationLog.latitude.toFixed(1));
        const trimmedLng = parseFloat(locationLog.longitude.toFixed(1));
        setLocationLog({
            timestamp: locationLog.timestamp,
            latitude: trimmedLat,
            longitude: trimmedLng
        });
        const dateVal = new Date(locationLog.timestamp).toLocaleString();
        setMessage(`Logged: ${dateVal}, Lat: ${trimmedLat}, Long: ${trimmedLng}`);
    }

    const saveLocation = () => {
        props.onSaveLocationLog(locationLog, props.token, props.userId);
    }

    const setLogManually = () => {
        const logDate = Date.now();
        setLocationLog({
            timestamp: logDate,
            latitude: parseFloat(latManual),
            longitude: parseFloat(lonManual)
        });
        const dateVal = new Date(locationLog.timestamp).toLocaleString();
        setMessage(`Logged: ${dateVal}, Lat: ${locationLog.latitude}, Long: ${locationLog.longitude}`);
    }

    const manualPart = manual ? (
        <div>
            <p>Latitude</p>
            <input onChange={(e) => setLatManual(e.target.value)} type="decimal" value={latManual}></input>
            <p>Longitude</p>
            <input onChange={(e) => setLonManual(e.target.value)} type="decimal" value={lonManual}></input>
            <br></br>
            <button onClick={setLogManually}>Log</button>
        </div>
    ) : null;

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <button onClick={getLocation}>Get Location</button>
            <button onClick={() => setManual(!manual)}>Log manually</button>
            {manualPart}
            <p>{message}</p>
            <button onClick={trimLocation}>Trim location</button>
            <button className="save-button" onClick={saveLocation}>Save</button>
            <p>{props.responseMessage}</p>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        responseMessage: state.admin.responseMessage
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSaveLocationLog: (locationLog: tLocationLog, token: string, userId:string) => dispatch(actions.saveLocationLog(locationLog, token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);