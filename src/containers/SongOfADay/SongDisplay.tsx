import React, { useState, useEffect } from 'react';

import './SongDisplay.scss';
import { getSongDurationDisplayTime } from '../../shared/utility';
import picture from '../../img/record-159211_1280.png';


const SongDisplay = (props: any) => {

    const [audio, setAudio] = useState(new Audio());

    useEffect(() => {
        return () => {
            audio.pause();
        }
    })

    const play = (url: string) => {    
        if (url !== undefined) {
            if (!audio.paused) {
                audio.pause();
            } else {
                const aud = new Audio(url);
                setAudio(aud);
                aud.play();
            }
        }
    }

    const emptySongTemplate = () => {
        return (<div className="songOfADay">
            <p>There is no song for:</p>
            <p>{props.date.toLocaleDateString("sv-SE")}</p>
            <p>00:00</p>
            <img src={picture} width={300} height={300} />
            <p>place</p>
            <p>holder</p>
        </div>);
    }

    let displaySong = emptySongTemplate();
    if (props.songOfADay !== undefined) {
        const songDetails = props.songOfADay.song;
        displaySong = <div className="songOfADay" onClick={() => play(props.songOfADay.song.previewUrl)}>
            <p>{props.songOfADay.date}</p>
            <p>{songDetails.artist}</p>
            <p>{getSongDurationDisplayTime(songDetails)}</p>
            <img
                src={songDetails.images.medium.url}
                width={songDetails.images.medium.width}
                height={songDetails.images.medium.height}
            />
            <p>{songDetails.name}</p>
            {songDetails.previewUrl ? null : <p>No preview available</p>}
        </div>
    }

    return (
        <>
            {displaySong}
        </>
    )
};
export default SongDisplay;