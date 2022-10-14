import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import Profile from './Profile';
import MyBooking from './MyBooking';


export default function ProfileScreen() {
  return (
    <div className='profileTabs'>
       <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Bookings" key="1">      
        <MyBooking/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="profile" key="2">
    <Profile/>
    </Tabs.TabPane>
    
  </Tabs>
    </div>
  )
}



