import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Tag, Tabs } from "antd";
import { HashLoader } from "react-spinners";

export default function AdminScreen() {
  return (
    <div>
      <h1 className="adminTitle">Admin Panel</h1>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Rooms" key="1">
          <Rooms />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bookings" key="2">
          <BookingTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add-Room" key="3">
          <AddRoom />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export function Rooms() {
  const [allRooms, setRooms] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://stayezy.herokuapp.com/allrooms")
        .then((res) => {
          setRooms(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("api is not called due to ", err);
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader">
          <HashLoader size={250} />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">RoomName</th>
              <th scope="col">Price/Day</th>
              <th scope="col">Room Type</th>
            </tr>
          </thead>
          <tbody>
            {allRooms.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.rent}</td>
                  <td>{item.roomtype}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function BookingTab() {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://stayezy.herokuapp.com/bookings")
        .then((res) => {
          setStatus(res.data);
          setLoading(false);
        })
        .catch((err) => console.log("api is not called due to ", err));
    }, 1000);
  }, []);


  return (
    <div className="bookingStatus">
      {loading ? (
        <div className="loader">
          <HashLoader size={250} />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Check IN</th>
              <th scope="col">Check OUT</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {status.map((item) => {
              return (
                <tr>
                  <td>{item.roomid}</td>
                  <td>{item.userInfo.name}</td>
                  <td>{item.userInfo.email}</td>
                  <td>{item.fromdate}</td>
                  <td>{item.todate}</td>
                  <td>
                    {item.status == "Booked" ? (
                      <Tag color="green">CONFIRMED</Tag>
                    ) : (
                      <Tag color="red">CANCELLED</Tag>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function AddRoom() {
  const [error,setError] = useState(false)
  const [success,setSuccess] = useState(false)
  
  const [newRoom, setNewRoom] = useState({
    name: "",
    maxcount: "",
    phone: "",
    rent:  "",
    images: [],
    roomtype: "",
    description: "",
  });
  const [url1,setUrl1] = useState();
  const [url2,setUrl2] = useState();
  const [url3,setUrl3] = useState();
  let name,value;
  function handelInput(e) {
    name = e.target.name;
    value = e.target.value;
    setNewRoom({...newRoom,[name]:value})
  }

  function roomAdd(e) {
    e.preventDefault();
    if(url1 || url2 || url3) {
      newRoom.images = [url1,url2,url3]
    }
    const imgArr = newRoom.images.filter(item=>item!=undefined)
    newRoom.images = imgArr;
    axios.post("https://stayezy.herokuapp.com/addroom",{newRoom})
    .then(res=>{
    setSuccess(true);
  })
    .catch(err=>{
    setError(true);
    })
  }

  return (
    <div className="addRoom">
      <form onSubmit={roomAdd}>
        <div className="leftpart">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Room Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Room Name"
            name='name'
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Max Person
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Max Person"
            name='maxcount'
            onChange={handelInput}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Phone
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Phone Number"
            name='phone'
            onChange={handelInput}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Rent
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Rent Per Day"
            name='rent'
            onChange={handelInput}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Images URL 1
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="image Url"
            onChange={(e)=>setUrl1(e.target.value)}
          />
        </div>
        </div>

      <div className="rightpart">
      <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Images URL 2
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="image Url"
            onChange={(e)=>setUrl2(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Images URL 3
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="image Url"
            onChange={(e)=>setUrl3(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Room Type
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="type of Room"
            name='roomtype'
            onChange={handelInput}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Room Description"
            name='description'
            onChange={handelInput}
          />
        </div>

        <button type="submit" className="btn btn-primary submit">
          Submit
        </button>
      </div>
        
      </form>

      {
        success && <Alert message="Room is added Successfully" type="success" />
      }
      {
        error &&     <Alert message="Opps ! Something went wrong" type="error" />
      }
    </div>
  );
}
