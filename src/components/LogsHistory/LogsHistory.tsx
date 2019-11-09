import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Groups from './Groups/Groups';
import './LogsHistory.scss';

type tGroup = { country: string | any, logs: any[], startTime: number, endTime: number };
type tLocation = { country: string, timestamp: number, latitude: number, longitude: number };

const LogsHistory = (props: any) => {

    useEffect(() => {
        props.onFetchLocationLogs();
    }, []);

    const countries = [...new Set(Object.keys(props.locations).map((id: any) => props.locations[id].country))];

    const groupByCountriesAndDate = () => {
        const locations = Object.keys(props.locations).map((id: any) => {
            return props.locations[id];
        });
        let currentCountry = '';
        let currentGroup: tGroup = {
            startTime: 0,
            endTime: 0,
            country: '',
            logs: []
        };
        let groups: tGroup[] = [];
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];
            const country = location.country;
            if (country !== currentCountry) {
                if (currentCountry === '') {
                    addNewGroup(groups);
                } else {                    
                    addNewGroup(groups);
                }
                currentCountry = country;
                currentGroup = groups[groups.length - 1];
                currentGroup.startTime = location.timestamp;
                currentGroup.endTime = location.timestamp;
                currentGroup.country = location.country;
                currentGroup.logs.push(location);
            } else {
                currentGroup.logs.push(location);
                currentGroup.endTime = location.timestamp;
            }
        }
        return groups;
    };

    const addNewGroup = (groups: tGroup[]) => {
        groups.push({
            startTime: 0,
            endTime: 0,
            country: '',
            logs: []
        });
    }

    return (
        <div className={"locations-history"}>
            <div className={"logs-container"}>
                <Groups
                    groups={groupByCountriesAndDate}
                />
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        locations: state.logs.locations
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onFetchLocationLogs: () => dispatch(actions.fetchLocations())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogsHistory);