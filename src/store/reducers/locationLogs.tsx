import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    locations: [],
    loading: false,
    country: '',
    errorMessage: ''
};

const fetchLocationsStart = (state: any) => {
    console.log('[REDUCER LocationLogs] fetchLocationsStart');  
    return updateObject(state, { loading: true });
}

const fetchLocationsSuccess = (state: any, action: any) => {
    console.log('[REDUCER LocationLogs] fetchLocationsSuccess');  
    return updateObject(state, {
        loading: false,
        locations: action.locations,
        errorMessage: ''
    })
}

const fetchLocationsFail = (state: any, action: any) => {
    console.log('[REDUCER LocationLogs] fetchLocationsFail');  
    return updateObject(state, {
        loading: false,
        errorMessage: action.error
    });
}

const fetchCountryStart = (state: any) => {
    console.log('[REDUCER LocationLogs] fetchCountryStart');  
    return updateObject(state, { loading: true });
}

const fetchCountrySuccess = (state: any, action: any) => {
    console.log('[REDUCER LocationLogs] fetchCountrySucceess');  
    const country = action.data[Object.keys(action.data)[0]].country;
    if (typeof country === 'undefined') {
        return updateObject(state, {
            country: '[no information] -> see logs below',
            loading: false,
            errorMessage: ''
        });
    }
    return updateObject(state, {
        country: country,
        loading: false,
        errorMessage: ''
    });
}

const fetchCountryFail = (state: any, action: any) => {
    console.log('[REDUCER LocationLogs] fetchCountryFail');    
    return updateObject(state, {
        errorMessage: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.FETCH_LOCATIONS_START:
            return fetchLocationsStart(state);
        case actionTypes.FETCH_LOCATIONS_SUCCESS:
            return fetchLocationsSuccess(state, action);
        case actionTypes.FETCH_LOCATIONS_FAIL:
            return fetchLocationsFail(state, action);
        case actionTypes.FETCH_COUNTRY_START:
            return fetchCountryStart(state);
        case actionTypes.FETCH_COUNTRY_SUCCESS:
            return fetchCountrySuccess(state, action);
        case actionTypes.FETCH_COUNTRY_FAIL:
            return fetchCountryFail(state, action);
        default:
            return state;
    }
}

export default reducer;