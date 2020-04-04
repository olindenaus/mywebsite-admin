import React from 'react';

import './ScrollMenu.scss';

const scrollMenu = (props: any) => {

    return (
        <div className="scroll-menu">
            {props.children}
        </div>
    )
};
export default scrollMenu;