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
    images: { biggest: IImage, medium: IImage, small: IImage }
}

const initialState = {
    error: '',
    data: {},
    songsResult: [],
    spotifyToken: '',
    loading: false,
    fetchedSongs: [],
    savedSong: false
};

const saveSongStart = (state: any) => {
    console.log('[SPOTIFY REDUCER] saveSongStart');
    return updateObject(state, { loading: true });
}

const saveSongSuccess = (state: any) => {
    console.log('[SPOTIFY REDUCER] saveSongSuccess');
    return updateObject(state, { loading: false, savedSong: true });
}

const saveSongFail = (state: any, error: any) => {
    console.log('[SPOTIFY REDUCER] saveSongFail');
    return updateObject(state, { loading: false, error: error });
}

const saveSongForget = (state: any) => {
    console.log('[SPOTIFY REDUCER] saveSongForget');
    return updateObject(state, {savedSong: false});
}

const searchSongStart = (state: any) => {
    console.log('[SPOTIFY REDUCER]  searchSongStart');
    return updateObject(state, { loading: true });
}

const mapToSongs = (tracks: any[]) => {
    return tracks.map(track => {
        return {
            name: track.name,
            previewUrl: track.preview_url,
            duration: track.duration_ms,
            artist: track.artists[0].name,
            images: {
                biggest: { url: track.album.images[0].url, width: track.album.images[0].width, height: track.album.images[0].height },
                medium: { url: track.album.images[1].url, width: track.album.images[1].width, height: track.album.images[1].height },
                small: { url: track.album.images[2].url, width: track.album.images[2].width, height: track.album.images[2].height }
            }
        }
    })
}

const searchSongSuccess = (state: any, tracks: any) => {
    console.log('[SPOTIFY REDUCER] searchSongSuccess');
    const songs = mapToSongs(tracks);
    return updateObject(state, { loading: false, songsResult: songs });
}

const searchSongFail = (state: any, error: any) => {
    console.log('[SPOTIFY REDUCER] searchSongFail');
    return updateObject(state, { loading: false, songsResult: [] })
}

const authenticate = (state: any, token: string) => {
    console.log('[SPOTIFY REDUCER] authenticate');
    return updateObject(state, { spotifyToken: token });
}

const spotifyLogout = (state: any) => {
    console.log('[SPOTIFY REDUCER] logout');    
    return updateObject(state, {
        token: null
    })
}

const fetchSongsFail = (state: any, error: any) => {
    console.log('[SPOTIFY REDUCER] fetch song fail', error)
    return updateObject(state, { error: error, loading: false })
}

const fetchSongsStart = (state: any) => {
    console.log('[SPOTIFY REDUCER] fetch song start')
    return updateObject(state, {loading: true});
}

const fetchSongsSuccess = (state: any, data: any) => {
    console.log('[SPOTIFY REDUCER] fetch song success', data);
    return updateObject(state, { fetchedSongs: data, loading: false });
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
        case actionTypes.SAVE_SONG_FORGET:
            return saveSongForget(state);
        case actionTypes.AUTHENTICATE:
            return authenticate(state, action.token);
        case actionTypes.SPOTIFY_LOGOUT:
            return spotifyLogout(state);
        case actionTypes.FETCH_SONG_START:
            return fetchSongsStart(state);
        case actionTypes.FETCH_SONG_SUCCESS:
            return fetchSongsSuccess(state, action.data);
        case actionTypes.FETCH_SONG_FAIL:
            return fetchSongsFail(state, action.error);
        default:
            return state;
    }
}

export default reducer;