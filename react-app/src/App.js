import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ListingsDisplay from './components/listings/ListingsDisplay';
import { authenticate } from './store/session';
import { grabReviews } from './store/reviews';
import SingleListing from './components/listings/SIngleListing';
import LisitngForm from './components/listings/ListingsForm';
import { grabListings } from './store/listings';
import SplashPage from './components/needs/SplashPage';
import AboutLinks from './components/needs/AboutLinks';
import TShirtDisplay from './components/listings/single-item-listing/tshirt-page';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(grabReviews());
      await dispatch(grabListings())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/listings' exact={true}>
          <ListingsDisplay />
        </Route>
        <Route path='/listings/tshirt' exact={true}>
          <TShirtDisplay />
        </Route>
        <Route path='/listings/:id' exact={true}>
          <SingleListing />
        </Route>
        <Route path='/sell' exact={true}>
          <LisitngForm />
        </Route>
      </Switch>
      <AboutLinks />
    </BrowserRouter>
  );
}

export default App;
