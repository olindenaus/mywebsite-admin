import React from 'react';

import './SlideShowContainer.scss';
import SongDisplay from './SongDisplay/SongDisplay';
import SongThumbnail from './SongThumbnail/SongThumbnail';
import { ISong } from '../../../store/reducers/spotify';

const slideShowContainer = (props: any) => {

    const today = new Date();
    const condition = props.lookForDate.toLocaleDateString("sv-SE") === today.toLocaleDateString("sv-SE");
    const nextButton = condition ? null :
        <button className="next" onClick={() => props.switchSong(1)}>&#10095;</button>;
        
    const previous:ISong = props.neighbors[0] ? props.neighbors[0].song : null;
    const next:ISong = props.neighbors[1] ? props.neighbors[1].song : null;
    const previousSrc = previous ? previous.images.medium.url : 'no'
    const nextSrc = condition ? '' : next ? next.images.medium.url : 'no';
    return (
        <div className="slideshow-container">
            <div className="my-slides">
                <SongThumbnail src={previousSrc}/>
                <SongDisplay songOfADay={props.todaySong} date={props.lookForDate} />
                <SongThumbnail src={nextSrc}/>
            </div>
            <button className="prev" onClick={() => props.switchSong(-1)}>&#10094;</button>
            {nextButton}
        </div>
    )
};
export default slideShowContainer;