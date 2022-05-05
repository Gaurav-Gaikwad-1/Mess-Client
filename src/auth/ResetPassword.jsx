import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  let token = localStorage.getItem("reset_token");
  const resetAxios = axios.create({
    baseURL: "http://54.234.185.151:9000/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let role = window.location.pathname.split("/")[2];
  const [reset, setReset] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setReset((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(reset);
    resetAxios
      .post(`api/forgotpassword/password/${role}`, {
        email: reset.email,
        password: reset.password,
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("reset_token")
        toast.success('Password Reset Successful')
        window.location = `/login/${role}`;
      })
      .catch((err) => {
        console.log(err);
        toast.error("Check your email and password");
      });
  };

  return (
    <>
      <div className="forget_password">
        <h3 className="mb-3">Reset Your Password</h3>
        {/* <h6 className="my-4">Check your registered email for the OTP</h6> */}
        <form autoComplete="on" onSubmit={onSubmit}>
          <div className="forget_pass_reset">
            <div className="d-flex my-2 reset_section">
              <h6 className="ml-5">Email</h6>
              <input
                required
                type="email"
                placeholder="Enter the email id"
                name="email"
                className="py-2"
                onChange={changeHandler}
                value={reset.email}
              />
            </div>
            <div className="d-flex my-3 reset_section">
              <h6 className="ml-5">Password</h6>
              <input
                required
                type="password"
                placeholder="password"
                name="password"
                className="py-2"
                onChange={changeHandler}
                value={reset.password}
              />
            </div>
            <div className="d-flex my-2 reset_section">
              <h6 className="ml-5">Confirm Password</h6>
              <input
                required
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="py-2"
                onChange={changeHandler}
                value={reset.confirmPassword}
              />
            </div>
            <button type="submit" className="my-3 bg-warning py-2">
              RESET
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
