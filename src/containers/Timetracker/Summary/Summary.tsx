import React from 'react';
import { connect } from 'react-redux';

import { ITask } from '../Tasks/ITask';
import './Summary.scss';

const summary = (props: any) => {

    const noOfTasks = props.tasks.length;
    let totalSpent = 0;

    props.tasks.map((task: ITask) => {
        totalSpent += task.timeSpent;
    });
    
    const time = Math.max.apply(Math, props.tasks.map((task: ITask) => {
        return task.timeSpent;
    }));

    const mostConsuming = props.tasks.filter((task: ITask) => {
        return task.timeSpent === time;
    });

    const mostConsumingId = mostConsuming.length === 0 ? "" : mostConsuming[0].id;

    const getSummaryPoint = (key: string, value: string) => {
        return (
            <div className="point">
                <span>{key}:&nbsp;</span>
                <span>{value}</span>
            </div>
        );
    }

    return (
        <div className="summary">
            {getSummaryPoint("No. of tasks", noOfTasks)}
            {getSummaryPoint("Hours in total", (Math.floor((totalSpent / 3600)*2)/2).toString() + "h")}
            {getSummaryPoint("Most consuming task", mostConsumingId)}
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks
    }
}
export default connect(mapStateToProps)(summary);