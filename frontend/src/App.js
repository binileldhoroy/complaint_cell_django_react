import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import UserHome from './pages/user/UserHome'
import UserLogin from './pages/user/UserLogin'
import UserSignUp from './pages/user/UserSignUp';
import UserLanding from './pages/user/UserLanding';
import { AuthProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<UserHome/>} />
            <Route path="/signup" element={<UserSignUp/>} />
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/home" element={<UserLanding/>} />
          </Routes>
        </AuthProvider>
        {/* <Routes>
        <Route path="/home" element={<UserLanding/>} />
        </Routes> */}
     </BrowserRouter>
    </div>
  );
}

export default App;
