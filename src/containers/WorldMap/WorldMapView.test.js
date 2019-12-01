import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WorldMapView } from './WorldMapView';
import Spinner from '../../components/UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<WorldMapView />', () => {
    let worldMapView;

    beforeEach(() => {
        worldMapView = shallow(<WorldMapView />);
    });

    it('should display error message when occurs', () => {
        worldMapView.setProps({ error: 'Test message' });
        expect(worldMapView.contains(<p>Test message</p>)).toEqual(true);
    });

    it('should display spinner when loading', () => {
        worldMapView.setProps({ loading: true });
        expect(worldMapView.find(Spinner)).toHaveLength(1);
    });
})