import React, { useState } from 'react';

import LocationPane from './LocationPane/LocationLogging';
import SongPane from './SongPane/SongPane';
import ScrollMenu from '../../components/UI/ScrollMenu/ScrollMenu';
import './AdminPanel.scss';

const AdminPanel = (props: any) => {

    const [displayComponent, setDisplayComponent] = useState(<SongPane />);

    return (
        <div className="admin-panel">
            <ScrollMenu>
                <div onClick={() => setDisplayComponent(<LocationPane />)}>Position pane</div>
                <div onClick={() => setDisplayComponent(<SongPane />)}>Song pane</div>
            </ScrollMenu>
            {displayComponent}
        </div>
    )
};

export default AdminPanel;