import React from 'react';

import { ISong } from '../../../../store/reducers/spotify';
import Song from './Song';
import './SongPicker.scss';

const songDisplay = (props: any) => {
    const songs = props.songs.map((song: ISong) => {
        return <Song key={song.name+song.artist} song={song} clicked={props.pickSong}/>
    })

    return (<div className="song-picker">{songs}</div>)
};
export default songDisplay;