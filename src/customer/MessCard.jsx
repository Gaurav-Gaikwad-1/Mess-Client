import React, { useState } from "react";
import { authAxiosCust } from "../App";
// import { toast } from "react-toastify";
import foodImage from "../imgs/food3_1.jpg";
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import { useEffect } from "react";
import { IoIosStar } from "react-icons/io";

const MessCard = (props) => {
  // const custId = localStorage.getItem("userId");
  // const [subscribe, setSubscribe] = useState(false);
  // const [mess, setMess] = useState([]);
  const [rating, setRating] = useState("");

  // function findSubscriptionId(arr1, arr2) {
  //   let obj = {};
  //   for (let i = 0; i < arr1.length; i++) {
  //     if (!obj[arr1[i]]) {
  //       const element = arr1[i];
  //       obj[element] = element;
  //     }
  //   }
  //   for (let j = 0; j < arr2.length; j++) {
  //     if (obj[arr2[j]]) {
  //       return obj[arr2[j]];
  //     }
  //   }
  // }

  useEffect(()=>{
  authAxiosCust.get(`/api/mess/${props.messId}`)
  .then(res=>{
    // console.log(res)
    setRating(res.data.Mess[0].Rating);
  })
  .catch(err=>console.log(err));
  },[])


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
      <Card className='my-3 p-3 rounded' style={{
        // boxShadow : "1px 1px 4px rgba(2, 2, 2, 2)",
        // boxShadow : "rgb(2, 2, 2) 0px 0px 4px"
      }}> 
        <Link to={`/customer/mess-details/${props.messId}`} >
            <Card.Img src={foodImage} variant='top'/>
        </Link>

        <Card.Body>
            <Link to ={`/customer/mess-details/${props.messId}`} >
                <Card.Title as='h4'>
                    {props.messName}
                </Card.Title>
            </Link>
            <Card.Text as='div'>
              <div className="mb-2">
                {displayStar(Math.ceil(rating))}
                {LeftdisplayStar(5 - Math.ceil(rating))}
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
               {props.messAdd}
            </Card.Text>

            
        </Card.Body>
      </Card>
    </>
  );
};

export default MessCard;
