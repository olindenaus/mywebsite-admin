import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import SongDisplay from './SongDisplay/SongDisplay';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity, mapControlsToFormElements } from '../../../shared/utility';
import Input from '../../../components/UI/Input/Input';
import { ISong } from '../../../store/reducers/spotify';
import './SongPane.scss';

const SongPane = (props: any) => {

    const [songInfo, setSongInfo] = useState<string>("");
    const [songDate, setSongDate] = useState<Date>(new Date());
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
            value: '',
        }
    });

    const extractTokenFromCallback = () => {
        let url = window.location.href;
        if (url.includes("access_token=")) {
            const queryParams = url.split("access_token=")[1].split("&");
            const token = queryParams[0];
            const tokenType = queryParams[1].split("token_type=")[1];
            const expireTime = queryParams[2].split("expires_in=")[1];
            if (token !== '' && token !== props.token ) {
                props.onAuthenticate(token, expireTime);
            }
        }
    }

    useEffect(() => {
        extractTokenFromCallback();
    });

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

    const inputs = formElementsArray.map(formElement => (
        <Input
            label={formElement.config.elementConfig.placeholder}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: any) => { setSongInfo(event.target.value); inputChangedHandler(event.target.value, formElement.id) }}
        />
    ));

    const onSearch = () => {
        props.onSearchSong(songInfo, props.token);        
    };

    const onSave = () => {
        props.onSaveSong(pickedSong, songDate, props.authToken);
    };

    const getAuthorizationUrl = () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
        return 'https://accounts.spotify.com/authorize?client_id=' + clientId
            + "&response_type=token&redirect_uri=" + redirect_uri;
    }

    const authentication = props.token ? 
    <p>Authenticated</p> : <a className="button" href={getAuthorizationUrl()}>Get token</a> ;
    
    const pickSong = (song: ISong) => {
        setPickedSong(song);
    }

    const songs = props.songs ? 
    <SongDisplay songs={props.songs} pickSong={pickSong}/> : null;

    return (
        <div className="song-pane">
            <h1>Song Pane</h1>
            {inputs}
            {authentication}
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
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSearchSong: (song: string, token: string) => dispatch(actions.searchSong(song, token)),
        onSaveSong: (song: ISong, date: Date, token: string) => dispatch(actions.saveSong(song, date, token)),
        onAuthenticate: (token: string, expiresTime: number) => dispatch(actions.spotifyAuth({token: token, expiresIn: expiresTime}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongPane);