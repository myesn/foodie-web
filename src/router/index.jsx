// import { lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import App from '../pages/App';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

import withInfrastructure from '../components/HOC/withInfrastructure';
// import withSuspense from '../components/HOC/withSuspense';

//  const Home = lazy(() => import('../pages/Home'));
// const HomeWithSuspense = withSuspense(withInfrastructure(Home));

const Router = () => {
  return (
    <BrowserRouter>
      <App path='/'>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>

          <Route path='/home' component={withInfrastructure(Home)} />
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route path='/profile' component={withInfrastructure(Profile)} />
          <Route path='*' component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  );
};

export default Router;
