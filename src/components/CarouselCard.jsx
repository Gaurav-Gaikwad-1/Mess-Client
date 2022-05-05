import React, { useEffect, useState } from "react";
import food1 from "../imgs/food1.jpg";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { authAxiosCust } from "../App";
import { IoIosStar } from "react-icons/io";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Container,
} from "react-bootstrap";

const CarouselCard = (props) => {
  const [rating, setRating] = useState("");

  useEffect(() => {
    authAxiosCust
      .get(`/api/mess/${props.messId}`)
      .then((res) => {
        // console.log(res)
        setRating(res.data.Mess[0].Rating);
      })
      .catch((err) => console.log(err));
  });

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
    <>
      <Container>
        <Row style={{}}>
          <Col md={4}>
            <Image
              src={food1}
              alt="foodimage"
              fluid
              style={{
                height: "-webkit-fill-available",
                margin: "0 10px",
              }}
            />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{props.mess}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                {displayStar(Math.ceil(rating))}
                {LeftdisplayStar(5 - Math.ceil(rating))}
              </ListGroup.Item>

              <ListGroup.Item>
                Chinese,FastFoood,North Asia Food...
              </ListGroup.Item>

              <ListGroup.Item>{props.address}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <div
                className="card-text"
                style={{ textAlign: "-webkit-center" }}
              >
                <h5 className="mb-4 mt-3">Today's Special</h5>
                <table id="customers">
                  <div
                    className=" font-weight-bold"
                    style={{
                      marginLeft: "50%",
                      width: "8rem",
                      marginBottom: "5px",
                    }}
                  >
                    {props.menuName}
                  </div>

                  <tbody>
                    {props.menuItem.map((item) => (
                      <tr key={item._id}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ListGroup>
          </Col>
          <Col md={2}>
            <div
              className="card-text price-tag mt-5"
              style={{ color: "#FF4D00", textAlign: "center" }}
            >
              <h1
                className="d-block"
                style={{ color: "#FF4D00", transform: "scale(1.2)" }}
              >
                {props.price}
              </h1>
              <h4 className="d-flex" style={{ justifyContent: "center" }}>
                INR
                <LocalOfferIcon
                  className=" ml-2"
                  style={{ color: "#FFB800", transform: "scale(1.2)" }}
                />
              </h4>

              <button
                type="button"
                className="btn btn-warning text-white mt-2"
                style={{ transform: "scale(1.3)", width: "70%" }}
                onClick={() =>
                  (window.location = `/customer/mess-details/${props.messId}`)
                }
              >
                View
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CarouselCard;
