import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'


export default function Home() {
  const [loginUser,setLoginUser] = useState();
  useEffect(()=>{
    const info = JSON.parse(sessionStorage.getItem("userInfo"))
    setLoginUser(info);
  },[])
  return (
   <div className='mainDis'>
    <div className='homeScrn'>
    <h1 className='hometext'>Book a room & StayEzy</h1>
    {loginUser?(<h1 className='hometext'>welcome back {loginUser.name}</h1>):""}
    
   </div>
   <div className='about'>
    <h1 className='aboutTitle'>StayEzy social Links</h1>
    <p>
      StayEzy provide a room anywhere in the india 
      u can make an account and book a room @ affordable
      price
    </p>
    <footer>
    <div className='social'>
      <a target='_blank' href='https://www.linkedin.com/in/ayush-indoria/' >
    <i class="fa-brands fa-linkedin icons linkedin"></i>
    </a>
    <a target="_blank" href='https://www.instagram.com/aakkii02/' >
    <i class="fa-brands fa-instagram icons " ></i>
    </a>
    </div>
    </footer>
   </div>
   </div>
  )
}
