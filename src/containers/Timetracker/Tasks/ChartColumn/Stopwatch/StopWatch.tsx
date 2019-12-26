import React, { useState, useEffect } from 'react';

import './StopWatch.scss';

const Stopwatch = (props: any) => {

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [intervalRef, setIntervalRef] = useState();
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
    }

    const start = () => {
        let x = setInterval(tick, 1000);
        setIntervalRef(x);
    }

    const tick = () => {
        setTime(time => time + 1);
    }

    const updateDisplayTime = (time: number) => {
        const seconds = (time % 60);
        let minutes = ((time - seconds) / 60);
        const hours = Math.floor((minutes / 60));
        let displaySec = seconds.toString();
        let displayMin = (minutes % 60).toString();
        let displayH = hours.toString();
        if (seconds < 10) {
            displaySec = '0' + displaySec;
        }
        if (minutes < 10) {
            displayMin = '0' + displayMin;
        }
        if (hours < 10) {
            displayH = '0' + displayH;
        }
        setDisplayTime(`${displayH}:${displayMin}:${displaySec}`);
    }

    const label = running ? "STOP" : "START";

    return (
        <div className="stopwatch" onClick={toggleTimer}>
            <p>{label}</p>
            {displayTime}
        </div>
    )
};
export default Stopwatch;