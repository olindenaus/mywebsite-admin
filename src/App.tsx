import React, { lazy, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Layout from './components/UI/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';
import './App.scss';

const Auth = lazy(() => { return import('./auth/Auth'); });
const AdminPanel = lazy(() => { return import('./containers/AdminPanel/AdminPanel'); });

const App = (props: any) => {

  const adminPanel = props.isAuthenticated ? <Route path="/admin" component={AdminPanel} /> : null;

  useEffect(() => {
    props.onTryAutoSignup()
  }, []);

  const routes = (
    <Switch>
      <Route path='/login' component={Auth} />
      {adminPanel}
      <Redirect to='/' />
    </Switch>
  );
  return (
    <Layout>
      <React.Suspense fallback={<Spinner />}>
        {routes}
      </React.Suspense>
    </Layout>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));