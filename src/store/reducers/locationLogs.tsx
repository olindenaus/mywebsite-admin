import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    locations: [],
    loading: false,
    country: ''
};

const fetchLocationsStart = (state: any, action: any) => {
    return updateObject(state, { loading: true });
}

const fetchLocationsSuccess = (state: any, action: any) => {
    console.log(action)
    return updateObject(state, {
        loading: false,
        locations: action.locations,
    })
}

const fetchLocationsFail = (state: any, action: any) => {
    return updateObject(state, { loading: false })
}

const fetchCountrySuccess = (state: any, action: any) => {
    const country = action.data[Object.keys(action.data)[0]].country;
    if(typeof country === 'undefined') {        
        return updateObject(state, {
            country: '[no information] -> see logs below'
        });
    }
    return updateObject(state, {
        country: country
    });
}

const fetchCountryFail = (state: any, action: any) => {
    console.log(action);
    return state;
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.FETCH_LOCATIONS_START:
            return fetchLocationsStart(state, action);
        case actionTypes.FETCH_LOCATIONS_SUCCESS:
            return fetchLocationsSuccess(state, action);
        case actionTypes.FETCH_LOCATIONS_FAIL:
            return fetchLocationsFail(state, action);
        case actionTypes.FETCH_COUNTRY_SUCCESS:
            return fetchCountrySuccess(state, action);
        case actionTypes.FETCH_LOCATIONS_FAIL:
            return fetchCountryFail(state, action);
        default:
            return state;
    }
}

export default reducer;