import React from 'react';

import { getSongDurationDisplayTime } from '../../../../shared/utility';
import { ISong } from '../../../../store/reducers/spotify';
import './Song.scss';

const song = (props: any) => {

    const song: ISong = props.song;

    return (
        <div className={"song tooltip"} onClick={() => props.clicked(props.song)}>
            <p>{song.artist}</p>
            <span className="tooltiptext">{getSongDurationDisplayTime(props.song)}</span>
            <img src={song.images.small.url} width={song.images.small.width} height={song.images.small.height}>
            </img>
            <p>{song.name}</p>
        </div>
    )
};
export default song;