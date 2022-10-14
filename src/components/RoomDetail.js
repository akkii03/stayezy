import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2";

export default function RoomDetail() {
  const [apiData,setApiData] = useState();
  const [loading,setLoading] = useState(true);
  const {id,toDate,fromDate} = useParams();
  const startDate = moment(toDate,"DD-MM-YYY");
  const endDate = moment(fromDate,"DD-MM-YYY");

const totalDays = moment.duration(endDate.diff(startDate)).asDays()+1;
  
let user = JSON.parse(sessionStorage.getItem("userInfo"));

 useEffect(()=>{
  setLoading(true)
  axios.get(`https://stayezy.herokuapp.com/book/${id}`)
  .then(result=>{
    setApiData(result.data[0]) 
    setLoading(false)
  })
  .catch(err=>{
    console.log("api not called due to ",err)
    })
 },[])



async function Booking(token) {
  const {id} = JSON.parse(sessionStorage.getItem("userInfo"));
  const bookingUser = await axios.get(`https://stayezy.herokuapp.com/user/${id}`);
  const infoObject={userId:bookingUser.data._id,name:bookingUser.data.name,email:bookingUser.data.email};
  const bookingInfo={
    room:apiData.name,
    roomid:apiData._id,
    userInfo:infoObject,
    fromdate:toDate,
    todate:fromDate,
    totalamount:totalDays*apiData.rent,
    totaldays:totalDays,
    transactionid:Date.now(),
    token:token
  }

  axios.post("https://stayezy.herokuapp.com/booking",bookingInfo)
  .then(result=>
    {
    Swal.fire("congratulations","Room Booked Successfully !","success")
    .then(result=>{
      window.location.href=`/profile`
    })
    setLoading(false)
    })
  .catch(err=>{
    Swal.fire("Sorry","Room Not Booked ","error")
  });
}

  return (
    <>
    {
      loading?"loading...":(
        <div className='bookScreen'>
      <h1  className='bookingTitle'>{apiData.name}</h1>
     <div className='sliderImg'>
     <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={apiData.images[0]} className="d-block w-100 imgslide" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={apiData.images[1]} className="d-block w-100 imgslide" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={apiData.images[2]} className="d-block w-100 imgslide "  alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
    </div>
     </div>
     <div className='bookSummary'>
     <div className='bookingDetails'>
     <h1 className='titleBooking'>Booking Details</h1>
        <hr/>
        <b>
          <p>Name :{user.name}</p>
          <p>From Date :{toDate}</p>
          <p>To Date :{fromDate}</p>
          <p>Max Count :{apiData.maxcount}</p>
          
        </b>
     </div>

     <div className='amountDetails'>
     <h1 className='titleBooking'>Amount Details</h1>
        <hr/>
        <b>
          <p>Total Days :{totalDays}</p>
          <p>Per Day :{apiData.rent}</p>
          <p>Total Amount :  ₹{totalDays*apiData.rent}/-</p>
        </b>
        
        <StripeCheckout
        amount={(totalDays*apiData.rent)*100}
        currency="INR"
        token={Booking}
        stripeKey="pk_test_51LpFctSDoeu8fmcmXBPpelT6kB0uxVg8H1SeYEh0XhN9IhW8YluLjbyPNKkTDLQYlsqltBjQykROfSQHp9P80vCk004eOGUOZz"
      >
        <button className='payNow' >PayNow  {totalDays*apiData.rent}</button>
      </StripeCheckout>
     </div>
      
     </div>
    </div>
      )
    }
    </>
  )
}
