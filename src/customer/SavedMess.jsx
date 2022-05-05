import React, { useEffect, useState } from "react";
import img1 from "../imgs/food1.jpg";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
// import DirectionsIcon from "@material-ui/icons/Directions";
// import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { authAxiosCust } from "../App";
import Loader from "react-loader-spinner";
import {Card,Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { IoIosStar } from "react-icons/io";

const SavedMess = () => {
  const custId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [mess, setMess] = useState([]);
  useEffect(() => {
    authAxiosCust
      .get(`api/customer/features/savedmess/${custId}`)
      .then((res) => {
        console.log(res);
        setMess(res.data.doc);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [custId]);

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

  return (
    <Container>
     <Row>
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
        mess.map((idx) => {
          return (
          <Col key={idx._id} sm={12} md={6} lg={4} xl={4}>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/customer/mess-details/${idx._id}`} >
                    <Card.Img src={img1} variant='top'/>
                </Link>

                <Card.Body>
                    <Link to ={`/customer/mess-details/${idx._id}`} >
                        <Card.Title as='h4'>
                         {idx.messDetails.messName}
                        </Card.Title>
                    </Link>
                    <Card.Text as='div'>
                    <div className="mb-2">
                      {/* Need to change this logic... */}
                      {displayStar(Math.ceil(5))}
                      {LeftdisplayStar(5 - Math.ceil(5))}
                    </div>
                    </Card.Text>
                    
                    <Card.Text >Chinese,FastFoood,North India....</Card.Text>

                    <Card.Text as='div'>
                        <div className=''>
                            {/* <Rating 
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            /> */}
                        </div>
                    </Card.Text>
                    <Card.Text as='div'>
                    {idx.messDetails.address}
                    </Card.Text>

                    
                </Card.Body>
            </Card>
          </Col>
          );
        })
      )}
    </Row>
    </Container>
  );
};

export default SavedMess;
            