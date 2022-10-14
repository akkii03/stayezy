import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';


export default function ResponsiveAppBar() {
 
  const info = JSON.parse(sessionStorage.getItem("userInfo"));
  let userInfo;
  if(info){
    userInfo = info.name
  }
function logout () {
  sessionStorage.clear();
  window.location.href = "/login";
}

  return (
    <div className='navBarDiv'>
      <AppBar style={{color:"white",backgroundColor:"black"}}> 
        <Toolbar>
        <Link to="/">
        <Typography style={{fontSize:"40px",color:"white"}}>StayEzy</Typography>
        </Link>

        <div className='navItem'>
        <div className='navLinks'>
        <Link to="/rooms" className='link'>
        Rooms
        </Link>
        </div >
        {
          userInfo?(<>
            <div className="dropdown loginMenu">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {userInfo}
  </button>
  <ul class="dropdown-menu">
  <Link to="/profile" className='className="dropdown-item"'> <li> <a className="dropdown-item" >Profile</a></li> </Link> 
    <li><a className="dropdown-item"  onClick={logout}>Logout</a></li>
  </ul>
</div>          
          </>):(<>
            <div  className='navLinks'>
            <Link to="/register" className='link'>
            <i class="fa-solid fa-person-simple icon2"></i>
            Register
            </Link>
            </div>
          <div  className='navLinks'>
          <Link to="/login" className='link'>
    <i class="fa-solid fa-user icon"></i>
            Login
            </Link>
           </div>
          </>)
        }
        </div>
       
        </Toolbar>
      </AppBar>
    </div>
  )
}
