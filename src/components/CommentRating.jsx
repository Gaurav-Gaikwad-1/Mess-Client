import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { IoIosStar } from "react-icons/io";
import Zoom from "react-reveal";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import ReplyIcon from "@material-ui/icons/Reply";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { authAxiosCust, authAxiosMess } from "../App";
import { useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";

//need to modify comment schema and logic
// Pending work : Reply and Comment section

const CommentRating = ({ toggle_action }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "60%",
      height: "70%",
      transform: "translate(-50%, -50%)",
      border: "0.5px solid black",
      boxShadow: "0 3px 50px rgba(2, 2, 2, 5)",
    },
  };
  const { messId } = useParams();
  const custId = localStorage.getItem("userId");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);

  // let date = new Date(dateString);
  // var timeStamp = parseInt((new Date('2020/10/12').getTime() / 1000).toFixed(0))
  // console.log(timeStamp);
  // let unix_timestamp = 1602493580;
  // var date = new Date(unix_timestamp * 1000);
  // var year = date.getFullYear();
  // var mon = date.getMonth() + 1;
  // var day = date.getDate();
  // if (day < 10) day = "0" + day;
  // if (mon < 10) mon = "0" + mon;

  // var formattedTime = year + ":" + mon + ":" + day;

  // console.log(formattedTime);
  useEffect(() => {
    authAxiosCust
      .get(`/api/mess/${messId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [messId]);

  useEffect(() => {
    displayComment();
  }, []);

  const displayComment = () => {
    setLoading(true);
    axios
      .get(`/api/rating/all/${messId}`)
      .then((res) => {
        console.log(res.data);
        setReview(res.data.reviews);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const displayStar = (star) => {
    return (
      <>
        {[...Array(star)].map(() => {
          return <IoIosStar fontSize={30} color="#FFB800"/>;
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
  const ratingChanged = (newRating) => {
    setRating(newRating);
    // console.log(newRating);
  };

  const timeSplit = (time) => {
    let new_value = time.split("T")[0];
    return new_value;
  };

  const onSubmit = () => {
    console.log(comment);
    console.log(rating);
    var today = new Date();
    // var dd = today.getDate();
    // var mm = today.getMonth() + 1;
    // var yyyy = today.getFullYear();
    // if (dd < 10) dd = "0" + dd;
    // if (mm < 10) mm = "0" + mm;
    // today = yyyy + "/" + mm + "/" + dd;
    // var timeStamp = parseInt((new Date(today).getTime() / 1000).toFixed(0));
    // console.log(timeStamp);
    authAxiosCust
      .post(`/api/rating/new/review/${custId}/${messId}`, {
        rating: rating,
        comment: comment,
        timestamp: today,
      })
      .then((res) => {
        console.log(res);
        toast.success("Thankyou for your feedback");
        window.location = `/customer/mess-details/${messId}`;
        toggle_action(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteRating = (reviewId) => {
    authAxiosMess
      .delete(`/api/rating/delete/${reviewId}`)
      .then(() => {
        toast.success("comment deleted");
        displayComment();
        toggle_action(false);
      })
      .catch((err) => console.log("error while deleting comment"));
  };

  return (
    <>
      {!localStorage.getItem("tokenMess") && localStorage.getItem("token") && (
        <Button
          variant="contained"
          color="secondary"
          style={{
            borderRadius: "20px",
            border: "none",
            outline: "none",
            margin: "20px 20px",
            width: "8rem",
          }}
          onClick={() => setIsOpen(true)}
        >
          <span className="text-white">Rate us</span>
        </Button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
      >
        <Zoom>
          <CancelIcon
            className="d-block"
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h4 className="font-weight-bold mb-5 text-warning">
              Did You Love It ? Let Us Know
            </h4>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <ReactStars
                count={5}
                size={35}
                // isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#FEC200"
                onChange={ratingChanged}
                style={{
                  border: "none",
                  outline: "none",
                }}
              />
            </div>
            <h6 className="my-4"> Add a Comment</h6>
            <div className="form-group justify-content-center d-flex ">
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Comment..."
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  height: "100px",
                  maxWidth: "50%",
                  borderRadius: "20px",
                  border: "1px solid black",
                  outline: "none",
                }}
              />
            </div>
            <Button
              variant="contained"
              style={{
                borderRadius: "20px",
                border: "none",
                outline: "none",
                backgroundColor: "#FFB800",
                margin: "20px 0",
              }}
              onClick={onSubmit}
            >
              <span className="text-white justify-content-center align-items-center">
                Submit
              </span>
            </Button>
          </div>
        </Zoom>
      </Modal>
      {/* <h6 className="ml-5 text-danger font-weight-bolder">Rate Us</h6> */}
      {loading && (
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
      )}
      <Row>
        <Col md={12}>
          {/* <ListGroup>
                <ListGroup.Item style={{
                display:"flex",
                position:"relative",
                height:"5rem",
                alignItems:"center"
              }}></ListGroup.Item> */}
          <div className="justify-content-center align-items-center mx-5 mt-4">
            {review.map((idx) => {
              return (
                <Zoom>
                  <ul
                    className="col sm-12 comment_section d-flex"
                    key={idx._id}
                    style={{
                      backgroundColor: "#f1f1f1",
                      height: "120px",
                    }}
                  >
                    {/* <Avatar name={idx.customerName} className="text-white" size="50" round={true} /> */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                        position: "relative",
                      }}
                    >
                      <div className="my-2 d-flex">
                        {displayStar(idx.rating)}
                        {LeftdisplayStar(5 - idx.rating)}
                        {idx.thread.map((item) => {
                          return (
                            <h6
                              style={{
                                position: "absolute",
                                right: "10px",
                                marginTop: "5px",
                                color: "#f50057",
                                // fontFamily:"'Castoro', serif"
                              }}
                            >
                              {timeSplit(item.timestamp)}
                            </h6>
                          );
                        })}
                      </div>
                      <div
                        style={{
                          backgroundColor: "white",
                          width: "700px",
                          padding: "0 10px",
                          borderRadius: "10px",
                          marginBottom: "5px",
                        }}
                      >
                        {idx.thread.map((item) => {
                          return (
                            <p className="mt-2" key={item._id}>
                              {item.comment}
                            </p>
                          );
                        })}
                      </div>
                      {localStorage.getItem("tokenMess") ? (
                        <h6
                          style={{
                            color: "grey",
                            marginTop: "5px",
                            // fontFamily: "'Castoro', serif",
                          }}
                        >
                          ~ by {idx.customerName}
                        </h6>
                      ) : (
                        <h6
                          style={{
                            color: "grey",
                            marginTop: "5px",
                            // fontFamily: "'Castoro', serif",
                            position: "absolute",
                            right: "10px",
                            bottom: "0",
                          }}
                        >
                          ~ by {idx.customerName}
                        </h6>
                      )}

                      <div
                        className="mb-1"
                        style={{
                          position: "absolute",
                          right: "20px",
                          bottom: "0",
                        }}
                      >
                        {localStorage.getItem("userIdMess") &&
                          localStorage.getItem("tokenMess") && (
                            <>
                              <ReplyIcon />
                              <span
                                className="ml-2 "
                                style={{
                                  fontFamily: "'Castoro', serif",
                                  cursor: "pointer",
                                }}
                              >
                                Reply
                              </span>
                              <span
                                className="ml-4"
                                style={{
                                  fontFamily: "'Castoro', serif",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteRating(idx._id)}
                              >
                                Delete
                              </span>
                            </>
                          )}
                      </div>
                    </div>
                  </ul>
                </Zoom>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CommentRating;
