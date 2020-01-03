import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions'
import './AdminPanel.scss';

type tLocationLog = { timestamp: number, latitude: number, longitude: number, country: string };

const AdminPanel = (props: any) => {

    const [showPopup, setShowPopup] = useState(true);
    const [message, setMessage] = useState('');
    const [manual, setManual] = useState(false);
    const [controls, setControls] = useState<string | any>({
        lat: {
            elementType: 'input',
            elementConfig: {
                type: 'decimal',
                placeholder: 'Latitude'
            },
            value: '',
            validation: {
                required: true,
                decimal: true
            },
            valid: false,
            touched: false
        },
        lon: {
            elementType: 'input',
            elementConfig: {
                type: 'decimal',
                placeholder: 'Longitude'
            },
            value: '',
            validation: {
                required: true,
                decimal: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    });
    const [locationLog, setLocationLog] = useState({
        timestamp: 0,
        latitude: 0,
        longitude: 0,
        country: ''
    });

    const inputChangedHandler = (value: any, id: string) => {
        const updatedControls = updateObject(controls, {
            [id]: updateObject(controls[id], {
                value: value,
                valid: checkValidity(value, controls[id].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    }

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
            longitude: position.coords.longitude,
            country: locationLog.country
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
            longitude: trimmedLng,
            country: locationLog.country
        });
        const dateVal = new Date(locationLog.timestamp).toLocaleString();
        setMessage(`Logged: ${dateVal}, Lat: ${trimmedLat}, Long: ${trimmedLng}`);
    }

    const saveLocation = () => {
        inputChangedHandler(controls.country.value, 'country');
        if (controls.country.valid) {
            props.onSaveLocationLog(locationLog, props.token, props.userId);
            setShowPopup(true);
        }
    }

    const setLogManually = () => {
        const logDate = Date.now();
        const lat = controls['lat']['value'];
        const lon = controls.lon.value;
        setLocationLog({
            timestamp: logDate,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            country: locationLog.country
        });
        const dateVal = new Date(logDate).toLocaleString();
        setMessage(`Logged: ${dateVal}, Lat: ${lat}, Long: ${lon}`);
    }

    const countryChanged = (ctry: string) => {
        const updatedLocation = updateObject(locationLog, {
            country: ctry
        });
        setLocationLog(updatedLocation);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    const inputs = formElementsArray.map(formElement => (
        <Input
            label={formElement.config.elementConfig.placeholder}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: any) => { countryChanged(event.target.value); inputChangedHandler(event.target.value, formElement.id) }}
        />
    ));

    const countryInput = inputs[2];
    const geoLocationInputs = inputs.slice(0, 2);

    const manualPart = manual ? (
        <div>
            {geoLocationInputs}
            <button onClick={setLogManually}>Check output</button>
        </div>
    ) : null;
    const condition = (props.responseMessage !== '' && showPopup)
    let modal = condition ?
        <Modal
            handleClose={() => setShowPopup(false)}
            show={showPopup}
        ><p>{props.responseMessage}</p>
        </Modal> : null;

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div className="location-logging">
                <h1>Position logging</h1>
                <button onClick={getLocation}>Get Location</button>
                <button onClick={() => setManual(!manual)}>Log manually</button>
                {manualPart}
                <p>{message}</p>
                {countryInput}
                <button onClick={trimLocation}>Trim location</button>
                <button className="save button" onClick={saveLocation}>Save</button>
                {modal}
            </div>
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
        onSaveLocationLog: (locationLog: tLocationLog, token: string, userId: string) => dispatch(actions.saveLocationLog(locationLog, token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);