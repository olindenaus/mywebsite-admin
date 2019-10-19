import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const fetchLocationsStart = () => {
    return {
        type: actionTypes.FETCH_LOCATIONS_START
    }
}

export const fetchLocationsSuccess = (locations: any) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_SUCCESS,
        locations: locations
    }
}

export const fetchLocationsFail = (error: any) => {
    return {
        type: actionTypes.FETCH_LOCATIONS_FAIL,
        error: error
    }
}

export const fetchLocations = () => {
    return (dispatch: any) => {
        dispatch(fetchLocationsStart());
        axios.get('locationLogs.json')
        .then(res => {
            console.log(res);
            dispatch(fetchLocationsSuccess(res));         
        })
        .catch(err => {
            console.log(err);
            dispatch(fetchLocationsFail(err));
        })
    }
}

export const saveLocationLog = (locationLog: any, token: string, userId: string) => {
    return () => {
        const queryParams = "locationLogs.json?auth="+token;
        console.log(locationLog);
        axios.post(queryParams, locationLog)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
}