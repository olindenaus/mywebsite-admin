import React, { lazy } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from './components/UI/Layout/Layout';
import WorldMapView from './containers/WorldMap/WorldMapView';
import Spinner from './components/UI/Spinner/Spinner';
import './App.css';

const Trainings = lazy(() => { return import('./containers/Trainings/Trainings') });
const TimeKeeper = lazy(() => { return import('./containers/Timekeeper/Timekeeper'); });
const Auth = lazy(() => { return import('./auth/Auth'); });
const AdminPanel = lazy(() => { return import('./containers/AdminPanel/AdminPanel'); });
const LogsHistory = lazy(() => { return import('./containers/LogsHistory/LogsHistory'); });
const SongOfADay = lazy(() => { return import('./containers/SongOfADay/SongOfADay'); });

const App = (props: any) => {

  const adminPanel = props.isAuthenticated ? <Route path="/admin" component={AdminPanel} /> : null;

  const routes = (
    <Switch>
      <Route path='/map' component={WorldMapView} />
      <Route path='/trainings' component={Trainings} />
      <Route path='/timekeeper' component={TimeKeeper} />
      <Route path='/song' component={SongOfADay} />
      <Route path='/login' component={Auth} />
      {adminPanel}
      <Route path='/logs' component={LogsHistory} />
      <Route path='/' component={WorldMapView} />
      <Redirect to='/' />
    </Switch>
  );
  return (
    <Layout >
      <React.Suspense fallback={<Spinner />}>
        {routes}
      </React.Suspense >
    </Layout>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};


export default withRouter(connect(mapStateToProps)(App));