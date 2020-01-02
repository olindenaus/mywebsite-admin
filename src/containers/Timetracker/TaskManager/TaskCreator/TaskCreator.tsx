import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { ITask } from '../../Tasks/ITask';
import './TaskCreator.scss';

const TaskCreator = (props: any) => {
    const [taskName, setTaskName] = useState('');
    const [timeSpent, setTimeSpent] = useState(0);
    const [color, setColor] = useState('#cccccc');

    const addTask = () => {
        const UUID = props.UID;
        const newTask = {
            id: UUID,
            name: taskName,
            timeSpent: timeSpent * 60,
            color: color
        };
        props.onAddTask(newTask);
        props.handleClose();
    }

    return (
        <div className="task-creator">
            <h3>Create task</h3>
            <div className="form">
                <label>Task name:</label>
                <input type="text" onChange={(e: any) => setTaskName(e.target.value)}></input>
                <label>Already spent time (minutes):</label>
                <input type="number" onChange={(e: any) => setTimeSpent(e.target.value)}></input>
                <label>Color:</label>
                <input type="color" value={color} onChange={(e: any) => setColor(e.target.value)}></input>
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