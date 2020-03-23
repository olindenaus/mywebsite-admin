import React from 'react';

import './SongThumbnail.scss';
import picture from '../../../../img/record-159211_1280.png';

const SongThumbnail = (props: any) => {

    const hide = props.src ? '' : 'hide';
    
    return (
        <div className={"song-thumbnail " + hide}> 
            <img 
                src={props.src !=='no' ? props.src : picture}
                height={'100%'}
                width={'100%'}
                alt={"song-image"}
            />
        </div>
    )
};

export default SongThumbnail;