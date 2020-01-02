import React, { useState } from 'react';

import './TaskManager.scss';

const TaskManager = (props: any) => {

    return (
        <div className="task-manager">
            <button onClick={props.clicked}>+ Add task</button>
        </div>
    )
};
export default TaskManager;