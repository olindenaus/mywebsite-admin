import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import TaskCreator from './TaskManager/TaskCreator/TaskCreator';
import Summary from './Summary/Summary';
import Scale from './Scale/Scale';
import TaskManager from './TaskManager/TaskManager';
import Tasks from './Tasks/Tasks';
import './Timetracker.scss';

const Timekeeper = (props: any) => {

    const [showModal, setShowModal] = useState(false);
    const [max, setMax] = useState(8);    
    const [half, setHalf] = useState(max/2);
    const min = 0;

    const modal = showModal ?
        <Modal
            handleClose={() => setShowModal(false)}
            show={showModal}
        ><TaskCreator handleClose={() => setShowModal(false)}/>
        </Modal> : null;

    return (
        <div className="timetracker">
            <h1>Timetracker</h1>
            {modal}
            <Scale max={max} half={half} min={min}>
                <Tasks max={max} />
                <Summary />
                <TaskManager clicked={() => setShowModal(true)}/>
            </Scale>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks
    }
}

export default connect(mapStateToProps)(Timekeeper);