import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { ITask } from '../../containers/Timetracker/Tasks/ITask';

interface IState {
    UUID: number,
    tasks: ITask[],
    tick: boolean
}

const initialState: IState = {
    UUID: 1,
    tasks: [],
    tick: false
};

const addTask = (state: any, action: any) => {
    const updated = updateObject(state, {
        tasks: state.tasks.concat(action.task),
        UUID: state.UUID + 1
    });
    localStorage.setItem("tasks", JSON.stringify(updated.tasks));
    return updated;
}

const updateTask = (state: any, action: any) => {
    const updatedTasks = state.tasks.map((task: ITask) => {
        return (task.id !== action.id) ?
            task : {
                ...task,
                timeSpent: action.time
            }
    })
    const updated = updateObject(state, { tasks: updatedTasks })
    localStorage.setItem("tasks", JSON.stringify(updated.tasks));
    return updated;
}

const deleteTask = (state: any, action: any) => {
    const id = action.id;
    let tasks = state.tasks.filter((task: ITask) => {
        return task.id !== id;
    });
    const updated = updateObject(state, {
        tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(updated.tasks));
    return updated;
}

const loadTasks = (state: any, action: any) => {
    const tasks = JSON.parse(action.tasks);
    return updateObject(state, {tasks: tasks})
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_TASK:
            return addTask(state, action);
        case actionTypes.UPDATE_TASK:
            return updateTask(state, action);
        case actionTypes.DELETE_TASK:
            return deleteTask(state, action);
        case actionTypes.LOAD_TASKS:
            return loadTasks(state, action);
        default:
            return state;
    }
}

export default reducer;