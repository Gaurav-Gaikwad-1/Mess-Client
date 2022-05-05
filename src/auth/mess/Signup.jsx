import React, { useState } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Container,Form,Col,Button } from "react-bootstrap";
import { toast } from "react-toastify";


const SignUp = () => {
  const [mess, setMess] = useState({
    password: "",
    email: "",
    messDetails:{
        messName: "",
        ownerName:"",
        phone: "",
        address:""
    },
    price:{
        homeDelivery:{
            available:"",
            DeliveryCharge:"",
        },
        onVenue:{
            available:""
        }
    }
  });

  const inputEvent = (e) => {
    const { name, value } = e.target;

    setMess((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(mess);
    if(mess.phone.length !== 10) toast.error("Invalid Mobile Number");
    else if(mess.password.length < 5) toast.error("Password must contain atleast 5 characters");
    else {
     axios.post('api/register/mess',{
      "email": mess.email,
      "password": mess.password,
      "messDetails": {
              "messName": mess.messName,
              "ownerName": mess.ownerName,
              "phone": mess.phone,
              "address": mess.address
          },
      "price": {
              "homeDelivery": {
                  "available": mess.available,
                  "DeliveryCharge": mess.DeliveryCharge 
              },
              "onVenue": {
                  "available": mess.available
              }
      }
    })
    .then((response) => {
        console.log(response);
        alert("Sign Up successfully");
        if(response.status === 200)
          window.location = '/login/mess';
    })
    .catch( (error) => {
        console.log(error)
    })  
    }
  };

  return (
    <Container>
      
          <h3 className="switch" style={{textAlign:"center",margin:"1.5rem 8rem"}}>
            <button>
              <NavLink to="/login/mess">Login</NavLink>
            </button>
            |  
            <button className="ml-1">
              <NavLink to="/signup/mess">SignUp</NavLink>
            </button>
          </h3>
      
      <Form onSubmit={onSubmit}>
            <h1 style={{textAlign:"center",margin:"3rem 0px",fontFamily:"'Nunito Sans',sans-serif"}}>
              Sign Up <FastfoodIcon />
            </h1>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Mess name</Form.Label>
            <Form.Control type="text"  name="messName" placeholder="Enter Mess Name" onChange={inputEvent} value={mess.messDetails[0]} required/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Owner name</Form.Label>
            <Form.Control type="text" name="ownerName" placeholder="Enter Owner name" onChange={inputEvent}   value={mess.messDetails[1]} pattern="[a-zA-Z]+ [a-zA-Z]+" title="Enter Full name (first & last name) eg John Doe" required/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter Email" onChange={inputEvent} value={mess.email} required/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" onChange={inputEvent}   value={mess.password} pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,12}$" title="Password must contain atleast 1 uppercase,1 lowercase,1 number,1 symbol min 8 max 12 characters" required/>
          </Form.Group>
        </Form.Row>


        <Form.Group controlId="formGridAddress1">
          <Form.Label>Mess Address</Form.Label>
          <Form.Control type="text" placeholder="Enter Mess Address" name="address" onChange={inputEvent} value={mess.messDetails[3]} required/>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>Mobile no</Form.Label>
            <Form.Control type="text" name="phone" placeholder="Enter Mobile no." onChange={inputEvent}  pattern="(7|8|9)\d{9}" value={mess.messDetails[2]} title="Enter a valid 10-digit no" required/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Dining Available</Form.Label>
            {/* <Form.Control type="text" name="onVenue" placeholder="True/False"  onChange={inputEvent} value={mess.price.onVenue[0]} required/> */}
            <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                name="onVenue"
                required
                custom
                onChange={inputEvent}
              >
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </Form.Control>
          </Form.Group> 
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>Home Delivery</Form.Label>
            {/* <Form.Control type="text" name="available" onChange={inputEvent}  value={mess.price.homeDelivery[0]} required/> */}
            <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                name="available"
                onChange={inputEvent}
                required
                custom
              >
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Home Delivery Charge</Form.Label>
            <Form.Control type="text" name="deliveryCharge" placeholder="Delivery charge" onChange={inputEvent}  value={mess.price.homeDelivery[1]} required/>
          </Form.Group>
        </Form.Row>



        <Button variant="primary" type="submit" style={{marginLeft:"45%"}}>
          SignUp
        </Button>
      </Form>
    </Container>
      
  );
};

export default SignUp;

