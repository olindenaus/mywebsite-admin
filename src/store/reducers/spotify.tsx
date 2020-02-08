import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

interface IImage {
    width: number,
    height: number,
    url: string
}

export interface ISong {
    previewUrl: string,
    name: string,
    duration: number,
    artist: string,
    img: IImage
}

const initialState = {
    error: '',
    data: {},
    songsResult: [],
    spotifyToken: '',
    loading: false
};

const saveSongStart = (state: any) => {
    console.log('[REDUCER] saveSongStart');
    return updateObject(state, { loading: true });
}

const saveSongSuccess = (state: any) => {
    console.log('[REDUCER] saveSongSuccess');
    return updateObject(state, { loading: false });
}

const saveSongFail = (state: any, error: any) => {
    console.log('[REDUCER] saveSongFail');
    return updateObject(state, { loading: false, error: error });
}

const searchSongStart = (state: any) => {
    console.log('[REDUCER]  searchSongStart');
    return updateObject(state, { loading: true });
}

const mapToSongs = (tracks: any[]) => {
    return tracks.map(track => {
        return {
            name: track.name,
            previewUrl: track.preview_url,
            duration: track.duration_ms,
            artist: track.artists[0].name,
            img: { url: track.album.images[2].url, width: track.album.images[2].width, height: track.album.images[2].height }
        }
    })
}

const searchSongSuccess = (state: any, tracks: any) => {
    console.log('[REDUCER] searchSongSuccess');
    const songs = mapToSongs(tracks);
    return updateObject(state, { loading: false, songsResult: songs });
}

const searchSongFail = (state: any, error: any) => {
    console.log('[REDUCER] searchSongFail');
    return updateObject(state, { loading: false, songsResult: [] })
}

const authenticate = (state: any, token: string) => {
    console.log('[REDUCER] authenticate');
    return updateObject(state, { spotifyToken: token });
}

const spotifyLogout = (state: any) => {
    return updateObject(state, {
        token: null
    })
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SEARCH_SONG_START:
            return searchSongStart(state);
        case actionTypes.SEARCH_SONG_SUCCESS:
            return searchSongSuccess(state, action.tracks);
        case actionTypes.SEARCH_SONG_FAIL:
            return searchSongFail(state, action.error);
        case actionTypes.SAVE_SONG_START:
            return saveSongStart(state);
        case actionTypes.SAVE_SONG_SUCCESS:
            return saveSongSuccess(state);
        case actionTypes.SAVE_SONG_FAIL:
            return saveSongFail(state, action.error);
        case actionTypes.AUTHENTICATE:
            return authenticate(state, action.token);
        case actionTypes.SPOTIFY_LOGOUT:
            return spotifyLogout(state);
        default:
            return state;
    }
}

export default reducer;