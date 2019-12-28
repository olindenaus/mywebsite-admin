import * as actionTypes from './actionTypes';
import { ITask } from '../../containers/Timetracker/Tasks/ITask';

export const addTask = (task: ITask) => {
    return {
        type: actionTypes.ADD_TASK,
        task: task
    }
}

export const updateTask = (id: number, time: number) => {
    return {
        type: actionTypes.UPDATE_TASK,
        id: id,
        time
    }
}

export const deleteTask = (id: number) => {
    return {
        type: actionTypes.DELETE_TASK,
        id: id
    }
}

export const updateGrid = () => {
    return {
        type: actionTypes.UPDATE_GRID
    }
}