import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import { getSongDurationDisplayTime } from '../../shared/utility';
import './SongOfADay.scss';

const SongOfADay = (props: any) => {

    useEffect(() => {
        props.onFetchSongs();
    }, []);

    const songsOfADay = Object.keys(props.songs).map((id: any) => {
        return props.songs[id];
    });
    let songDisplay = null;
    if (songsOfADay.length > 0) {
        const songOfADay = songsOfADay[0];
        const songDetails = songOfADay.song;
        songDisplay = <div className="songOfADay">
            <p>{songOfADay.date.split("T")[0]}</p>
            <p>{songDetails.artist}</p>
            <p>{getSongDurationDisplayTime(songDetails)}</p>
            <img
                src={songDetails.images.medium.url}
                width={songDetails.images.medium.width}
                height={songDetails.images.medium.height}
            />
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