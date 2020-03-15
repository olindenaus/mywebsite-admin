import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import SongDisplay from './SongDisplay/SongPicker';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity, mapControlsToFormElements } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import { ISong } from '../../../store/reducers/spotify';
import './SongPane.scss';
import Spinner from '../../../components/UI/Spinner/Spinner';

const SongPane = (props: any) => {

    const [songInfo, setSongInfo] = useState<string>("");
    const [songDate, setSongDate] = useState<string>((new Date()).toLocaleDateString("sv-SE").split(" ")[0]);
    const [pickedSong, setPickedSong] = useState<ISong>();
    const [controls, setControls] = useState<string | any>({
        songSearch: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Search song'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        songDate: {
            elementType: 'input',
            elementConfig: {
                type: 'date',
                placeholder: 'Date'
            },
            value: (new Date()).toLocaleDateString("sv-SE").split(" ")[0],
            validation: {
                required: false,
            }
        }
    });

    const extractTokenFromCallback = () => {
        let url = window.location.href;
        if (url.includes("access_token=")) {
            const queryParams = url.split("access_token=")[1].split("&");
            const token = queryParams[0];
            const expireTime = queryParams[2].split("expires_in=")[1];
            if (token !== '' && token !== props.spotifyToken) {
                props.onAuthenticate(token, expireTime);
            }
        }
    }

    useEffect(() => {
        extractTokenFromCallback();
    });

    useEffect(() => {
        props.onFetchSongs();
    }, [])

    const songsOfADay = Object.keys(props.fetchedSongs).map((id: any) => {
        return props.fetchedSongs[id];
    });

    const getFutureSongs = (songs: any, date: Date) => {
        return _.filter(songs, (a: any) => {
            return a.date >= date.toLocaleDateString("sv-SE").split(" ")[0];
        }).map((song: any) => {
            console.log(song);            
            return <p key={song.date}>{`${song.date}, ${song.song.artist} - ${song.song.name}`}</p>;
        });
    }

    const formElementsArray = mapControlsToFormElements(controls);

    const inputChangedHandler = (value: any, id: string) => {
        const updatedControls = updateObject(controls, {
            [id]: updateObject(controls[id], {
                value: value,
                valid: checkValidity(value, controls[id].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    }

    const updateSongInfo = (formElement: any, value: any) => {
        console.log(formElement);

        if (formElement.id === 'songDate') {
            setSongDate(value);
        } else {
            setSongInfo(value);
        }
    }

    const inputs = formElementsArray.map(formElement => {
        return (
            <Input
                label={formElement.config.elementConfig.placeholder}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event: any) => { updateSongInfo(formElement, event.target.value); inputChangedHandler(event.target.value, formElement.id) }}
            />)
    });

    const onSearch = () => {
        props.onSearchSong(songInfo, props.spotifyToken);
    };

    const onSave = () => {
        console.log(songDate);
        props.onSaveSong(pickedSong, songDate, props.authToken);
    };

    const getAuthorizationUrl = () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
        return 'https://accounts.spotify.com/authorize?client_id=' + clientId
            + "&response_type=token&redirect_uri=" + redirect_uri;
    }

    const authentication = props.spotifyToken ?
        null : <a className="button" href={getAuthorizationUrl()}>Get token</a>;

    const pickSong = (song: ISong) => {
        setPickedSong(song);
    }

    let songs = props.songs.length > 0 ?
        <SongDisplay songs={props.songs} pickSong={pickSong} /> : null;
    if (props.loading) {
        songs = <Spinner />
    }

    return (
        <div className="song-pane">
            <h2>Song Pane</h2>
            {inputs}
            {authentication}
            {getFutureSongs(songsOfADay, new Date())}
            <button className="button" onClick={onSearch}>Search</button>
            {songs}
            <button className="save button" onClick={onSave}>Save</button>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        spotifyToken: state.spotify.spotifyToken,
        songs: state.spotify.songsResult,
        authToken: state.auth.token,
        loading: state.spotify.loading,
        fetchedSongs: state.spotify.fetchedSongs
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSearchSong: (song: string, token: string) => dispatch(actions.searchSong(song, token)),
        onSaveSong: (song: ISong, date: Date, token: string) => dispatch(actions.saveSong(song, date, token)),
        onAuthenticate: (token: string, expiresTime: number) => dispatch(actions.spotifyAuth({ token: token, expiresIn: expiresTime })),
        onFetchSongs: () => dispatch(actions.fetchSongs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPane);