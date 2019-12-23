import React from 'react';

import Summary from './Summary/Summary';
import Scale from './Scale/Scale';
import ChartColumn from './ChartColumn/ChartColumn';
import TaskManager from './TaskManager/TaskManager';
import './Timetracker.scss';

const timekeeper = (props: any) => {

    return (
        <div className="timetracker">
            <h1>Timetracker</h1>
            <Scale max={8} half={4} min={0}>
                <ChartColumn />
                <Summary />
                <TaskManager />
            </Scale>
        </div>
    )
};
export default timekeeper;