import React from 'react';

import LocationLogging from './Location/LocationLogging';
import './AdminPanel.scss';

const AdminPanel = (props: any) => {

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <LocationLogging />
        </div>
    )
};

export default AdminPanel;