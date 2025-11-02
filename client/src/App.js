import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { getProfileThunk } from './store/slices/usersSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import CreateTrainingPage from './pages/CreateTrainingPage';
import LoginPage from './pages/LoginPage';
import MorePage from './pages/MorePage';
import UserProfilePage from './pages/UserProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileThunk());
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/registration' Component={RegistrationPage} />
          <Route path='/create' Component={CreateTrainingPage} />
          <Route path='/login' Component={LoginPage} />
          <Route path='/trainings' Component={MorePage} />
          <Route path='/profile' Component={UserProfilePage} />
          <Route path='/update-profile' Component={UpdateProfilePage} />
          <Route path='*' Component={NotFoundPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
