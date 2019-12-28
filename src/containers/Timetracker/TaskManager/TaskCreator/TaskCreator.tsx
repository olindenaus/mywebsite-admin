import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { ITask } from '../../Tasks/ITask';
import './TaskCreator.scss';

const TaskCreator = (props: any) => {
    const [taskName, setTaskName] = useState('');
    const [timeSpent, setTimeSpent] = useState(0);

    const addTask = () => {
        const UUID = props.UID;
        const newTask = {
            id: UUID,
            name: taskName,
            timeSpent: timeSpent*60,
            displayTime: '00:00:00'
        };
        props.onAddTask(newTask);
        props.handleClose();
    }

    return (
        <div className="task-creator">
            <p>Quelqe chose</p>
            <div className="form">
                <label>Task name:</label>
                <input type="text" onChange={(e: any) => setTaskName(e.target.value)}></input>
                <label>Already spent time (minutes):</label>
                <input type="number" onChange={(e: any) => setTimeSpent(e.target.value)}></input>
                <button onClick={addTask}>Create</button>
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks,
        UID: state.timetracker.UUID,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddTask: (task: ITask) => dispatch(actions.addTask(task)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskCreator);