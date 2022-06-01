import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import UserHome from './pages/user/UserHome'
import UserLogin from './pages/user/UserLogin'
import UserSignUp from './pages/user/UserSignUp';
import UserLanding from './pages/user/UserLanding';
import { AuthProvider } from './context/UserContext';
import { PrivateRoutePeople } from './utils/PrivateRoute';
import PoliceHome from './pages/police/PoliceHome';
import AdminHome from './pages/admin/AdminHome';
import UserList from './pages/admin/userdetails/UserList';
import LawyerList from './pages/admin/lawyerdetails/LawyerList';
import PoliceList from './pages/admin/policedetails/PoliceList';
import LawyerSignup from './pages/lawyer/signup/LawyerSignup';
import { LoginProvider } from './context/LoginContext';
import LawyerHome from './pages/lawyer/home/LawyerHome';
import { PoliceProvider } from './context/PoliceContext';
import { LawyerProvider } from './context/LawyerContext';
import { AdminProvider } from './context/AdminContext';
import PoliceSignUpAdmin from './pages/admin/policedetails/PoliceSignUpAdmin';
import ActiveLawyers from './pages/admin/lawyerdetails/ActiveLawyers';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <LoginProvider>
        {/* user routes */}
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

        {/* police routes */}
        <PoliceProvider>
        <Routes>
        <Route path="/police/home" element={
          <PrivateRoutePeople>
                <PoliceHome/>
              </PrivateRoutePeople>
        } />
        </Routes>
        </PoliceProvider>

        {/* Admon routes */}
        <AdminProvider>
        <Routes>
        <Route path="/dashboard" element={
          <PrivateRoutePeople>
            <AdminHome/>
          </PrivateRoutePeople>
        } />
        <Route path="/dashboard/user-list" element={
          <PrivateRoutePeople>
            <AdminHome children={<UserList/>}/>
          </PrivateRoutePeople>
        } />
        <Route path="/dashboard/lawyer-list" element={
          <PrivateRoutePeople>
             <AdminHome children={<LawyerList/>}/>
          </PrivateRoutePeople>
        } />
        <Route path="/dashboard/active-lawyers" element={
          <PrivateRoutePeople>
             <AdminHome children={<ActiveLawyers/>}/>
          </PrivateRoutePeople>
        } />
        <Route path="/dashboard/police-list" element={
          <PrivateRoutePeople>
            <AdminHome children={<PoliceList/>}/>
            </PrivateRoutePeople>
        } />

        <Route path="/dashboard/police-signup" element={
          <PrivateRoutePeople>
            <AdminHome children={<PoliceSignUpAdmin/>}/>
            </PrivateRoutePeople>
        } />
        </Routes>
        </AdminProvider>


        {/* Lawyer routes */}
        <LawyerProvider>
        <Routes>
        <Route path="/lawyer/signup" element={<LawyerSignup/>} />
        <Route path="/lawyer/lawyer-home" element={<LawyerHome/>} />
        </Routes>
        </LawyerProvider>

      </LoginProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
