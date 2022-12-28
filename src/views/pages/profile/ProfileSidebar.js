// ** Reactstrap Imports
import { Card } from 'reactstrap';
import { getFriend, getCommunity } from "@src/api";
import React, { useEffect, useState, Fragment } from "react";

const ProfileSidebar = ({ userId }) => {
  const [listFriend, setFriend] = useState([]);
  const [listCommunity, setComunity] = useState([]);

  function getFriendList() {
    getFriend(
      `/${userId}/1/0`
    ).then((res) => {
      var tempList = [];
      tempList = res.data || [];
      setFriend(tempList);
    });
    getCommunity(
      `/${userId}/500/0`
    ).then((res) => {
      var tempList = [];
      tempList = res.data || [];
      setComunity(tempList);
    });
  }
  useEffect(() => {
    if (userId) getFriendList();
  }, [userId]);
  
  return (
    <Card className='profile-sidebar mb-7'>
      <div className='sidebar-content p-4'>
        <span>{!Array.isArray(listFriend) ? listFriend.count : 0}</span>
        <span>Teman</span>
      </div>
      <div className='sidebar-content p-4'>
        <span>{!Array.isArray(listCommunity) && listCommunity !== null && listCommunity.status == 200 ? listCommunity.data.length : 0}</span>
        <span>Komunitas</span>
      </div>
    </Card>
  )
}

export default ProfileSidebar
