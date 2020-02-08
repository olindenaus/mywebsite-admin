import React from 'react';

import { ISong } from '../../../../store/reducers/spotify';
import './Songs.scss';

const song = (props: any) => {

    const song: ISong = props.song;

    const getSongDurationDisplayTime = () => {
        const seconds = ~~(song.duration/1000);
        const minutes = ~~(seconds/60);
        const restOfSeconds = seconds % 60;
        const minDisplay = minutes > 9 ? minutes.toString() : '0' + minutes;
        const secDisplay = restOfSeconds > 9 ? restOfSeconds.toString() : '0' + restOfSeconds;
        return minDisplay + ":" + secDisplay;
    }

    return (
        <div className={"song"} onClick={() => props.clicked(props.song)}>
            <p>{song.artist}</p>
            {/* <p>{getSongDurationDisplayTime()}</p> */}
            <img src={song.img.url} width={song.img.width} height={song.img.height}/>
            <p>{song.name}</p>
        </div>
    )
};
export default song;