import { combineEpics } from 'redux-observable';
// import { signupEpic } from './signupEpic'
import { loginEpic } from './loginEpic'

export default combineEpics(
  // signupEpic,
  loginEpic
);
