import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LogsHistory } from './LogsHistory';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<LogsHistory />', () => {
    let logsHistory;

    beforeEach(() => {
        logsHistory = shallow(<LogsHistory />);
    });

    it('should display error message when occurs', () => {
        logsHistory.setProps({ error: 'Test message' });
        expect(logsHistory.contains(<p>Test message</p>)).toEqual(true);
    });

    it('should display spinner when loading', () => {
        logsHistory.setProps({ loading: true });
        expect(logsHistory.find(Spinner)).toHaveLength(1);
    });
})