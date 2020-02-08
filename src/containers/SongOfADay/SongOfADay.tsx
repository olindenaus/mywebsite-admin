import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import * as actions from '../../store/actions';
import { getSongDurationDisplayTime } from '../../shared/utility';
import './SongOfADay.scss';

const SongOfADay = (props: any) => {

    const [audio, setAudio] = useState();
    useEffect(() => {
        props.onFetchSongs();
    }, []);

    const songsOfADay = Object.keys(props.songs).map((id: any) => {
        return props.songs[id];
    });

    const getTodaysSong = (songs: any) => {
        return _.filter(songs, function (a: any) {
            return a.date == (new Date()).toLocaleDateString("sv-SE").split(" ")[0];
        })[0];
    }

    const play = (url: string) => {
        if (url !== undefined) {
            if (audio && !audio.paused) {
                audio.pause();
            } else {
                const aud = new Audio(url);
                setAudio(aud);
                aud.play();
            }
        }
    }

    let songDisplay = null;
    if (songsOfADay.length > 0) {
        const songOfADay = getTodaysSong(songsOfADay);
        const songDetails = songOfADay.song;
        songDisplay = <div className="songOfADay" onClick={() => play(songDetails.previewUrl)}>
            <p>{songOfADay.date}</p>
            <p>{songDetails.artist}</p>
            <p>{getSongDurationDisplayTime(songDetails)}</p>
            <img
                src={songDetails.images.medium.url}
                width={songDetails.images.medium.width}
                height={songDetails.images.medium.height}
            />
            {/* <audio id="myAudio" controls>
              <source src={songDetails.previewUrl} type="audio/mpeg" />
            </audio> */}
            <p>{songDetails.name}</p>
        </div>;
    }
    return (
        <>
            <h1>Song of A Day</h1>
            {songDisplay}
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        songs: state.spotify.fetchedSongs
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchSongs: () => dispatch(actions.fetchSongs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongOfADay);