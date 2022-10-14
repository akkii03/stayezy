import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";


export default function MyBooking() {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = JSON.parse(sessionStorage.getItem("userInfo"));
  useEffect(() => {
    axios
      .get(`https://stayezy.herokuapp.com/booking/${id}`)
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch((err) => console.log("api is not called", err));
  }, []);

  function cancelRoom(bookId, roomID) {
    axios
      .post("https://stayezy.herokuapp.com/cancel/booking", { bookId, roomID })
      .then((res) =>
        Swal.fire(
          "congratulations",
          "Room Cancelled Successfully !",
          "success"
        ).then((click) => window.location.reload())
      )
      .catch((err) =>
        Swal.fire("Opps !", "Room was not Cancelled  !", "error")
      );
  }

  return (
    <div>
      <h1 className="heading">Booking Section</h1>
      {loading
        ? "loading..."
        : info.map((item) => {
          return (
            <div className="infoDiv">
            <p>
              <b>Room Name: </b>
              {item.room}
            </p>
            <p>
              <b>Booking Id :</b>
              {item._id}
            </p>
            <p>
              <b>Check-IN :</b>
              {item.fromdate}
            </p>
            <p>
              <b>Check-OUT :</b>
              {item.todate}
            </p>
            <p>
              <b>Amount :</b>
              {item.totalamount}
            </p>
            <p>
              <b>Status :</b>
              {item.status == "Booked" ? (
                <Tag color="green">CONFIRMED</Tag>
              ) : (
                <Tag color="red">CANCELLED</Tag>
              )}
            </p>
            {item.status == "Booked" && (
              <div className="text-right">
                <button
                  className=" view"
                  onClick={() => {
                    cancelRoom(item._id, item.roomid);
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
          );
        })
          
      }
    </div>
  );
}
