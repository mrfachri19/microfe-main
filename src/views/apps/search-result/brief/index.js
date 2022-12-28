// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components

import React, { useEffect, useState, Fragment } from "react";

// ** Reactstrap Imports
import { Badge, Card, CardHeader, Row, Col, CardTitle, CardBody, CardFooter, CardText, Label, Button, Input } from 'reactstrap'

import { postSearch } from '../../../../api'

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import { PersonAdd16Regular } from "@fluentui/react-icons";

import {
  ChevronRightRegular
} from "@fluentui/react-icons";

const Search = () => {

  const keyword = useSelector((state) => state.navbar.keyword);

  const [resultListEmployees, setResultListEmployees] = useState([]);

  const [resultListCommunities, setResultListCommunities] = useState([]);
  function getResultListEmployees() {
    postSearch(
      {
        "action": 1,
        "keyword": keyword,
        "limit": 5,
        "offset": 0
      }
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List data searching karyawan => ", tempList);
      setResultListEmployees(tempList);
    });
  }

  function getResultListCommunities() {
    postSearch(
      {
        "action": 2,
        "keyword": keyword,
        "limit": 5,
        "offset": 0
      }
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List data searching komunitas => ", tempList);
      setResultListCommunities(tempList);
    });
  }

  useEffect(() => {
    getResultListEmployees();
    getResultListCommunities();
  }, []);

  const renderListEmployees = () => {
    return resultListEmployees.map(item => {
      return (
        <>
          <div className='row'>
            <div className='d-flex justify-content-start align-items-center mb-1 col-sm-9'>
              <Avatar className='me-1 photo-karyawan' img={item.avatar} imgHeight='40' imgWidth='40' />
              <div className='profile-user-info'>
                <div>
                  <small className='text-bold'>{item.fullname} | {item.username}</small>
                </div>
                <div>
                  <small className='text-muted'>{item.jabatan}</small>
                </div>
                <div>
                  <small className='text-muted'>{item.perusahaan}</small>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center col-sm-3'>
              {item.friendshipStatus == 2 ? (
                <Button color='primary' size='sm' className='m-auto'><PersonAdd16Regular /> Tambahkan Pertemanan</Button>
              ) : item.friendshipStatus == 1 ? (
                <Button color='secondary' size='sm' className='m-auto'><PersonAdd16Regular /> Hapus Pertemanan</Button>
              )
                : <Button color='info' size='sm' className='m-auto'><PersonAdd16Regular /> Menunggu Persetujuan</Button>}
            </div>
          </div>
          <hr />
        </>
      );
    });
  }

  const renderListCommunities = () => {
    return resultListCommunities.map(item => {
      return (
        <>
          <div className='row'>
            <div className='d-flex justify-content-start align-items-center mb-1 col-sm-9'>
              <Avatar className='me-1 photo-karyawan' img={item.avatar} imgHeight='40' imgWidth='40' />
              <div className='profile-user-info'>
                <div>
                  <small className='text-bold'>{item.fullname}</small>
                </div>
                <div>
                  <small className='text-muted'>{item.totalMember} Member</small>
                </div>
              </div>
            </div>
            <div className='d-flex col-sm-3'>
              {item.member ? (
                <Button color='secondary' className='m-auto' size='sm'><PersonAdd16Regular /> Berhenti Ikuti</Button>
              )
                : <Button color='primary' className='m-auto' size='sm'><PersonAdd16Regular /> Ikuti</Button>}
            </div>
          </div>
          <hr />
        </>
      );
    });
  }
  return (
    <>
      <Card className='card-transaction'>
        <CardHeader>
          <CardTitle tag='h3' className='card-title font-weight-bold'>Karyawan</CardTitle>
        </CardHeader>
        <CardBody>
          {renderListEmployees()}
          {resultListEmployees.length > 0 ? (
            null
          )
            : <h6 className='d-flex justify-content-center text-muted'>Hasil Pencarian Tidak Ada</h6>}
        </CardBody>
        {resultListEmployees.length > 0 ? (
          <CardFooter>
            <div className="d-flex justify-content-center">
              <Link to={"/apps/search/employees"} className="fw-bold">
                <span className="">Lihat Semua Hasil Karyawan</span>
              </Link>
            </div>
          </CardFooter>
        )
          : null}
      </Card>

      <Card className='card-transaction'>
        <CardHeader>
          <CardTitle tag='h3' className='card-title font-weight-bold'>Komunitas</CardTitle>
        </CardHeader>
        <CardBody>
          {renderListCommunities()}
          {resultListCommunities.length > 0 ? (
            null
          )
            : <h6 className='d-flex justify-content-center text-muted'>Hasil Pencarian Tidak Ada</h6>}
        </CardBody>
        {resultListCommunities.length > 0 ? (
          <CardFooter>
            <div className="d-flex justify-content-center">
              <Link to={"/apps/search/communities"} className="fw-bold">
                <span className="">Lihat Semua Hasil Komunitas</span>
              </Link>
            </div>
          </CardFooter>
        )
          : null}
      </Card>

    </>
  );
};

export default Search
