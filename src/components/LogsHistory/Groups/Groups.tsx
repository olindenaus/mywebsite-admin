import React from 'react';

import Group from './Group';
import './Groups.scss';

const grouping = (props: any) => {
    const groups = props.groups().reverse().map((group: any) => {
        console.log(group);
        
        return <Group
            key={group.startTime}
            country={group.country}
            start={new Date(group.startTime)}
            end={new Date(group.endTime)}
            logs={group.logs}
        />
    });

    return (
        <div className="groups">
            {groups}
        </div>
    )
};
export default grouping;