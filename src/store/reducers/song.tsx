import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared//utility';

const initialState = {
    error: '',
    data: {},
    songsResult: [],
    spotifyToken: ''
};

const saveSongStart = (state: any) => {
    console.log(state);
    updateObject(state, { loading: true });
}

const saveSongSuccess = (state: any) => {
    console.log(state);
    return updateObject(state, { loading: false });
}

const saveSongFail = (state: any, error: any) => {
    console.log(state);
    console.log(error);
    return updateObject(state, { loading: false, error: error });
}

const searchSongStart = (state: any) => {
    console.log(state);
    return updateObject(state, { loading: true });
}

const searchSongSuccess = (state: any, data: any) => {
    console.log(state);
    console.log(data);
    return updateObject(state, { loading: false, songsResult: data });
}

const searchSongFail = (state: any, error: any) => {
    console.log(state);
    console.log(error);
    return updateObject(state, { loading: false, songsResult: [] })
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SEARCH_SONG_START:
            return searchSongStart(state);
        case actionTypes.SEARCH_SONG_SUCCESS:
            return searchSongSuccess(state, action.data);
        case actionTypes.SEARCH_SONG_FAIL:
            return searchSongFail(state, action.error);
        case actionTypes.SAVE_SONG_START:
            return saveSongStart(state);
        case actionTypes.SAVE_SONG_SUCCESS:
            return saveSongSuccess(state);
        case actionTypes.SAVE_SONG_FAIL:
            return saveSongFail(state, action.error);
    }
}

export default reducer;