import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    responseMessage: '',
};

const saveLocationSuccess = (state: any, action: any) => {
    return updateObject(state, {
        responseMessage: 'Successfully saved location'
    }); 
}

const saveLocationFail = (state: any, action: any) => {
    return updateObject(state, {
        responseMessage: action.error.message
    });    
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SAVE_LOCATION_SUCCESS:
            return saveLocationSuccess(state, action);
        case actionTypes.SAVE_LOCATION_FAIL:
            return saveLocationFail(state, action);
        default:
            return state;
    }
}

export default reducer;