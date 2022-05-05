import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Otp = ({modal_action_otp}) => {
  const [otp, setOtp] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("otp :" + otp);
    // modal_action_otp(true);
    axios.post("api/forgotpassword/verify", {
      "otp":otp
    })
    .then(res=>{
        console.log(res);
        localStorage.setItem('reset_token',res.data.token);
        modal_action_otp(true);
    })
    .catch(err => {
      console.log(err);
      toast.error("wrong OTP");
    });
  };

  return (
    <>
      <div className="forget_password">
        <h3>Enter OTP</h3>
        <h6 className="my-4">
          Check your registered email for the OTP
        </h6>
        <form autoComplete="on" onSubmit={onSubmit}>
          <div className="forget_pass_content">
            <input
              type="number"
              placeholder="Please enter the OTP"
              name="number"
              className="py-3 mb-3"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            <button type="submit" className="my-3 bg-warning py-2">
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Otp;
