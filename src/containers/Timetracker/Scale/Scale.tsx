import React from 'react';

import './Scale.scss';

const scale = (props: any) => {
    const max = props.max;
    const min = props.min;

    return (
        <div className="scale">
            Max: {max}
            <br />
            Min: {min}
            <br />
            Scale
        </div>
    )
};
export default scale;