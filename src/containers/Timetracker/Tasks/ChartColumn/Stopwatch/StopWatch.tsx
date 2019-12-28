import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';

import './StopWatch.scss';

const Stopwatch = (props: any) => {

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [intervalRef, setIntervalRef] = useState();
    const [updateIntervalRef, setUpdateIntervalRef] = useState();
    const [displayTime, setDisplayTime] = useState('00:00:00');

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
        setTime(time => time + 1);
    }

    const update = () => {
        setTime(time => {
            props.onUpdateTask(props.id, time);
            return time;
        })
    }

    const updateDisplayTime = (time: number) => {
        const seconds = (time % 60);
        let minutes = ((time - seconds) / 60);
        const hours = Math.floor((minutes / 60));
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

    const label = running ? "STOP" : "START";

    return (
        <div className="stopwatch" onClick={toggleTimer}>
            <p>{label}</p>
            {displayTime}
        </div>
    )
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onUpdateTask: (id: number, time: number) => dispatch(actions.updateTask(id, time))
    }
}

export default connect(null, mapDispatchToProps)(Stopwatch);