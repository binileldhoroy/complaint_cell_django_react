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
import PoliceHome from './pages/police/PoliceHome';
import AdminHome from './pages/admin/AdminHome';
import UserList from './pages/admin/userdetails/UserList';
import LawyerList from './pages/admin/lawyerdetails/LawyerList';
import PoliceList from './pages/admin/policedetails/PoliceList';
import LawyerSignup from './pages/lawyer/LawyerSignup';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <AuthProvider>
        {/* user routes */}
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

        {/* police routes */}
        <Routes>
        <Route path="/police/signup" element={<PoliceSignUp/>} />
        <Route path="/police/home" element={<PoliceHome/>} />
        </Routes>

        {/* Admon routes */}
        <Routes>
        <Route path="/dashboard" element={<AdminHome/>} />
        <Route path="/dashboard/user-list" element={<AdminHome children={<UserList/>}/>} />
        <Route path="/dashboard/lawyer-list" element={<AdminHome children={<LawyerList/>}/>} />
        <Route path="/dashboard/police-list" element={<AdminHome children={<PoliceList/>}/>} />
        </Routes>


        {/* Lawyer routes */}
        <Routes>
        <Route path="/lawyer-signup" element={<LawyerSignup/>} />
        </Routes>

     </BrowserRouter>
    </div>
  );
}

export default App;
