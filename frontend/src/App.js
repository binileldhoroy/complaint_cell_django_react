import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import UserHome from './pages/user/UserHome'
import UserLogin from './pages/user/UserLogin'
import UserSignUp from './pages/user/UserSignUp';
import UserLanding from './pages/user/UserLanding';
import { AuthProvider } from './context/UserContext';
import { PrivateRoutePeople } from './utils/PrivateRoute';
import PoliceSignUp from './pages/police/PoliceSignUp';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<UserHome/>} />
            <Route path="/signup" element={<UserSignUp/>} />
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/home" element={
              <PrivateRoutePeople>
                <UserLanding/>
              </PrivateRoutePeople>
            } />
          </Routes>
        </AuthProvider>
        <Routes>
        <Route path="/police/signup" element={<PoliceSignUp/>} />
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
