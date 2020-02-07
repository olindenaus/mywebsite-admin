import React from 'react';

import LocationPane from './LocationPane/LocationLogging';
import SongPane from './SongPane/SongPane';
import './AdminPanel.scss';

const AdminPanel = (props: any) => {

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div className="panel-container">
                <LocationPane />
                <SongPane />
            </div>
        </div>
    )
};

export default AdminPanel;