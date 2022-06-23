import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignUp";
import UserLanding from "./pages/user/UserLanding";
import { AuthProvider } from "./context/UserContext";
import {
  PrivateRouteAdmin,
  PrivateRoutePeople,
  PrivateRoutePolice,
} from "./utils/PrivateRoute";
import PoliceHome from "./pages/police/PoliceHome";
import AdminHome from "./pages/admin/AdminHome";
import UserList from "./pages/admin/userdetails/UserList";
import LawyerList from "./pages/admin/lawyerdetails/LawyerList";
import PoliceList from "./pages/admin/policedetails/PoliceList";
import LawyerSignup from "./pages/lawyer/signup/LawyerSignup";
import { LoginProvider } from "./context/LoginContext";
import LawyerHome from "./pages/lawyer/home/LawyerHome";
import { PoliceProvider } from "./context/PoliceContext";
import { LawyerProvider } from "./context/LawyerContext";
import { AdminProvider } from "./context/AdminContext";
import PoliceSignUpAdmin from "./pages/admin/policedetails/PoliceSignUpAdmin";
import ActiveLawyers from "./pages/admin/lawyerdetails/ActiveLawyers";
import UserProfile from "./pages/user/userprofile/UserProfile";
import NewComplaints from "./pages/police/NewComplaints";
import ViewComplaint from "./pages/police/ViewComplaint";
import AcceptedComplaints from "./pages/police/AcceptedComplaints";
import ViewAcceptedComplaint from "./pages/police/ViewAcceptedComplaint";
import CompletedComplaints from "./pages/police/CompletedComplaints";
import MyComplaints from "./pages/user/complaint/MyComplaints";
import RegisterComplaint from "./pages/user/complaint/RegisterComplaint";
import AcceptedCases from "./pages/user/acceptedcase/AcceptedCases";
import UserViewComplaint from "./pages/user/viewcomplaint/UserViewComplaint";
import ViewLawyers from "./pages/user/lawyerlist/ViewLawyers";
import LawyerProfile from "./pages/user/lawyerprofile/LawyerProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoginProvider>
          {/* user routes */}
          <AuthProvider>
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/signup" element={<UserSignUp />} />
              <Route path="/login" element={<UserLogin />} />
              <Route
                path="/home"
                element={
                  <PrivateRoutePeople>
                    <UserLanding />
                  </PrivateRoutePeople>
                }
              />

              <Route
                path="/myprofile"
                element={
                  <PrivateRoutePeople>
                    <UserProfile />
                  </PrivateRoutePeople>
                }
              />
              <Route
                path="/mycomplaints"
                element={
                  <PrivateRoutePeople>
                    <MyComplaints />
                  </PrivateRoutePeople>
                }
              />

              <Route
                path="/register"
                element={
                  <PrivateRoutePeople>
                    <RegisterComplaint />
                  </PrivateRoutePeople>
                }
              />

              <Route
                path="/completed"
                element={
                  <PrivateRoutePeople>
                    <AcceptedCases />
                  </PrivateRoutePeople>
                }
              />

              <Route
                path="/completed/:id"
                element={
                  <PrivateRoutePeople>
                    <UserViewComplaint />
                  </PrivateRoutePeople>
                }
              />

              <Route
                path="/lawyers"
                element={
                  <PrivateRoutePeople>
                    <ViewLawyers />
                  </PrivateRoutePeople>
                }
              />

              <Route
                path="/lawyerprofile/:id"
                element={
                  <PrivateRoutePeople>
                    <LawyerProfile/>
                  </PrivateRoutePeople>
                }
              />
            </Routes>
          </AuthProvider>

          {/* police routes */}
          <PoliceProvider>
            <Routes>
              <Route
                path="/police/home"
                element={
                  <PrivateRoutePolice>
                    <PoliceHome />
                  </PrivateRoutePolice>
                }
              />
              <Route
                path="/police/newcomplaints"
                element={
                  <PrivateRoutePolice>
                    <NewComplaints />
                  </PrivateRoutePolice>
                }
              />
              <Route
                path="/police/viewcomplaint/:id"
                element={
                  <PrivateRoutePolice>
                    <ViewComplaint />
                  </PrivateRoutePolice>
                }
              />
              <Route
                path="/police/accepted"
                element={
                  <PrivateRoutePolice>
                    <AcceptedComplaints />
                  </PrivateRoutePolice>
                }
              />

              <Route
                path="/police/viewaccepted/:id"
                element={
                  <PrivateRoutePolice>
                    <ViewAcceptedComplaint />
                  </PrivateRoutePolice>
                }
              />
              <Route
                path="/police/completed"
                element={
                  <PrivateRoutePolice>
                    <CompletedComplaints />
                  </PrivateRoutePolice>
                }
              />
            </Routes>
          </PoliceProvider>

          {/* Admin routes */}
          <AdminProvider>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <PrivateRouteAdmin>
                    <AdminHome />
                  </PrivateRouteAdmin>
                }
              />
              <Route
                path="/dashboard/user-list"
                element={
                  <PrivateRouteAdmin>
                    <AdminHome children={<UserList />} />
                  </PrivateRouteAdmin>
                }
              />
              <Route
                path="/dashboard/lawyer-list"
                element={
                  <PrivateRouteAdmin>
                    <AdminHome children={<LawyerList />} />
                  </PrivateRouteAdmin>
                }
              />
              <Route
                path="/dashboard/active-lawyers"
                element={
                  <PrivateRouteAdmin>
                    <AdminHome children={<ActiveLawyers />} />
                  </PrivateRouteAdmin>
                }
              />
              <Route
                path="/dashboard/police-list"
                element={
                  <PrivateRouteAdmin>
                    <AdminHome children={<PoliceList />} />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                path="/dashboard/police-signup"
                element={
                  <PrivateRouteAdmin>
                    <AdminHome children={<PoliceSignUpAdmin />} />
                  </PrivateRouteAdmin>
                }
              />
            </Routes>
          </AdminProvider>

          {/* Lawyer routes */}
          <LawyerProvider>
            <Routes>
              <Route path="/lawyer/signup" element={<LawyerSignup />} />
              <Route path="/lawyer/lawyer-home" element={<LawyerHome />} />
            </Routes>
          </LawyerProvider>
        </LoginProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
