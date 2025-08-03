import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import CreateTrainingPage from './pages/CreateTrainingPage';
import LoginPage from './pages/LoginPage';
import MorePage from './pages/MorePage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
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
          <Route path='*' Component={NotFoundPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
