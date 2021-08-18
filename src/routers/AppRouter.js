import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { useState } from 'react';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadingNotes(user.uid));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    return (
      <h1>Await...</h1>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes
            path="/auth"
            component={AuthRouter}
            isAuth={isLoggedIn}
          />
          <PrivateRoutes
            exact
            path="/"
            component={JournalScreen}
            isAuth={isLoggedIn}
          />
          <Redirect
            to="/auth/login"
          />
        </Switch>
      </div>
    </Router>
  )
}
