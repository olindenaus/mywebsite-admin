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
            dispatch(fetchLocationsSuccess(res.data));         
        })
        .catch(err => {
            dispatch(fetchLocationsFail(err));
        })
    }
}