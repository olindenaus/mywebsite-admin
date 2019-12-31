import React from 'react';

import './PlayButton.scss';

const playButton = (props: any) => {

    let style = "button "
    style += props.running ? "pause" : "play";

    return (
        <div className={style} onClick={props.clicked}>
        </div>
    )
};
export default playButton;