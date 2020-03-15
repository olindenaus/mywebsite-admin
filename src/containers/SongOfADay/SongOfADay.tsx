import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import * as actions from '../../store/actions';
import './SongOfADay.scss';
import SongDisplay from './SongDisplay';

const SongOfADay = (props: any) => {

    const today = new Date();

    useEffect(() => {
        props.onFetchSongs();
    }, []);

    const songsOfADay = Object.keys(props.songs).map((id: any) => {
        return props.songs[id];
    });
    
    const [lookForDate, setLookForDate] = useState(new Date());
    // const [song, setSong] = useState();

    const getSongForADate = (songs: any, date: Date) => {
        if (songs.length > 0) {
            return _.filter(songs, function (a: any) {
                return a.date == date.toLocaleDateString("sv-SE").split(" ")[0];
            })[0];
        }
    }

    const todaySong = getSongForADate(songsOfADay, lookForDate);

    const changeDate = (day: number) => {
        let d = new Date(lookForDate.getTime());
        d.setDate(d.getDate() + day);
        setLookForDate(d);
    }

    return (
        <>
            <h1>Song of A Day</h1>
            <SongDisplay songOfADay={todaySong} date={lookForDate} />
            <button onClick={() => changeDate(-1)}>Previous</button>
            {lookForDate.toLocaleDateString("sv-SE") === today.toLocaleDateString("sv-SE") ? null : <button onClick={() => changeDate(1)}>Next</button>}
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