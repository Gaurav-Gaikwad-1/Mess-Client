import React,{useState,useEffect} from 'react';
import EditIcon from "@material-ui/icons/Edit";
import StarsIcon from "@material-ui/icons/Stars";
import StarsOutlinedIcon from "@material-ui/icons/StarsOutlined";
import { authAxiosMess } from "../App";
import DeleteIcon from "@material-ui/icons/Delete";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import {Card,Col,ListGroup,Row} from 'react-bootstrap';
import Fab from "@material-ui/core/Fab";
import CommentRating from './CommentRating';


const MenuCards = () => {
    const getId = localStorage.getItem("userIdMess");
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [menusAdded, setMenusAdded] = useState([]);
    const [toggle, setToggle] = useState(true);

    

    useEffect(() => {
        getMenuList();
    }, [getId]);
    
    const toggle_action=(data)=>{
        setToggle(data);
        console.log(data);
    }

    //Get menuList......
    const getMenuList = () => {
        setLoading(true);
        authAxiosMess
        .get(`api/menu/all/${getId}`)
        .then((res) => {
            console.log(res.data);
            setMenu(res.data.Mess);
            setLoading(false);
        })
        .catch((err) =>
            console.log(`${err} :some error while fetching menu list`)
        );
    };

    //Delete menuList......

    const deleteMenuList = (id) => {
        authAxiosMess
        .delete(`api/menu/delete/${getId}/${id}`)
        .then((res) => {
            getMenuList();
            toast.danger("Item deleted");
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        getCurrentMenuList();
    }, []);

    //get all Currentmenu List....

    const getCurrentMenuList = () => {
        authAxiosMess
        .get("/api/currentmenu/all")
        .then((res) => {
            // console.log(res);
            setMenusAdded(res.data.availableMenus);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    //Check if particular menu is currentMenu or not...

    const currentMenuExists = (id) => {
        return menusAdded.find((x) => x.identification.menuId === id) ? 1 : 0;
    };

    //Add currentMenu....

    const addCurrentMenu = (menuId) => {
        authAxiosMess
        .post(`/api/currentmenu/new`, {
            messId: getId,
            menuId: menuId,
        })
        .then((res) => {
            // console.log(res.data);
            getCurrentMenuList();
            toast.success("Updated Today's Menu");
        })
        .catch((err) => {
            // console.log(err);
            toast.error("Error updating Today's menu");
        });
    };

    //Delete CurrentMenu....

    function findPostId(menu, menuId) {
        for (let i = 0; i < menu.length; i++) {
        if (menu[i].identification.menuId === menuId) {
            return menu[i].identification.postId;
        }
        }
    }

    const removeCurrentMenu = (menuId) => {
        const postId = findPostId(menusAdded, menuId);
        // console.log(postId);
        authAxiosMess
        .delete(`/api/currentmenu/delete/${postId}`)
        .then((res) => {
            // console.log(res);
            getCurrentMenuList();
            toast.info("Removed Current Menu");
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error removing Current menu");
        });
    };
    return (
        <>
          <Row>
            <Col md={12}>
                <ListGroup>
                <ListGroup.Item style={{
                display:"flex",
                position:"relative",
                height:"5rem",
                alignItems:"center"
              }}>
                    <h3 style={{
                        textTransform:"capitalize" , 
                        wordWrap:"break-word" ,
                        maxWidth:"70%"
                        }}>{toggle ? "Add,Edit,Delete Items in your Restaurant" : "Reviews"}</h3>
                    <Fab
                    variant="extended"
                    size="big"
                    style={{
                      position:"absolute",
                      right: "20px",
                      border: "none",
                      outline: "none",
                      width: "10rem",
                      backgroundColor: "#FFB800",
                      letterSpacing: "3px",
                    }}
                    onClick={() => setToggle(!toggle)}
                    id='reviews'
                  >
                    {toggle ? (
                      <span className="text-white justify-content-center align-items-center">
                        Reviews
                      </span>
                    ) : (
                      <span className="text-white justify-content-center align-items-center">
                        Menu
                      </span>
                    )}
                  </Fab>
                </ListGroup.Item>
                    
                </ListGroup>
            </Col>
          </Row>

          {loading ? (
            <Loader
            type="ThreeDots"
            color="#FFB800"
            height="100"
            width="100"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            />
         ) : (   
          <Row>
            { toggle && menu.map((item) => {
            
            return (
                    <Col key={item._id} sm={12} md={6} lg={4} xl={4}>
                    <Card className='my-3 p-3 rounded'>
                    <Card.Body>
                        
                        <Card.Title as='div'>
                            <h5 style={{textTransform:"capitalize"}}>{item.menuName}</h5>
                        </Card.Title>
                        
                        <Card.Text>
                            <div>
                            {item.menuItem.map((idx) => {
                                return (
                                <span className="mr-2" key={idx._id} style={{display:"inline",color: "#55595c"}}>
                                    {idx.itemName}
                                </span>
                                );
                            })}
                            </div>
                        </Card.Text>

                        <Card.Text as='div'>
                            <div className=''>
                                <strong>Rs.{item.price}</strong> <span style={{marginLeft:"2rem"}}>{item.tag[0]}</span> 
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <div style={{margin:"15px 0px 0px 0px "}} className='iconsList'>
                                {currentMenuExists(item._id) ? (
                                    <StarsIcon
                                    style={{ color: "#FFB800", cursor: "pointer" }}
                                    onClick={() => removeCurrentMenu(item._id)}
                                    id='starIcon'
                                    />
                                ) : (
                                    <StarsOutlinedIcon
                                    style={{ color: "#FFB800", cursor: "pointer"}}
                                    onClick={() => addCurrentMenu(item._id)}
                                    id='starIcon'
                                    />
                                )}
                                <EditIcon 
                                    style={{  color: "green" ,marginLeft:"4rem",cursor:"pointer"}} 
                                    // className="icon_action"
                                    onClick={() =>
                                    (window.location = `editmenu/${item._id}`)
                                    }
                                />
                                <DeleteIcon 
                                    style={{ color: "#f44336",marginLeft:"4rem",cursor:"pointer" }}
                                    onClick={() => deleteMenuList(item._id)} 
                                    id='deleteIcon'
                                />
                            </div> 
                        </Card.Text>
                    </Card.Body>
                    </Card>
                
                </Col>
                
                

             );
            })}
            {!toggle && <CommentRating toggle_action={toggle_action} />}
          </Row>   
          
        )}
        {toggle ? (
            <div>
            
            <button
                type="submit"
                className="btn btn-warning text-white d-block mx-auto"
                style={{ width: "20rem",marginBottom:"5rem" }}
                onClick={() => window.location='/mess/menus/addmenu'}
            >
                Add New Menu
            </button>
            
        </div>)
        : null}
      </>  
    )
}

export default MenuCards
