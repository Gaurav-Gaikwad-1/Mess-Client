import React from 'react';
import {Navbar,Nav,Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {

    const logout=()=>{
        //remove tokens and userId...
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenMess");
        localStorage.removeItem("userIdMess");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenMess");
        window.location="/login/customer"
        
        window.location.reload(false)
      };

    return (
        <header>
            <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect className='navbar'>
            <Container>
                {localStorage.getItem('userId') && localStorage.getItem('token') ? (
                <>
                    <LinkContainer to={`/customer/dashboard`}  style={{
                            color:"white",
                            display:"flex",
                            width:"10rem",
                            fontSize:"15px"
                            }}>
                        <Nav.Link>Khana Khazana</Nav.Link>
                        </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <LinkContainer to='/customer/profile'>
                                    <Nav.Link>My Profile</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/customer/savedmess'>
                                    <Nav.Link>Saved Mess</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/login/customer'>
                                    <Nav.Link onClick={()=>logout()}>Logout</Nav.Link>
                                </LinkContainer>
                            </Nav>
                    </Navbar.Collapse>
                </>
                ) : (
                    localStorage.getItem('userIdMess') && localStorage.getItem('tokenMess') ? (
                    <>
                        
                        
                        <LinkContainer to={`/mess/${localStorage.getItem('userIdMess')}`}  style={{
                            color:"white",
                            display:"flex",
                            width:"10rem",
                            fontSize:"15px"
                            }}>
                        <Nav.Link>Khana Khazana</Nav.Link>
                        </LinkContainer>
                           
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <LinkContainer to='/mess/profile/edit'>
                                <Nav.Link>My Profile</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login/mess'>
                                <Nav.Link onClick={()=>logout()}>Logout</Nav.Link>
                            </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                    ) : (
                    <>
                    <LinkContainer to="/"  style={{
                            color:"white",
                            display:"flex",
                            width:"10rem",
                            fontSize:"15px"
                            }}>
                        <Nav.Link>Khana Khazana</Nav.Link>
                        </LinkContainer>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <LinkContainer to='/login/customer'>
                                <Nav.Link>User</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login/mess'>
                                <Nav.Link>Mess</Nav.Link>
                            </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </>
                    )
                )}
            </Container>
            </Navbar>
        </header>
    )
}

export default Header;

{/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}