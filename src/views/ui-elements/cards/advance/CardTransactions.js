// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'

// ** Icons Imports
import { Heart, MessageSquare, Share2 } from 'react-feather'

import React, { useEffect, useState, Fragment } from "react";
import ScrollBar from "react-perfect-scrollbar";

import { getNewsfeedHome, likePost, unLikePost } from '../../../../api'

import birthdayImg from '@src/assets/img/Birthday.svg';

// ** Reactstrap Imports
import { Badge, Card, CardHeader, Row, Col, CardTitle, CardBody, CardFooter, CardText, Label, Button, Input } from 'reactstrap'

import { Link } from 'react-router-dom';

import { Earth16Filled, PersonLock16Filled, CaretRight24Regular } from "@fluentui/react-icons";

// ** Icons Imports
import {
  ChevronRightRegular
} from "@fluentui/react-icons";

const CardTransactions = () => {

  const [listNewsfeed, setlistNewsfeed] = useState([]);

  function getNewsfeedHomeData() {
    getNewsfeedHome(
      `${localStorage.getItem("userId")}/20/0?appVersion=5.0.5&language=en`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List data Newsfeed => ", tempList);
      setlistNewsfeed(tempList);
    });
  }

  function actionlikePost(id) {
    let check = document.getElementById(`like-${id}`).getAttribute("data-id");
    if (check === 'true') {
      unLikePost(
        `/${localStorage.getItem("userId")}/post/${id}`
      ).then((res) => {
         // console.log(res)
        if (res.data.status === '200') {
          document.getElementById(`like-${id}`).setAttribute("fill", 'none');
          document.getElementById(`like-${id}`).setAttribute("data-id", false);
          let newTotal = Number(document.getElementById(`like-count-${id}`).innerText) - 1;
          if (newTotal == 0) {
            document.getElementById(`like-count-${id}`).textContent = null;
            document.getElementById(`likesBy-${id}`).textContent = null;
          } else {
            document.getElementById(`like-count-${id}`).textContent = newTotal;
          }
          
        }
      })
    } else if (check === 'false') {
      likePost(
        {
          "emoji": 1,
          "type": "post",
          "typeId": id,
          "userId": localStorage.getItem("userId")
        }
      ).then((res) => {
         // console.log(res)
        if (res.data.status === '200') {
          document.getElementById(`like-${id}`).setAttribute("fill", 'red');
          document.getElementById(`like-${id}`).setAttribute("data-id", true);
          let newTotal = Number(document.getElementById(`like-count-${id}`).innerText) + 1;
          document.getElementById(`like-count-${id}`).textContent = newTotal;
        }
      })
    }
  }

  useEffect(() => {
    getNewsfeedHomeData();
  }, []);

  function mapPrivacy(id) {
    if (id == 1) {
      return <Earth16Filled style={{ width: "24px", color: "#A0AEC0" }} height="100%" />
    } else if (id == 2) {
      return <Earth16Filled style={{ width: "24px", color: "#A0AEC0" }} height="100%" />
    } else if (id == 3) {
      return <Earth16Filled style={{ width: "24px", color: "#A0AEC0" }} height="100%" />
    } else if (id == 4) {
      return <PersonLock16Filled style={{ width: "24px", color: "#A0AEC0" }} height="100%" />
    } else if (id == 5) {
      return <Earth16Filled style={{ width: "24px", color: "#A0AEC0" }} height="100%" />
    } else if (id == 6) {
      return <Earth16Filled style={{ width: "24px", color: "#A0AEC0" }} height="100%" />
    } else if (id == 7) {
      return <Earth16Filled style={{ width: "24px", color: "#A0AEC0" }} height="100%" />
    }
  }

  const renderTransactions = () => {
    return listNewsfeed.map(item => {
      return (
        <Card className='card-transaction bg-tertiary-100'>
          <CardBody>
            <>
              {
                item.community ? (
                  <>
                    <div className='d-flex justify-content-start align-items-center mb-1'>
                      <Avatar className='me-1 photo-karyawan' img={item.community.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                      <div className='profile-user-info'>
                        <div>
                          <small className='mb-0'>{item.community.title}</small>
                        </div>
                        <div>
                          <small className='text-muted'>{item.updatedAt}</small>
                          <small className='text-muted'>{mapPrivacy(item.privacy)}</small>
                        </div>
                      </div>
                    </div>
                  </>
                ) : item.page ? (<>
                  <div className='d-flex justify-content-start align-items-center mb-1'>
                    <Avatar className='me-1 photo-karyawan' img={item.page.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                    <div className='profile-user-info'>
                      <div>
                        <small className='mb-0'>{item.page.title}</small>
                      </div>
                      <div>
                        <small className='text-muted'>{item.updatedAt}</small>
                        <small className='text-muted'>{mapPrivacy(item.privacy)}</small>
                      </div>
                    </div>
                  </div></>
                ) : item.receiver ? (
                  <div className='d-flex justify-content-start align-items-center mb-1'>
                    <Avatar className='me-1 photo-karyawan' img={item.owner.avatar} imgHeight='40' imgWidth='40' />
                    <div className='profile-user-info'>
                      <div>
                        <small>{item.owner.fullname.substr(0, 15)}</small>
                      </div>
                      <div>
                        <small>{item.owner.jabatan.substr(0, 15)}</small>
                      </div>
                      <div>
                        <small className='text-muted'>{item.updatedAt}</small>
                        <small className='text-muted'>{mapPrivacy(item.privacy)}</small>
                      </div>
                    </div>
                    <div>
                      <CaretRight24Regular />
                    </div>
                    <div className='d-flex justify-content-start align-items-center mb-1'>
                      <Avatar className='me-1 photo-karyawan' img={item.receiver.avatar} imgHeight='40' imgWidth='40' />
                      <div className='profile-user-info'>
                        <div>
                          <small>{item.receiver.fullname.substr(0, 15)}</small>
                        </div>
                        <div>
                          <small>{item.receiver.jabatan.substr(0, 15)}</small>
                        </div>
                        <div>
                          <small>&nbsp;</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : <>
                  <div className='d-flex justify-content-start align-items-center mb-1'>
                    <Avatar className='me-1 photo-karyawan' img={item.owner.avatar} imgHeight='40' imgWidth='40' />
                    <div className='profile-user-info'>
                      <div>
                        <small className='mb-0'>{item.owner.fullname}</small>
                      </div>
                      <div>
                        <small className='mb-0'>{item.owner.jabatan}</small>
                      </div>
                      <div>
                        <small className='text-muted'>{item.updatedAt}</small>
                        <small className='text-muted'>{mapPrivacy(item.privacy)}</small>
                      </div>
                    </div>
                  </div>
                </>
              }
            </>
            {item.sharedSource ? (
              <Card className='card-transaction bg-tertiary-200'>
                <CardBody>
                  <>
                    {
                      item.sharedSource.community ? (
                        <>
                          <div className='d-flex justify-content-start align-items-center mb-1'>
                            <Avatar className='me-1 photo-karyawan' img={item.sharedSource.community.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                            <div className='profile-user-info'>
                              <div>
                                <small className='mb-0'>{item.sharedSource.community.title}</small>
                              </div>
                              <div>
                                <small className='text-muted'>{item.sharedSource.updatedAt}</small>
                                <small className='text-muted'>{mapPrivacy(item.sharedSource.privacy)}</small>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : item.sharedSource.page ? (<>
                        <div className='d-flex justify-content-start align-items-center mb-1'>
                          <Avatar className='me-1 photo-karyawan' img={item.sharedSource.page.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                          <div className='profile-user-info'>
                            <div>
                              <small className='mb-0'>{item.sharedSource.page.title}</small>
                            </div>
                            <div>
                              <small className='text-muted'>{item.sharedSource.updatedAt}</small>
                              <small className='text-muted'>{mapPrivacy(item.sharedSource.privacy)}</small>
                            </div>
                          </div>
                        </div></>
                      ) : <>
                        <div className='d-flex justify-content-start align-items-center mb-1'>
                          <Avatar className='me-1 photo-karyawan' img={item.sharedSource.owner.avatar} imgHeight='40' imgWidth='40' />
                          <div className='profile-user-info'>
                            <div>
                              <small className='mb-0'>{item.sharedSource.owner.fullname}</small>
                            </div>
                            <div>
                              <small className='mb-0'>{item.sharedSource.owner.jabatan}</small>
                            </div>
                            <div>
                              <small className='text-muted'>{item.sharedSource.updatedAt}</small>
                              <small className='text-muted'>{mapPrivacy(item.sharedSource.privacy)}</small>
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  </>
                  {item.sharedSource.contentType == 'image' && item.sharedSource.sharedSource == null ? (
                    item.sharedSource.typeContent.map(content => (
                      <img src={content.replace('_%d_', '_960_')} className='img-fluid rounded mb-75' />
                    ))
                  ) : item.sharedSource.contentType == 'vidio' && item.sharedSource == null ? (
                    item.sharedSource.typeContent.map(content => (
                      <iframe src={content.replace('_%d_', '_960_')} className='w-100 rounded height-250 mb-50 border-0'></iframe>
                    ))
                  ) : null}
                  {item.sharedSource.birthdayCardId ? (
                    <img src={birthdayImg} className='img-fluid rounded mb-75' />
                  )
                    : null}
                  <CardText>{item.sharedSource.text}</CardText>
                </CardBody>
              </Card>
            ) : null}
            {item.contentType == 'image' && item.sharedSource == null ? (
              item.typeContent.map(content => (
                <img src={content.replace('_%d_', '_960_')} className='img-fluid rounded mb-75' />
              ))
            ) : item.contentType == 'vidio' && item.sharedSource == null ? (
              item.typeContent.map(content => (
                <iframe src={content.replace('_%d_', '_960_')} className='w-100 rounded height-250 mb-50 border-0'></iframe>
              ))
            ) : null}
            {item.birthdayCardId ? (
              <img src={birthdayImg} className='img-fluid rounded mb-75' />
            )
              : null}
            <CardText>{item.text}</CardText>
            <Row className='d-flex justify-content-start align-items-center flex-wrap pb-50 post-actions'>
              <Col className='d-flex justify-content-between justify-content-sm-start mb-2' sm='6'>
                <div className='d-flex align-items-center text-muted text-nowrap cursor-pointer'>
                  <Heart id={`like-${item.id}`}
                    data-id={item.alreadyLike}
                    fill={item.alreadyLike ? 'red' : 'none'}
                    onClick={(e => actionlikePost(item.id))}
                    size={18}
                    className='text-body mx-50 profile-likes'
                  />
                  <div id={`like-count-${item.id}`}>{item.expressionsCount ? (item.expressionsCount) : null}</div>
                  <MessageSquare size={18} className='text-body mx-50' />
                  {item.commentsCount ? (item.commentsCount) : null}
                  <Share2 size={18} className='text-body mx-50'></Share2>
                  {item.sharedCount ? (item.sharedCount) : null}
                </div>
              </Col>
              <Col className='d-flex justify-content-between justify-content-sm-end align-items-center mb-2' sm='6'>
                <div className='d-flex align-items-center text-muted text-nowrap cursor-pointer'>
                  <span className='align-middle ms-25 text-muted' id={`likesBy-${item.id}`}>{item.likesBy}</span>
                </div>
              </Col>
            </Row>
            {item.comments.map(comment => (
              <div key={comment.id} className='d-flex align-items-start mb-1'>
                <Avatar img={comment.owner.avatar} className='mt-25 me-75' imgHeight='34' imgWidth='34' />
                <div className='profile-user-info w-100'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <small className='mb-0'>{comment.owner.fullname}</small>
                  </div>
                  <small>{comment.text}</small>
                </div>
              </div>
            ))}
            {/* <div>
              <fieldset className='form-label-group mb-50'>
                <div className='col-sm-12 row'>
                  <div className='col-sm-10'><Input type='input' placeholder='Add Comment' /></div>
                  <div className='col-sm-2'><Button color='primary' size='md'>Send</Button></div>
                </div>
              </fieldset>
            </div> */}
          </CardBody>
        </Card>
      )
    })
  }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4' className='card-title'>Linimasa</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: "435px" }}>
          <ScrollBar>
            <div>{renderTransactions()}</div>
          </ScrollBar>
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-row-reverse">
          <Link to={"/app/todo"} className="fw-bold">
            <Badge tag='div' color='light-primary' pill>
              <span className="">Lihat Selengkapnya <ChevronRightRegular className="fs-6" height="100%" /></span>
            </Badge>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardTransactions
