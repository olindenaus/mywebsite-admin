import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    locations: [],
    loading: false,
};

const fetchLocationsStart = (state: any, action: any) => {
    return updateObject(state, { loading: false });
}

const fetchLocationsSuccess = (state: any, action: any) => {
    console.log(action)
    return updateObject(state, {
        loading: false,
        locations: action.locations
    })
}

const fetchLocationsFail = (state: any, action: any) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.FETCH_LOCATIONS_START:
            return fetchLocationsStart(state, action);
        case actionTypes.FETCH_LOCATIONS_SUCCESS:
            return fetchLocationsSuccess(state, action);
        case actionTypes.FETCH_LOCATIONS_FAIL:
            return fetchLocationsFail(state, action);
        default:
            return state;
    }
}

export default reducer;