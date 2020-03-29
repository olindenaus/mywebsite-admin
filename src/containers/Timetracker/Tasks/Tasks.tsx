import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ChartColumn from './ChartColumn/ChartColumn';
import * as actions from '../../../store/actions/index';
import './Tasks.scss';

const Tasks = (props: any) => {

    useEffect(() => {
        props.onCheckTasks();
    }, []);

    const tasks = props.tasks.map((task: any) => {
        const percentage = (task.timeSpent / (props.max * 3600) * 100).toFixed(0) + '%';
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        onCheckTasks: () => dispatch(actions.onCheckTasks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);