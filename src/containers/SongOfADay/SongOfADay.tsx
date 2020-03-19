import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import * as actions from '../../store/actions';
import './SongOfADay.scss';
import SongDisplay from './SongDisplay';
import SlideShowContainer from './SlideShowContainer/SlideShowContainer';
import Spinner from '../../components/UI/Spinner/Spinner';

const SongOfADay = (props: any) => {

    const today = new Date();

    useEffect(() => {
        props.onFetchSongs();
    }, []);

    const songsOfADay = Object.keys(props.songs).map((id: any) => {
        return props.songs[id];
    });

    const [lookForDate, setLookForDate] = useState(new Date());

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

    let content = (<><h1>Song of A Day</h1><div className="song-day">
        <SlideShowContainer lookForDate={lookForDate} todaySong={todaySong} switchSong={changeDate} />
    </div></>);

    if (props.loading) {
        content = <><Spinner /></>
    }

    return (<>{content}</>);
}

const mapStateToProps = (state: any) => {
    return {
        songs: state.spotify.fetchedSongs,
        loading: state.spotify.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchSongs: () => dispatch(actions.fetchSongs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongOfADay);