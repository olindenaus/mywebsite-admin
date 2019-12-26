import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import StopWatch from './Stopwatch/StopWatch';
import './ChartColumn.scss';

const chartColumn = (props: any) => {

    const toggleStopWatch = (time: number) => {
        props.onUpdateTask(props.task.id, time);
    }

    return (
        <div className="column-border">
        <p>{props.task.name}, {props.task.timeSpent}</p>
            <div className="chart-column" style={{ minHeight: props.height }}>
                <p>{props.task.displayTime}</p>
                <StopWatch clicked={toggleStopWatch} />
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onUpdateTask: (id: number, time: number) => dispatch(actions.updateTask(id, time))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(chartColumn);