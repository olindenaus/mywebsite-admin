import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ChartColumn from './ChartColumn/ChartColumn';
import './Tasks.scss';

const Tasks = (props: any) => {

    const tasks = props.tasks.map((task: any) => {
        const percentage = (task.timeSpent / (props.max*3600) * 100).toFixed(0) + '%';
        return <ChartColumn key={task.id} task={task} height={percentage} />
    });

    return (
        <div className="tasks">
            {tasks}
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks
    }
}

export default connect(mapStateToProps)(Tasks);