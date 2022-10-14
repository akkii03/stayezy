import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [info,setInfo] = useState();
    const [loading,setLoading] = useState(true)
    const {id} = JSON.parse(sessionStorage.getItem("userInfo"))

    useEffect(()=>{
        axios.get(`https://stayezy.herokuapp.com/user/${id}`)
        .then((res=>{
            setInfo(res.data)
            setLoading(false)
        }))
        .catch(err=>console.log("api falied due to ",err))
    },[])

  return (
    <div>
     {
        loading?("loading..."):(
            <div className='Psection'>
             <h1> Personal Section</h1>
            <br></br>
            
                <p>
                    <b>Name:</b>{info.name}
                </p>
                <p>
                   <b> Email:</b>{info.email}
                </p>
                <p>
                   <b> Phone:</b>{info.phone}
                </p>
            
            </div>
        )
     }
    </div>
  )
}
