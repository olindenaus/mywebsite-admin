import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { ITask } from '../../containers/Timetracker/Tasks/ITask';

const initialState = {
    UUID: 1,
    tasks: [{
        id: 0,
        name: 'Custom' + 1,
        timeSpent: 0,
    }],
    tick: false
};

const addTask = (state: any, action: any) => {
    return updateObject(state, {
        tasks: state.tasks.concat(action.task),
        UUID: state.UUID + 1
    });
}

const updateTask = (state: any, action: any) => {    
    return updateObject(state, {
        tasks: state.tasks.map((task: ITask) => {  
            return (task.id !== action.id) ?
                task : {
                    ...task,
                    timeSpent: action.time
                }
        })
    })
}

const deleteTask = (state: any, action: any) => {
    const id = action.id;
    let tasks = state.tasks.filter((task: ITask) => {
        return task.id !== id;
    });
    const updated = updateObject(state, {
        tasks: tasks
    });
    return updated;
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_TASK:
            return addTask(state, action);
        case actionTypes.UPDATE_TASK:
            return updateTask(state, action);
        case actionTypes.DELETE_TASK:
            return deleteTask(state, action);
        default:
            return state;
    }
}

export default reducer;