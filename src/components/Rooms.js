import React, { useEffect, useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { HashLoader } from 'react-spinners';
import { DatePicker } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
const { RangePicker } = DatePicker;



export default function Rooms() {
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState();
  const [searchValue,setSearchValue] = useState();
  useEffect(() => {
    setLoading(true);
   setTimeout(()=>{
    axios
    .get("https://stayezy.herokuapp.com/allrooms")
    .then((result) => {
      setApiData(result.data);
      setDuplicateRooms(result.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("api is not called due to ", err);
      window.location.href = "*";
    });
   },)
  }, []);

  function filterByDates(dates) {
    setToDate(moment(dates[0]).format("DD-MM-YYYY"));
    setFromDate(moment(dates[1]).format("DD-MM-YYYY"));
    const sD = new Date(moment(dates[0]).format("DD-MM-YYYY"));
    const eD = new Date(moment(dates[1]).format("DD-MM-YYYY"));
    if(sD<eD) {
      console.log("end date is greater")
    }else{
      console.log("start date is greater ")
    }
    let tempRooms = [];
    let available = false;
    //traverse in the rooms database

    for (let room of duplicateRooms) {
      if (room.currentbooking.length > 0) {
        for (let booking of room.currentbooking) {
          // 1.check dates are b/w them
          if (
            !moment(
              moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) &&
            !moment(
              moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            )
          ) {
            // then dates not equal to selected dates
            if (
              moment(dates[0]).format("DD-MM-YYYY") != booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") != booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") != booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") != booking.todate
            ) {
              available = true;
            }
          }
        }
      }
      if ((available = true || room.currentbooking.length == 0)) {
        tempRooms.push(room);
      }
      setApiData(tempRooms);
    }
  }

  function filterRooms() {
    const tempRooms = duplicateRooms.filter(item=>item.name.toLowerCase().includes(searchValue.toLowerCase()));
    setApiData(tempRooms);
  }

  function filterByType (e) {
    if(e!="all") {
      const typeRoom = duplicateRooms.filter(item=>item.roomtype.toLowerCase()==e.toLowerCase())
      setApiData(typeRoom)  
    }else{
      
      setApiData(duplicateRooms)
    }
  }

  return (
    <div className="roomMainDiv">
      <div className="filter">
        <div className="date">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDates}  />
        </div>
        <div className="date">
          <input type='text' className="form-control roomSearch" placeholder="search rooms" 
          onChange={(e)=>setSearchValue(e.target.value)}
          onKeyUp={filterRooms}
          />
        </div>
        <div className="date">
          <select  onChange={(e)=>{filterByType(e.target.value)}} className='typeFilter'>
            <option value="all" >ALL</option>
            <option value="delux">delux</option>
            <option value="nondelux">Non-Delux</option>
          </select>
        </div>
      </div>
      <div className="parent">
        {loading ? (
           <div className="roomWaiting"> 
           <HashLoader size={250} />
           </div>
        ) : (
          apiData.map((item) => {
            return (
              <div className="card">
                <img src={item.images[0]} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <h4>Max Count:{item.maxcount}</h4>
                  <h4>Phone:{item.phone}</h4>
                  <h4>type:{item.roomtype}</h4>
                  <h4>
                    Price:
                    <span className="badge bg-secondary price">
                      {item.rent}₹
                    </span>
                  </h4>
                  {/* check button is only visible when user login or select dates */}
                  {(JSON.parse(sessionStorage.getItem("userInfo")))&&(fromDate && toDate)?
                  (
                    <Link to={`/book/${item._id}/${toDate}/${fromDate}`}>
                    <button className="view">View Details</button>
                  </Link>
                  ):(
                    <></>
                  )
                  }
                 
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
