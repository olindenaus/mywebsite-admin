import React from 'react';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import WorldMapView from './components/WorldMap/WorldMapView';
import Trainings from './components/Trainings/Trainings';
import TimeKeeper from './components/Timekeeper/Timekeeper';
import SongOfADay from './components/SongOfADay/SongOfADay';
import Auth from './auth/Auth';
import './App.css';

// const TimeKeeper = React.lazy(()=> {
//   return import('./components/Timekeeper/Timekeeper');
// });

function App() {

  const routes = (
    <Switch>
      <Route path='/map' component={WorldMapView} />
      <Route path='/trainings' component={Trainings} />
      <Route path='/timekeeper' component={TimeKeeper} />
      <Route path='/song' component={SongOfADay} />
      <Route path='/login' component={Auth} />
      <Route path='/' component={WorldMapView} />
      <Redirect to='/' />
    </Switch>
  );
  return (
    <Layout >
      {routes}
    </Layout>
  );
}

export default withRouter(App);