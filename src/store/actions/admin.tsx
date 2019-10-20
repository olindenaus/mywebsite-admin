import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const saveLocationSuccess = (result: any) => {
    console.log(result);
    return {
        type: actionTypes.SAVE_LOCATION_SUCCESS,
        result: result.data
    }
}

export const saveLocationFail = (error: any) => {
    console.log(error);
    return {
        type: actionTypes.SAVE_LOCATION_FAIL,
        error: error
    };
};

export const saveLocationLog = (locationLog: any, token: string, userId: string) => {
    return (dispatch: any) => {
        const queryParams = "locationLogs.json?auth="+token;
        console.log(locationLog);
        axios.post(queryParams, locationLog)
            .then(res => {
                dispatch(saveLocationSuccess(res));
            }).catch(err => {
                dispatch(saveLocationFail(err));
            })
    }
}