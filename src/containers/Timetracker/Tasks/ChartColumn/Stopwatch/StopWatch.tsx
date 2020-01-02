import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';

import PlayButton from './PlayButton/PlayButton';

import './StopWatch.scss';

const Stopwatch = (props: any) => {

    const [time, setTime] = useState<number>(props.startTime);
    const [running, setRunning] = useState(false);
    const [intervalRef, setIntervalRef] = useState();
    const [updateIntervalRef, setUpdateIntervalRef] = useState();
    const [displayTime, setDisplayTime] = useState('');

    useEffect(() => {
        updateDisplayTime(time);
    }, [time]);

    const toggleTimer = () => {
        props.clicked(time);
        if (running) {
            setRunning(false);
            stop();
        } else {
            setRunning(true);
            start();
        }
    }

    const stop = () => {
        clearInterval(intervalRef);
        clearInterval(updateIntervalRef);
    }

    const start = () => {
        let x = setInterval(tick, 1);
        let y = setInterval(update, 60);
        setIntervalRef(x);
        setUpdateIntervalRef(y);
    }

    const tick = () => {
        setTime(time => time + 10);
    }

    const update = () => {
        setTime(time => {
            props.onUpdateTask(props.id, time);
            return time;
        })
    }

    const updateDisplayTime = (time: number) => {
        const hours = Math.floor((time / 60 / 60));
        let minutes = Math.floor(time / 60) - (hours *60);
        let displayMin = (minutes % 60).toString();
        let displayH = hours.toString();
        if (minutes < 10) {
            displayMin = '0' + displayMin;
        }
        if (hours < 10) {
            displayH = '0' + displayH;
        }
        setDisplayTime(`${displayH}:${displayMin}`);
    }

    return (
        <div className="stopwatch" style={{backgroundColor: props.color}}>
            <span>{displayTime}</span>
            <PlayButton running={running} clicked={toggleTimer}/>
        </div>
    )
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onUpdateTask: (id: number, time: number) => dispatch(actions.updateTask(id, time))
    }
}

export default connect(null, mapDispatchToProps)(Stopwatch);