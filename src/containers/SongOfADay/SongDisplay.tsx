import React, { useState, useEffect } from 'react';

import './SongDisplay.scss';
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
            <p>There is</p>
            <img src={picture} width={300} height={300} alt={"Song thumbnail"} />
            <p>no song</p>
        </div>);
    }

    let displaySong = emptySongTemplate();
    if (props.songOfADay !== undefined) {
        const songDetails = props.songOfADay.song;
        displaySong = <div className="songOfADay tooltip" onClick={() => play(props.songOfADay.song.previewUrl)}>
            <span className="tooltiptext">{songDetails.previewUrl ? "Click to play preview" : "No preview available"}</span>
            <p>{songDetails.artist}</p>
            <img
                src={songDetails.images.medium.url}
                width={songDetails.images.medium.width}
                height={songDetails.images.medium.height}
                alt={"Song thumnbail"}
            />
            <p>{songDetails.name}</p>
        </div>
    }

    return (
        <>
            {displaySong}
        </>
    )
};
export default SongDisplay;