import reducer from './locationLogs';
import * as actionTypes from '../actions/actionTypes';

describe('locationLog reducer', () => {
    it('should display no country information', () => {
        expect(reducer(undefined, {
            type: actionTypes.FETCH_COUNTRY_SUCCESS,
            data: {'data': {country: undefined}}
        })).toEqual({
            locations: [],
            loading: false,
            country: '[no information] -> see logs below',
            errorMessage: ''
        });
    });

    it('should display last visited country', () => {
        expect(reducer(undefined, {
            type: actionTypes.FETCH_COUNTRY_SUCCESS,
            data: {'data': {country: 'Poland'}}
        })).toEqual({
            locations: [],
            loading: false,
            country: 'Poland',
            errorMessage: ''
        })
    });

    it('should set locations on location fetch success', () => {
        expect(reducer(undefined, {
            type: actionTypes.FETCH_LOCATIONS_SUCCESS,
            locations: ['locationA', 'locationB']
        })).toEqual({
            locations: ['locationA', 'locationB'],
            loading: false,
            country: '',
            errorMessage: ''
        })
    })
})