import React from 'react';

import StopWatch from '../Stopwatch/StopWatch';
import './ChartColumn.scss';

const chartColumn = (props: any) => {

    return (
        <div className="chart-column">
            <StopWatch />
        </div>
    )
};
export default chartColumn;