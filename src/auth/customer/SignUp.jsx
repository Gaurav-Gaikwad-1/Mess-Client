import React, { useState } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Container,Form,Col,Button } from "react-bootstrap";

const SignUp = () => {
  const [user, setState] = useState({
    fullName: "",
    password: "",
    email: "",
    phone: "",
  });

  const inputEvent = (e) => {
    const { name, value } = e.target;

    setState((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    // let regName = /^[ a-zA-Z\-\’]+$/;
    // if(regName.test(user.name)){
    //    console.log('correct');
    // }else{
    //   console.log('incoreect');
    // }
    // if(user.phone.length != 10) toast.error("Invalid Mobile Number");
    // else if(user.password.length < 5) toast.error("Password must contain atleast 5 characters");
    // else  {
      axios
      .post("api/register/customer", {
        name: user.fullName,
        email: user.email,
        password: user.password,
        phone: user.phone,
      })
      .then((response) => {
        // console.log(response);
        alert("Sign Up successfully");
        if (response.status === 200) window.location = "/login/customer";
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
    <>
      <Container>
        <h3 className="switch" style={{textAlign:"center",margin:"1.5rem 8rem"}}>
            <button>
              <NavLink to="/login/customer">Login</NavLink>
            </button>
            |  
            <button className="ml-1">
              <NavLink to="/signup/customer">SignUp</NavLink>
            </button>
        </h3>
        <Form onSubmit={onSubmit} style={{width:"70%",margin:"0px 15%"}}>
            <h1 style={{textAlign:"center",margin:"3rem 0px",fontFamily:"'Nunito Sans',sans-serif"}}>
              SignUp <FastfoodIcon />
            </h1>
          
            <Form.Group as={Col} >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="fullName" placeholder="Enter Your Name" pattern="[a-zA-Z]+ [a-zA-Z]+" onChange={inputEvent} value={user.fullName} title="Enter Full name (first & last name) eg John Doe" required/>
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" name="phone" placeholder="Enter Mobile No." pattern="(7|8|9)\d{9}" onChange={inputEvent} value={user.phone} title="Enter a valid 10-digit no" required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter Email" onChange={inputEvent} value={user.email}  required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter password" onChange={inputEvent}  pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$" title="Password must contain atleast 1 uppercase,1 lowercase,1 number,1 symbol min 8 max 12 characters" value={user.password} required/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{margin:"2rem 10rem 0 45%"}}>
                SignUp
            </Button>
            
        </Form>
        
     
    </Container>
    </>
  );
};
export default SignUp;
