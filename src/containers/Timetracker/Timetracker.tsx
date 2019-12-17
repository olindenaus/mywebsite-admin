import React from 'react';

import Summary from './Summary/Summary';
import Scale from './Scale/Scale';
import ChartColumn from './ChartColumn/ChartColumn';
import TaskManager from './TaskManager/TaskManager';

const timekeeper = (props: any) => {

    return (
        <div>
            <h1>Timetracker</h1>
            <Summary />
            <Scale max={8} min={0} />
            <ChartColumn />
            <TaskManager />
        </div>
    )
};
export default timekeeper;