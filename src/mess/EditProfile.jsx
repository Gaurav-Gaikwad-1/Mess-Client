import React, { useEffect, useState } from "react";
import messImg from "../imgs/food1_1.jpg";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "./MessSettings.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { authAxiosMess } from "../App";
import { Container,Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EditProfile = () => {
  const getId = localStorage.getItem("userIdMess");
  const [mess, setMess] = useState({
    messName: "",
    ownerName: "",
    email: "",
    address: "",
  });

  const [messImage, setMessImage] = useState({
    profileImg: messImg,
  });

  const [visible, setVisible] = useState(false);
  const [changeImg, setChangeimg] = useState(false);

  const imageHandler = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMessImage({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const { messName, ownerName, email, address } = mess;

  const changeEvent = (e) => {
    const { name, value } = e.target;
    setMess({ ...mess, [name]: value });
  };

  const onSubmit = (e) => {
    // console.log(mess);
    e.preventDefault();
    authAxiosMess
      .patch(`api/mess/update/${getId}`, {
        email: mess.email,
        messDetails: {
          messName: mess.messName,
          ownerName: mess.ownerName,
          phone: 9999999999,
          address: mess.address,
        },
        price: {
          homeDelivery: {
            available: true,
            DeliveryCharge: null,
          },
          onVenue: {
            available: true,
          },
        },
      })
      .then((res) => {
        // console.log(res);
        toast.success("updated");
      })
      .catch((err) => console.log(err + " error mila hai"));
  };

  useEffect(() => {
    axios
      .get(`api/mess/${getId}`)
      .then((res) => {
        // console.log(res.data);
        setMess({
          messName: res.data.Mess[0].messDetails.messName,
          ownerName: res.data.Mess[0].messDetails.ownerName,
          address: res.data.Mess[0].messDetails.address,
          email: res.data.Mess[0].email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getId]);

  const handleDelete = (e) => {
    e.preventDefault();
    authAxiosMess
      .delete(`api/mess/delete/${getId}`)
      .then((res) => {
        alert("Account deleted successfully");
        localStorage.removeItem("userIdMess");
        localStorage.removeItem("tokenMess");
        window.location = "/signup/mess";
      })
      .catch((err) => {
        alert("Some error occured during deletion :( Please try again later");
        console.log(err);
      });
  };

  return (
    <Container style={{marginBottom:"10rem"}}>
      <Button variant="light" onClick={() => window.location=`/mess/${getId}`}>Go Back</Button>
      <form style={{ width: "70%",margin:"4rem 15%" }}>
        <div className="edit-profile ml-1">
          <div className="mt-3" style={{ height: "15rem" }}> 
            <div className="label">
              <div
                className="messImgUpload"
                style={{ position: "absolute", borderRadius: "10px" }}
              >
                <label className="image-upload" htmlFor="input">
                  <div
                    className="mess-img"
                    onMouseEnter={() => {
                      setChangeimg(true);
                    }}
                    onMouseLeave={() => {
                      setChangeimg(!changeImg);
                    }}
                  >
                    <img
                      src={messImage.profileImg}
                      alt="mess-img"
                      style={{
                        height: "175px",
                        width: "250px",
                        borderRadius: "10px",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input"
                    onChange={imageHandler}
                    className="mt-2"
                  />
                </label>
              </div>
              {changeImg ? (
                <div className="hover__icon" onChange={imageHandler}>
                  <AddPhotoAlternateIcon
                    className="hover__img"
                    style={{
                      height: "50px",
                      width: "50px",
                      // filter: "invert(1)",
                    }}
                  />
                  <h5 className="text-white" style={{ position: "initial" }}>
                    Change Photo
                  </h5>
                </div>
              ) : null}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="MessName" className=" text-white">
                Mess Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Mess Name"
                id="MessName"
                name="messName"
                value={messName}
                onChange={(e) => changeEvent(e)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="OwnerName" className=" text-white">
                Owner Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Owner Name"
                id="OwnerName"
                name="ownerName"
                value={ownerName}
                onChange={(e) => changeEvent(e)}
                pattern="[a-zA-Z]+ [a-zA-Z]+"
                title="Enter Full name (first & last name) eg John Doe"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4" className=" text-white">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="abc@gmail.com"
                name="email"
                value={email}
                onChange={(e) => changeEvent(e)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4" className=" text-white">
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                className="form-control"
                id="inputPassword4"
                placeholder="**********"
                autoComplete="off"
                pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$" 
                title="Password must contain atleast 1 uppercase,1 lowercase,1 number,1 symbol min 8 max 12 characters" 
                required
              />
              <span
                className="password-toogle-icon"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                {visible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress" className=" text-white">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Address..."
              name="address"
              value={address}
              onChange={(e) => changeEvent(e)}
              // style={{ height: "100px" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning text-white "
            style={{ width: "7rem" ,display:"inline",marginLeft:"25%"}}
            onClick={onSubmit}
          >
            Save
          </button>
          <button
            type="submit"
            onClick={handleDelete}
            className="btn bg-danger text-light"
            style={{ display:"inline",marginLeft:"4%"}}
          >
            Delete Account
          </button>
        </div>
      </form>
    </Container>
  );
};

export default EditProfile;
