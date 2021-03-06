import Swal from "sweetalert2";
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./ui";
import { cleanNotes } from "./notes";

export const loginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      })
      .finally(() => dispatch(finishLoading()))
  }
}

export const registerEmailPassword = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      })
      .finally(() => dispatch(finishLoading()))
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
})

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(cleanNotes());
  }
}

export const logout = () => ({
  type: types.logout
})