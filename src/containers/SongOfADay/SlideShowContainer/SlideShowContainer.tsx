import React from 'react';

import './SlideShowContainer.scss';
import SongDisplay from '../SongDisplay';

const slideShowContainer = (props: any) => {

    const today = new Date();
    const condition = props.lookForDate.toLocaleDateString("sv-SE") === today.toLocaleDateString("sv-SE");
    const nextButton = condition ? null :
        <button className="next" onClick={() => props.switchSong(1)}>&#10095;</button>;
    const leftThumbnail = <div>Left Thumbnail</div>;
    const rightThumbnail = <div>Right thumnbail</div>;
    return (
        <div className="slideshow-container">
            <div className="my-slides">
                {leftThumbnail}
                <SongDisplay songOfADay={props.todaySong} date={props.lookForDate} />
                {rightThumbnail}
            </div>
                <button className="prev" onClick={() => props.switchSong(-1)}>&#10094;</button>
                {nextButton}
        </div>
    )
};
export default slideShowContainer;