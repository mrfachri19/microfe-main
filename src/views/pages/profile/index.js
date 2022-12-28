// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@src/views/components/breadcrumbs'
import illustration from '@src/assets/images/illustration/email.svg'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components
import ProfileHeader from './ProfileHeader'
import ProfileSidebar from './ProfileSidebar'
import ProfileSubtab from './ProfileSubtab'
// import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfileEmployeeData from './ProfileEmployeeData'
import ProfileEmployeeKomunikasiData from './ProfileEmployeeKomunikasiData'
import ProfileEmployeeDokumen from './ProfileEmployeeDokumen'
import ProfileEmployeeFamily from './ProfileEmployeeFamily'
import ProfileEmployeeEducation from './ProfileEmployeeEducation.js'
import ProfileEmployeeJobdesc from './ProfileEmployeeJobdesc'
import ProfileEmployeeAchievement from './ProfileEmployeeAchievement.js'
import ProfileEmployeeStatus from './ProfileEmployeeStatus'
import ProfileEmployeeDinas from './ProfileEmployeeDinas.js'
import ProfileEmployeeTraining from './ProfileEmployeeTraining'
import ProfileEmployeeCertification from './ProfileEmployeeCertification.js'
import ProfileEmployeeTeam from './ProfileEmployeeTeam'
import ProfileEmployeeCV from './ProfileEmployeeCV';
import { updateRedux } from './store';

// import ProfilePosts from './ProfilePosts'
// import ProfileTwitterFeeds from './ProfileTwitterFeeds'
// import ProfileLatestPhotos from './ProfileLatestPhotos'
// import ProfileSuggestedPages from './ProfileSuggestedPages'
// import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'
import CardTimeline from "@src/views/components/cards/timeline";

import { getProfileUser } from "@src/api";
import { getUserData } from "@src/utils/storage.js";

// ** Styles
import '@styles/react/pages/page-profile.scss'

const Profile = () => {
  // ** States
  const dispatch = useDispatch();
  let { nik } = useParams();
  const [data, setData] = useState({});
  const [block, setBlock] = useState(false);
  const { profileRedux } = useSelector((state) => state.profile);
  const [searchParams] = useSearchParams();
  const tabSelect = searchParams.get("tab");
  const subTabSelect = searchParams.get("subtab");

  const datauser = getUserData();
  nik = nik || datauser.user;

  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  function getInfoUser() {
    getProfileUser(`/${nik}`).then((res) => {
      setData(res.data.data);
    })
  }

  useEffect(() => {
    if (tabSelect && subTabSelect) {
      const index = profileRedux.listMainTabsProfile.indexOf(tabSelect);
      dispatch(updateRedux({
        tabProfile : tabSelect, 
        tabProfileIndex : index,
        subTabProfile : subTabSelect
      }));
    } else if (tabSelect && !subTabSelect){
      const index = profileRedux.listMainTabsProfile.indexOf(tabSelect);
      dispatch(updateRedux({
        tabProfile : tabSelect, 
        tabProfileIndex : index,
        subTabProfile : profileRedux.availableTabsProfile[index].listChild[0] || tabSelect
      }));
    }
  }, []);

  useEffect(() => {
    getInfoUser();
    if (!nik) {
      dispatch(updateRedux({
        tabProfile : "info",
        tabProfileIndex : 0,
        subTabProfile : "about",
      }));
    }
  }, [nik]);

  return (
    <Fragment>
      <Breadcrumbs title='Profile' data={[{ title: 'Profile' }]} />
      <div id='user-profile'>
        <Row>
          <Col sm='12'>
            <ProfileHeader dataHeader={data} />
          </Col>
        </Row>
        <section id='profile-info'>
          <Row>
            <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
              {
                (profileRedux.tabProfile == 'social') ? 
                <ProfileSidebar userId={data.id} />:<></>
              }
              <ProfileSubtab />
            </Col>
            <Col lg={{ size: 9, order: 2 }} sm={{ size: 12 }} xs={{ order: 2 }}>
              {profileRedux.subTabProfile == 'about' ? (
                <ProfileAbout nik={nik} data={data} />
              ) : profileRedux.subTabProfile == 'team' ? (
                <ProfileEmployeeTeam nik={nik}/>
              ) : profileRedux.subTabProfile == 'userdata' ? (
                <ProfileEmployeeData nik={nik} data={data} />
              ) : profileRedux.subTabProfile == 'komunikasi' ? (
                <ProfileEmployeeKomunikasiData nik={nik} data={data} />
              ) : profileRedux.subTabProfile == 'family' ? (
                <ProfileEmployeeFamily nik={nik} data={data} />
              ) : profileRedux.subTabProfile == 'education' ? (
                <ProfileEmployeeEducation nik={nik} data={data} />
              ) : profileRedux.subTabProfile == 'dokument' ? (
              <ProfileEmployeeDokumen nik={nik} data={data}/>
              ) : profileRedux.subTabProfile == 'jobdesk' ? (
              <ProfileEmployeeJobdesc nik={nik} />
              ) : profileRedux.subTabProfile == 'social' ? (
              <CardTimeline dataId={data.id}/>
              ) : profileRedux.subTabProfile == 'dinas' ? (
              <ProfileEmployeeDinas nik={nik} data={data}/>
              ) : profileRedux.subTabProfile == 'status' ? (
              <ProfileEmployeeStatus data={data} />
              ) : profileRedux.subTabProfile == 'training' ? (
              <ProfileEmployeeTraining nik={nik} data={data}/>
              ) : profileRedux.subTabProfile == 'certificate' ? (
              <ProfileEmployeeCertification nik={nik} data={data} />
              ) : profileRedux.subTabProfile == 'achievement' ? (
              <ProfileEmployeeAchievement nik={nik} data={data} />
                ) : profileRedux.subTabProfile == 'cv' ? (
              <ProfileEmployeeCV data={data} />) : null}
            </Col>
          </Row>
        </section>
      </div>
    </Fragment>
  )
}

export default Profile
