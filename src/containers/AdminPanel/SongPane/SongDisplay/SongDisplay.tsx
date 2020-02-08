import React from 'react';

import { ISong } from '../../../../store/reducers/spotify';
import Song from './Song';

const songDisplay = (props: any) => {

    const songs = props.songs.map((song: ISong) => {
        return <Song key={song.name} song={song} clicked={props.pickSong}/>
    })

    return (
        <>
        {songs}
        </>
    )
};
export default songDisplay;