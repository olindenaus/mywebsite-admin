import React from 'react';

import { ISong } from '../../../../store/reducers/spotify';
import Song from './Song';
import './SongPicker.scss';

const songDisplay = (props: any) => {
    const pickedSong: ISong = props.picked;
    const songs = props.songs.map((song: ISong) => {
        let classname = '';
        if (pickedSong && (pickedSong.name + pickedSong.artist === song.name + song.artist)) {
            classname = 'selected';
        }
        return <Song key={song.name + song.artist} selected={classname} song={song} clicked={props.pickSong} />
    })

    return (<div className="song-picker">{songs}</div>)
};
export default songDisplay;