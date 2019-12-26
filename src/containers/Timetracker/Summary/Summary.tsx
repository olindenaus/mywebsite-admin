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

    return (
        <div className="summary">
            <div>No. of tasks: {noOfTasks}</div>
            <div>Hours in total: {Math.floor(totalSpent / 3600)} h</div>
            <div>Most consuming task: #{mostConsuming[0].id+1}</div>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks
    }
}
export default connect(mapStateToProps)(summary);