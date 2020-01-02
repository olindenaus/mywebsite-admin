import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import StopWatch from './Stopwatch/StopWatch';
import './ChartColumn.scss';

const chartColumn = (props: any) => {

    const toggleStopWatch = (time: number) => {
        props.onUpdateTask(props.task.id, time);
    }

    const deleteTask = () => {
        props.onDeleteTask(props.task.id);
    }

    return (
        <div className="column-border" style={{ minHeight: props.height, backgroundColor: props.task.color }}>
            <div className="chart-column" >
                <div className="task-info">
                    <span className={"btnClose tooltip"} onClick={deleteTask}>&times;
                    <span className="tooltiptext">Delete task</span></span>
                    <h4>{props.task.name}, {props.task.id}</h4>
                    {/* <span>Id: {props.task.id}</span> */}
                </div>
                <StopWatch clicked={toggleStopWatch} id={props.task.id} startTime={props.task.timeSpent}/>
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
        onUpdateTask: (id: number, time: number) => dispatch(actions.updateTask(id, time)),
        onDeleteTask: (id: number) => dispatch(actions.deleteTask(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(chartColumn);