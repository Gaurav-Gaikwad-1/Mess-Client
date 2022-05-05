import React from "react";
import SignUp from "./auth/customer/SignUp";
import Login from "./auth/customer/Login";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginM from "./auth/mess/Login";
import SignUpM from "./auth/mess/Signup";
import CustDashboard from "./screens/CustomerDash";
import MessDashboard from "./screens/MessDashboard";
import MessDetails from "./components/MessDetails";
import Error from "./Error.jsx";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from './components/Header';
import EditProfile from "./customer/EditProfile";
import EditMessProf from "./mess/EditProfile";
import SavedMess from "./customer/SavedMess";
import EditMenu from "./mess/EditMenu";
import AddMenu from "./mess/AddMenu";



const token = localStorage.getItem("tokenMess");
const tokenCust = localStorage.getItem("token");
// const refreshToken = localStorage.getItem("refreshToken");
// const CustId = localStorage.getItem("userId");

axios.defaults.baseURL = "http://54.234.185.151:9000/";

export const authAxiosMess = axios.create({
  baseURL: "http://54.234.185.151:9000/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const authAxiosCust = axios.create({
  baseURL: "http://54.234.185.151:9000/",
  headers: {
    Authorization: `Bearer ${tokenCust}`,
  },
});

authAxiosCust.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    // console.log(originalRequest);
    if (error.response.status === 401 && !originalRequest._retry) {
      // console.log("expired");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenMess");
      localStorage.removeItem("userIdMess");
      localStorage.removeItem("refreshToken");
      window.location = "/login/customer";
      // originalRequest._retry = true;
      // axios
      //   .post("api/refresh/customer", {
      //     headers: {
      //       Authorization: `Bearer ${refreshToken}`,
      //     },
      //     body: {
      //       email: "geekdev127001@gmail.com",
      //       userId: CustId,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     console.log("response ouptut")
      // localStorage.setItem("refreshToken", res.data.token.refreshToken);

      // axios.defaults.headers.common["Authorization"] =
      //   "Bearer " + localStorage.getItem("refreshToken");

      // return axios(originalRequest);
      // })
      // .catch((err) => console.log("some error in refresh token"));
    }
  }
);

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
          <Switch>
            <Redirect exact from="/" to="/login/customer" />
            <Route exact path="/" component={Login} />

            {/* Login and Signup Routes */}
            <Route exact path="/signup/customer" component={SignUp} />
            <Route exact path="/login/customer" component={Login} />
            <Route exact path="/login/mess" component={LoginM} />
            <Route exact path="/signup/mess" component={SignUpM} />

            {/* DashBoard Routes */}
            <Route exact path="/customer/dashboard" component={CustDashboard} />
            <Route exact path="/mess/:messId" component={MessDashboard} />
            <Route
              exact
              path="/customer/mess-details/:messId"
              component={MessDetails}
            />

            {/* Mess and customer Settings Routes */}
            <Route exact path="/customer/profile" component={EditProfile} />
            <Route path="/customer/savedmess" component={SavedMess} />
            <Route path="/mess/menus/addmenu" component={AddMenu} />
            <Route path="/mess/profile/edit" component={EditMessProf} />
            <Route
              path="/mess/editmenu/:menuId"
              component={EditMenu}
            />

            {/* Error Route*/}
            <Route component={Error} />
          </Switch>
      <Footer /> 
        </BrowserRouter>
    </>
  );
};

export default App;
