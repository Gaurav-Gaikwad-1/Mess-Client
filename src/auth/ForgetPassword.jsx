import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = ({modal_action}) => {
  const [email, setEmail] = useState("");
  let role = window.location.pathname.split('/')[2];
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("email :" + email);
    // modal_action(false);
    axios.post("api/forgotpassword/otp", {
      "role": role,
      "email": email,
    })
    .then(res=>{
        console.log(res);
        modal_action(false);
    })
    .catch(err => {
      console.log(err);
      toast.error("Your email id is not registered")
    });
  };

  return (
    <>
      <div className="forget_password">
        <h4>Email Address</h4>
        <h6 className="mt-5 mb-3">
          Enter Your Email Id to reset your password :
        </h6>
        <form autoComplete="on" onSubmit={onSubmit}>
          <div className="forget_pass_content">
            <input
              type="email"
              placeholder="Enter Your EmailID"
              name="email"
              className="py-2 mb-3"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button type="submit" className="my-3 bg-warning py-2">
              SEND
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
