import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    tasks: [{
        id: 0,
        name: 'Custom' + 1,
        timeSpent: 0,
        displayTime: '00:00:00'
    }]
};

const addTask = (state: any, action: any) => {
    return updateObject(state, {
        tasks: state.tasks.concat(action.task)
    });
}

const updateTask = (state: any, action: any) => {
    let tasks = state.tasks;
    let task = tasks[action.id];
    task.timeSpent = action.time;
    console.log('[UPDATETASK] tasks:', tasks);
    const updated = updateObject(state, {
        tasks: tasks
    });
    console.log('[UPDATETASK] updated:',updated);
    return updated;
}

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_TASK:
            return addTask(state, action);
        case actionTypes.UPDATE_TASK:
            return updateTask(state, action);
        default:
            return state;
    }
}

export default reducer;