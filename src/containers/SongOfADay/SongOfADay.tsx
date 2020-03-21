import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import * as actions from '../../store/actions';
import './SongOfADay.scss';
import SlideShowContainer from './SlideShowContainer/SlideShowContainer';
import Spinner from '../../components/UI/Spinner/Spinner';

const SongOfADay = (props: any) => {

    useEffect(() => {
        props.onFetchSongs();
    }, []);

    const songsOfADay = Object.keys(props.songs).map((id: any) => {
        return props.songs[id];
    });

    const [lookForDate, setLookForDate] = useState(new Date());

    const getSongForADate = (songs: any, date: Date) => {
        if (songs.length > 0) {
            return _.filter(songs, function (song: any) {
                return song.date === date.toLocaleDateString("sv-SE").split(" ")[0];
            })[0];
        }
    }

    const todaySong = getSongForADate(songsOfADay, lookForDate);

    const changeDate = (day: number) => {
        let d = new Date(lookForDate.getTime());
        d.setDate(d.getDate() + day);
        setLookForDate(d);
    }

    const getPreviousDaySong = () => {
        let d = new Date(lookForDate.getTime());
        d.setDate(d.getDate() - 1);
        return getSongForADate(songsOfADay, d);
    }

    const getNextDaySong = () => {
        let d = new Date(lookForDate.getTime());
        d.setDate(d.getDate() + 1);
        return getSongForADate(songsOfADay, d);
    }

    const getNeighbors = () => {
        return [getPreviousDaySong(), getNextDaySong()];
    }

    let content = (<><h1>Song of A Day</h1>
        <h3>{lookForDate.toLocaleDateString("sv-SE")}</h3><div className="song-day">
        <SlideShowContainer lookForDate={lookForDate} todaySong={todaySong} switchSong={changeDate} neighbors={getNeighbors()} />
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