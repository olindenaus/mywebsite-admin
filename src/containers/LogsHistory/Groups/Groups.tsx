import React, { useState } from 'react';

import Modal from '../../../components/UI/Modal/Modal';
import Group from './Group/Group';
import GroupDetails from './GroupDetails/GroupDetails';
import './Groups.scss';
import { tGroup } from '../LogsHistory';

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

    let groups = props.groups();

    const assignEndTimeToGroups = (groups: tGroup[]) => {
        for (let i = 0; i < groups.length; i++) {
            if (i !== groups.length - 1) {
                groups[i].endTime = groups[i + 1].startTime;
            }
        }
    }
    
    assignEndTimeToGroups(groups);
    const groupElements = groups.reverse().map((group: any) => {
        return <Group
            id={group.startTime}
            key={group.startTime}
            country={group.country}
            start={group.startTime}
            end={group.endTime}
            logs={group.logs}
            clicked={showModal}
        />
    });


    return (
        <div className="groups">
            {groupElements}
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