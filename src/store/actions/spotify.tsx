import { spotify_api, firebase } from '../../axios';
import * as actionTypes from './actionTypes';
import { ISong } from '../reducers/spotify';

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

export const saveSong = (song: ISong, date: Date, token: string) => {
    return (dispatch: any) => {
        dispatch(saveSongStart());
        const queryParams = "songs.json?auth=" + token;
        firebase.post(queryParams, { song: song, date: date })
            .then(res => {
                dispatch(saveSongSuccess(res.data));
                dispatch(forgetSongTimeout());
            })
            .catch(err => {
                console.log(err);
                dispatch(saveSongFail(err.response.data.error));
            })
    }
}

export const searchSongStart = () => {
    return {
        type: actionTypes.SEARCH_SONG_START
    }
}

export const searchSongSuccess = (data: any) => {
    return {
        type: actionTypes.SEARCH_SONG_SUCCESS,
        tracks: data.tracks.items
    }
}

export const searchSongFail = (error: any) => {
    return {
        type: actionTypes.SEARCH_SONG_START,
        error: error
    }
}

export const searchSong = (song: string, token: string) => {
    return (dispatch: any) => {
        dispatch(searchSongStart());
        spotify_api.get('search?q=' + song + '&type=track&limit=5', {
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(res => {
            dispatch(searchSongSuccess(res.data));
        }).catch(err => {
            dispatch(searchSongFail(err.response.data.error));
        })       
    }
}

export const spotifyAuthSuccess = (token: string) => {
    return {
        token: token,
        type: actionTypes.AUTHENTICATE
    }
}

export const spotifyLogout = () => {
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("spotify_expirationTime");
    return {
        type: actionTypes.SPOTIFY_LOGOUT
    }
}

export const spotifyAuthTimeout = (expirationTime: number) => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(spotifyLogout());
        }, expirationTime * 1000);
    }
}

export const spotifyAuth = (data: any) => {
    return (dispatch: any) => {
        localStorage.setItem("spotify_token", data.token);
        const expirationTime = new Date().getTime() + Number.parseInt(data.expiresIn)*1000;
        localStorage.setItem("spotify_expirationTime", expirationTime.toString());
        dispatch(spotifyAuthSuccess(data.token));
        dispatch(spotifyAuthTimeout(data.expiresIn));
    }
}

export const fetchSongsStart = () => {
    return {
        type: actionTypes.FETCH_SONG_START
    }
}

export const fetchSongsSuccess = (data: any) => {
    return {
        type: actionTypes.FETCH_SONG_SUCCESS,
        data: data
    }
}

export const fetchSongsFail = (error: any) => {
    return {
        type: actionTypes.FETCH_SONG_FAIL,
        error: error
    }
}

export const forgetSavedSong = () => {
    return {
        type: actionTypes.SAVE_SONG_FORGET
    };
};

export const forgetSongTimeout = () => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(forgetSavedSong());
        }, 10 * 1000)
    }
}

export const fetchSongs = () => {
    return (dispatch: any) => {
        dispatch(fetchSongsStart());
        firebase.get('songs.json') //?orderBy="$key"
            .then(res => {
                dispatch(fetchSongsSuccess(res.data));
            })
            .catch(err => {
                console.log("----->>>>>Error: ", err.response);
                dispatch(fetchSongsFail(err.response));
            })
    }
}

export const spotifyCheckState = () => {
    return (dispatch: any) => {
        const spotifyToken = localStorage.getItem('spotify_token');
        if(!spotifyToken) {       
            dispatch(spotifyLogout());
        } else {
            const expirationTime = localStorage.getItem("spotify_expirationTime") as string;
            const expiresIn = (Number.parseInt(expirationTime) - new Date().getTime())/1000;
            if(expirationTime > new Date().getTime().toString()) {
                dispatch(spotifyAuthSuccess(spotifyToken));
                dispatch(spotifyAuthTimeout(expiresIn));
            } else {
                dispatch(spotifyLogout());
            }
        }
    }
}