import React, { useState } from 'react';

import Modal from '../../../components/UI/Modal/Modal';
import Group from './Group/Group';
import GroupDetails from './GroupDetails/GroupDetails';
import './Groups.scss';

const Grouping = (props: any) => {

    const [show, setShow] = useState(false);
    const [groupInfo, setGroupInfo] = useState({
        country: '',
        start: 0,
        end: 1,
        locations: []
    });

    const showModal = (group: any) => {
        setGroupInfo(group);
        setShow(true);
    }

    const closeModal = () => {
        setShow(false);
    }

    const groups = props.groups().reverse().map((group: any) => {
        return <Group
            id={group.startTime}
            key={group.startTime}
            country={group.country}
            start={new Date(group.startTime)}
            end={new Date(group.endTime)}
            logs={group.logs}
            clicked={showModal}
        />
    });

    return (
        <div className="groups">
            {groups}
            <Modal show={show} handleClose={closeModal}>
                <GroupDetails
                    country={groupInfo.country}
                    logs={groupInfo.locations}
                    start={groupInfo.start}
                    end={groupInfo.end}
                />
            </Modal>
        </div>
    )
};
export default Grouping;