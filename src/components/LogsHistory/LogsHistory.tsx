import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

const LogsHistory = (props: any) => {

    useEffect(() => {
        props.onFetchLocationLogs();
    }, []);

    return (
        <div>
            Logs History
        </div>
    )
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchLocationLogs: () => dispatch(actions.fetchLocations())
    };
}

export default connect(null, mapDispatchToProps)(LogsHistory);