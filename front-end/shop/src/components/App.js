import { useEffect } from 'react';
import jwt from "jwt-decode"
import { useDispatch } from 'react-redux';
import { setUser } from '../store/common/common-reducers/auth-reducer';
import { refreshAction } from '../store/common/common-actions/auth-action';

import '../styles/App.css';
import AppRouter from './App-router';

function App() {
  const dispatch = useDispatch()
  // Якщо токен в локальному сховищі прострочений, звертаемось до серверу за новим.
  useEffect(()=>{
      const token = localStorage.getItem('token')
      if(token) {
          const user = jwt(token)
          const currentTime = new Date()
          Number(user.exp) <= Number(currentTime) ?
            dispatch(setUser(user))
              :
            dispatch(refreshAction(token))
      }
  }, [])

  return (
    <AppRouter/>
  );
}

export default App;
