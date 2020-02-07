import { spotify_api } from '../../axios';
import * as actionTypes from './actionTypes';
import { saveLocationFail } from './admin';

export const saveSongStart = () => {
    return {
        type: actionTypes.SAVE_SONG_START
    }
}

export const saveSongSuccess = (res: any) => {
    return {
        type: actionTypes.SAVE_SONG_SUCCESS,
        data: res.data
    }
}

export const saveSongFail = (error: any) => {
    return {
        type: actionTypes.SAVE_SONG_FAIL,
        error: error
    }
}

export const saveSong = () => {
    return (dispatch: any) => {
        dispatch(saveSongStart());
        spotify_api.post('songs')
            .then(res => {
                dispatch(saveSongSuccess(res.data));
            })
            .catch(err => {
                dispatch(saveLocationFail(err.response.data.error));
            })
    }
}

export const searchSongStart = () => {
    return {
        type: actionTypes.SEARCH_SONG_START
    }
}

export const searchSongSuccess = (res: any) => {
    return {
        type: actionTypes.SEARCH_SONG_SUCCESS,
        data: res.data
    }
}

export const searchSongFail = (error: any) => {
    return {
        type: actionTypes.SEARCH_SONG_START,
        error: error
    }
}

export const searchSong = (song: string) => {
    return (dispatch: any) => {
        dispatch(searchSongStart());
        spotify_api.get('search', {
            params: {
                q: song,
                type: 'track',
                limit: '5'
            }
        }).then(res => {
                dispatch(searchSongSuccess(res.data));
            })
            .catch(err => {
                dispatch(searchSongFail(err.response.data.error));
            })
    }
}