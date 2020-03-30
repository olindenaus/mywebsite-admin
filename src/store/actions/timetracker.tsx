import * as actionTypes from './actionTypes';
import { ITask } from '../../containers/Timetracker/Tasks/ITask';
import { firebase } from '../../axios';

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

export const onCheckTasks = () => {
    const tasks = localStorage.getItem("tasks");
    if(tasks!==null) {
        return {
            type: actionTypes.LOAD_TASKS,
            tasks: tasks
        }
    }
    return {
        type: "NONE",
    }
}

const saveTasksStart = () => {
    return {
        type: actionTypes.SAVE_TASKS
    }
}

const saveTasksSuccess = (data: any) => {
    return {
        type: actionTypes.SAVE_TASKS_SUCCESS,
        data: data
    }
}

const saveTasksFail = (error: any) => {
    return {
        type: actionTypes.SAVE_TASKS_FAIL,
        error: error
    }
}

export const saveUserTasks = (tasks: ITask[], token: string) => {
    return (dispatch: any) => {
        dispatch(saveTasksStart());        
        const userId = localStorage.getItem("userId") ? localStorage.getItem("userId") : "guest";

        const date = tasks.length > 0 ? tasks[0].date : new Date();
        const queryParams = `tasks/${userId}/${date}.json?auth=${token}`;
        console.log("queryParams: ", queryParams);
        console.log("userId ", userId);
        
        
        firebase.post(queryParams, { tasks: tasks})
            .then(res => {
                console.log('TIMETRACKER TASK SAVE SUCCESS')
                dispatch(saveTasksSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(saveTasksFail(err.response.data.error));
            })
    }
}