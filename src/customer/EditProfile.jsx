import React, { useEffect, useState } from "react";
import axios from "axios";
// import '../../../sass/EditProfileCustomer.sass'
import { authAxiosCust } from "../App";
import { toast } from "react-toastify";

const EditProfile = () => {
  const id = localStorage.getItem("userId");

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`api/customer/${id}`)
      .then((res) => {
        // console.log(res.data);
        setDetails({
          name: res.data.Customer.name,
          email: res.data.Customer.email,
          phone: res.data.Customer.phone,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const { name, email, phone } = details;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    // console.log(details);
    e.preventDefault();
    authAxiosCust
      .patch(`api/customer/update/${id}`, {
        email: email,
        name: name,
        phone: phone,
      })
      .then((res) => {
        // console.log(res);
        toast.success("Profile Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    authAxiosCust
      .delete(`api/customer/delete/${id}`)
      .then((res) => {
        toast.success("Account deleted successfully");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        window.location = "/signup/customer";
      })
      .catch((err) => {
        alert("Some error occured during deletion :( Please try again later");
        // console.log(err);
      });
  };

  return (
    <div className="container" style={{ width: "65%", marginTop: "50px" }}>
      <form className="container editCustForm">
        <div className="form-group">
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            pattern="[a-zA-Z]+ [a-zA-Z]+" 
            title="Enter Full name (first & last name) eg John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Email" className="text-white">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="Email"
            placeholder="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="Password"
            placeholder="********"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneno" className="text-white">
            Phone No
          </label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            id="phoneno"
            placeholder="Phone no"
            value={phone}
            onChange={handleChange}
            pattern="(7|8|9)\d{9}"
            title="Enter a valid 10-digit no"
            required
          />
        </div>

        <div className="d-flex mx-auto">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn bg-warning text-light mx-5"
          >
            Save
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className="btn bg-danger text-light d-block  mx-2"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
