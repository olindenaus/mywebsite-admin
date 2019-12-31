import React from 'react';
import { connect } from 'react-redux';

import './Scale.scss';

const scale = (props: any) => {

    const max = props.max;
    const min = props.min;

    return (
        <div className="scale">
            <div className="fourth row top-text"><span>{max}h</span></div>
            <div className="third row"><span></span></div>
            <div className="second row top-text"><span>{max / 2}h</span></div>
            <div className="first row bot-text"><span>{min}h</span></div>
            {props.children}
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        tasks: state.timetracker.tasks
    }
}
export default connect(mapStateToProps)(scale);