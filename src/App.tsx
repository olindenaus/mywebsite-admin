import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import WorldMapView from './containers/WorldMap/WorldMapView';
import Trainings from './containers/Trainings/Trainings';
import TimeKeeper from './containers/Timekeeper/Timekeeper';
import SongOfADay from './containers/SongOfADay/SongOfADay';
import Auth from './auth/Auth';
import AdminPanel from './containers/AdminPanel/AdminPanel';
import LogsHistory from './containers/LogsHistory/LogsHistory'
import './App.css';

// const TimeKeeper = React.lazy(()=> {
//   return import('./components/Timekeeper/Timekeeper');
// });

const App = (props: any) => {

  const adminPanel = props.isAuthenticated ? <Route path="/admin" component={AdminPanel} /> : null;

  const routes = (
    <Switch>
      <Route path='/map' component={WorldMapView} />
      <Route path='/trainings' component={Trainings} />
      <Route path='/timekeeper' component={TimeKeeper} />
      <Route path='/song' component={SongOfADay} />
      <Route path='/login' component={Auth} />
      {/* <Route path='/admin' component={AdminPanel} /> */}
      {adminPanel}
      <Route path='/logs' component={LogsHistory} />
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

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};


export default withRouter(connect(mapStateToProps)(App));