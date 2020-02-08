import React from 'react';

import { getSongDurationDisplayTime } from '../../../../shared/utility';
import { ISong } from '../../../../store/reducers/spotify';
import './Songs.scss';

const song = (props: any) => {

    const song: ISong = props.song;

    return (
        <div className={"song"} onClick={() => props.clicked(props.song)}>
            <p>{song.artist}</p>
            <p>{getSongDurationDisplayTime(props.song)}</p>
            <img src={song.images.small.url} width={song.images.small.width} height={song.images.small.height}/>
            <p>{song.name}</p>
        </div>
    )
};
export default song;