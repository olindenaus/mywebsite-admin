import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

type tState = {token?: string|any, userId?: string|any, error: any};

const initialState = {
    token: null,
    userId: null,
    error: null,
};

const authSuccess = (state: tState, action: any) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null
    });
};

const authStart = (state: tState) => {
    return updateObject(state, { error: null });
}

const authFail = (state: tState, action: any) => {
    return updateObject(state, {
        error: action.error,
    });
}

const authLogout = (state: tState, action: any) => {
    return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;