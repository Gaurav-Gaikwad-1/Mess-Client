import React,{useState,useEffect} from 'react';
import { useParams} from "react-router-dom";
import { authAxiosMess } from "../App";
import {Col,ListGroup,Row,Image} from 'react-bootstrap';
//icons
import food1 from "../imgs/food1.jpg";
import { IoIosStar } from "react-icons/io";

const MessInfo = () => {
    const { messId } = useParams();

    const [mess, setMess] = useState({
        messName: "",
        address: "",
        menuList: [],
        subscribers: [],
        Rating: 0
      });


      useEffect(() => {
        authAxiosMess
        .get(`/api/mess/${messId}`)
        .then((res) => {
          console.log(res.data.Mess[0]);
          setMess({
            messName: res.data.Mess[0].messDetails.messName,
            menuList: res.data.Mess[0].MenuList,
            address: res.data.Mess[0].messDetails.address,
            subscribers: res.data.Mess[0].subscribers,
            Rating: res.data.Mess[0].Rating
          });
        })
        .catch((err) => console.log(err));
    }, [messId]);

    const displayStar = (star) => {
        return (
          <>
            {[...Array(star)].map(() => {
              return <IoIosStar fontSize={30} color="#FFB800" />;
            })}
          </>
        );
      };
      const LeftdisplayStar = (star) => {
        return (
          <>
            {[...Array(star)].map(() => {
              return <IoIosStar fontSize={30} color="grey" />;
            })}
          </>
        );
      };

    return(
        <Row style={{marginBottom:"2rem"}}>
            <Col md={5}>
                <Image src={food1} alt='foodimage' fluid />
            </Col>
            <Col md={6}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{mess.messName}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  {displayStar(Math.ceil(mess.Rating))}
                  {LeftdisplayStar(5 - Math.ceil(mess.Rating))}
                </ListGroup.Item>

                <ListGroup.Item>
                    Chinese,FastFoood,North Asia Food...
                </ListGroup.Item>

                <ListGroup.Item>
                    {mess.address}
                </ListGroup.Item>
                </ListGroup>
            </Col>
      </Row>
    )
}

export default MessInfo;

//1.useParams. This hook gives us access to the params of that particular route. params are parameters whose values are set dynamically in a URL. Usually, the way we access the params in previous versions of react-router was through the match props passed to the component.