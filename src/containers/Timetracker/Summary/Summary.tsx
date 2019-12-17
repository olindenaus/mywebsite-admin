import React from 'react';

import './Summary.scss';

const summary = (props: any) => {

    return (
        <div className="summary">
            <div>No. of tasks: #</div>
            <div>Hours in total: #h</div>
            <div>Most consuming task: task #3</div>
        </div>
    )
};
export default summary;