import React, { useEffect, useState } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import CancelIcon from '@material-ui/icons/Cancel';
import { NavLink } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import ForgetPassword from "../ForgetPassword";
import Otp from "../Otp";
import ResetPassword from "../ResetPassword";
import Zoom from "react-reveal";
import { Container, Form, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const SignUp = () => {
 
  if(localStorage.getItem('tokenMess'))
  window.location="/mess/dashboard"
  else if(localStorage.getItem('token'))
  window.location="/customer/dashboard"

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width                 : '60%',
      height                : '70%',
      transform             : 'translate(-50%, -50%)',
      border                : "0.5px solid black",
      boxShadow             : "0 3px 50px rgba(2, 2, 2, 5)"
    }
  };

  const initialState = localStorage.getItem('tokenMess');
  const [messToken, setMessToken]=useState(initialState);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modalIsOpen_2nd,setIsOpen_2nd] = useState(false);
  const [modalIsOpen_3rd,setIsOpen_3rd] = useState(false);
  const [mess, setUser] = useState({
    password: "",
    email: "",
  });

  useEffect(()=>{
    if(messToken){
      const messid = localStorage.getItem('userIdMess');
      window.location = `/mess/${messid}`;
    }
  },[messToken])

  const inputEvent = (e) => {
    const { name, value } = e.target;

    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(mess);
    axios
      .post("api/login/mess", {
        email: mess.email,
        password: mess.password,
      })
      .then(function (response) {
        // console.log(response);
        localStorage.setItem('tokenMess',response.data.token.token)
        localStorage.setItem('refreshTokenMess',response.data.token.refreshToken);
        localStorage.setItem('userIdMess',response.data.userId)
        setMessToken(response.data);
        if (response.status === 200) window.location = `/mess/${response.data.userId}`;
      })
      .catch(error=>{
        console.log(error);
        toast.error("wrong Username or Password")
      });
  };

  const modal_action=(action)=>{
    setIsOpen(action);
    setIsOpen_2nd(true);
  }
  const modal_action_otp=(action)=>{
    setIsOpen_3rd(action);
    // setIsOpen_2nd(true);
  }

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
          <Form onSubmit={onSubmit} style={{width:"70%",margin:"0px 15%"}}>
            <h1 style={{textAlign:"center",margin:"3rem 0px",fontFamily:"'Nunito Sans',sans-serif"}}>
              Login <FastfoodIcon />
            </h1>
          
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter Email" onChange={inputEvent} value={mess.email} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter password" onChange={inputEvent}   value={mess.password} required/>
            </Form.Group>
            <h6 className="forget text-primary" onClick={()=>setIsOpen(true)}>forget password</h6>
            <Button variant="primary" type="submit" style={{margin:"2rem 10rem 0 45%"}}>
                Login
            </Button>
            
          </Form>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={modalIsOpen}
          style={customStyles}
          ariaHideApp={false}
        >
          <Zoom>
            <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>setIsOpen(false)} />
            <ForgetPassword modal_action={modal_action}/>
          </Zoom>
        </Modal>
        <Modal
          isOpen={modalIsOpen_2nd}
          onRequestClose={modalIsOpen_2nd}
          style={customStyles}
          ariaHideApp={false}>
        <Zoom>
            <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>{
              setIsOpen_2nd(false);
              setIsOpen(true);
            }} />
            <Otp modal_action_otp={modal_action_otp}/>
          </Zoom>
        </Modal>
        <Modal
          isOpen={modalIsOpen_3rd}
          onRequestClose={modalIsOpen_3rd}
          style={customStyles}
          ariaHideApp={false}>
         <Zoom>
            <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>{
              setIsOpen_3rd(false);
              setIsOpen_2nd(true);
              }} />
            <ResetPassword/>
         </Zoom>
        </Modal>
    </Container>
  );
};

export default SignUp;

// {/* <Container>
//         <div className="main_div">
//           <h3 className="switch">
//             <button>
//               <NavLink exact to="/login/mess">Login</NavLink>
//             </button>
//             |
//             <button>
//               <NavLink exact to="/signup/mess">SignUp</NavLink>
//             </button>
//           </h3>
//           <form onSubmit={onSubmit} autoComplete="on">
//             <div className="inputForm">
//               <h1>
//                 Login <FastfoodIcon />
//               </h1>
//               <div className="inputTag">
//                 <input
//                   type="email"
//                   placeholder="Enter Your EmailID"
//                   name="email"
//                   onChange={inputEvent}
//                   value={mess.email}
//                 />
//                 <EmailOutlinedIcon
//                   style={{
//                     background: "transparent",
//                     color: "black",
//                     top: "1.7rem",
//                     left: "1rem",
//                     position: "absolute",
//                   }}
//                 />
//                 <input
//                   type="password"
//                   placeholder="Enter Your password"
//                   name="password"
//                   onChange={inputEvent}
//                   value={mess.password}
//                 />
//                 <LockOutlinedIcon
//                   style={{
//                     background: "transparent",
//                     color: "black",
//                     top: "7.1rem",
//                     left: "1rem",
//                     position: "absolute",
//                   }}
//                 />
//                 <button type="submit" className="mb-5">LOGIN</button>
//                 <h6 className="forget mr-2 text-primary" onClick={()=>setIsOpen(true)}>forget password</h6>
//               </div>
//             </div>
//           </form>
//          {/* <div className="switch-user">
//          <NavLink to='/login/customer' activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item"><button >Customer</button></NavLink>
//           <NavLink to='/login/mess' activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item"><button >Mess</button></NavLink>
//           </div> */}
//         </div>
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={modalIsOpen}
//           style={customStyles}
//           ariaHideApp={false}
//         >
//           <Zoom>
//             <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>setIsOpen(false)} />
//             <ForgetPassword modal_action={modal_action}/>
//           </Zoom>
//         </Modal>
//         <Modal
//           isOpen={modalIsOpen_2nd}
//           onRequestClose={modalIsOpen_2nd}
//           style={customStyles}
//           ariaHideApp={false}>
//         <Zoom>
//             <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>{
//               setIsOpen_2nd(false);
//               setIsOpen(true);
//             }} />
//             <Otp modal_action_otp={modal_action_otp}/>
//           </Zoom>
//         </Modal>
//         <Modal
//           isOpen={modalIsOpen_3rd}
//           onRequestClose={modalIsOpen_3rd}
//           style={customStyles}
//           ariaHideApp={false}>
//          <Zoom>
//             <CancelIcon className="d-block" style={{cursor:"pointer"}} onClick={()=>{
//               setIsOpen_3rd(false);
//               setIsOpen_2nd(true);
//               }} />
//             <ResetPassword/>
//          </Zoom>
//         </Modal>
//       </Container> */}



