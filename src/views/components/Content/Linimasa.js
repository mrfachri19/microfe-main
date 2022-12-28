import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import ScrollBar from "react-perfect-scrollbar";
import parse from 'html-react-parser';

// ** Custom Components
import Avatar from '@components/avatar'

// ** Blank Avatar Image
import blankAvatar from "@src/assets/images/avatars/avatar-blank.png";
import NoData from '@src/assets/img/404-page.svg';
import birthdayImg from '@src/assets/img/Birthday.svg';


// ** Icons Imports
import { Heart, MessageSquare, Share2 } from 'react-feather'
import { Earth16Filled, PersonLock16Filled, CaretRight24Regular, ChevronRightRegular } from "@fluentui/react-icons";

import { storeDataModal, toggleImageModal } from '@store/modalToggle';
import { getNewsfeedHome, likePost, unLikePost, commentPost, loadCommentById, deleteCommentById } from '@src/api'


// ** Reactstrap Imports
import { Badge, Card, CardHeader, Row, Col, CardTitle, CardBody, CardFooter, CardText, Button, Input } from 'reactstrap'


const ContentLinimasa = ({dataId}) => {
    const dispatch = useDispatch();
    const [listNewsfeed, setlistNewsfeed] = useState([]);
    const { userData } = useSelector((state) => state.auth);

    //  // console.log(dataId)
    function getNewsfeedHomeData() {
        let uid = dataId || userData.id_user
         // console.log(uid)
        getNewsfeedHome(
            `${uid}/20/0?appVersion=5.0.5&language=en`
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
                `/${userData.id_user}/post/${id}`
            ).then((res) => {
                 // console.log(res)
                if (res.data.status === '200') {
                    document.getElementById(`like-${id}`).classList.toggle("text-secondary");
                    document.getElementById(`like-${id}`).classList.toggle("text-body");
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
                    "userId": userData.id_user
                }
            ).then((res) => {
                 // console.log(res)
                if (res.data.status === '200') {
                    document.getElementById(`like-${id}`).classList.toggle("text-secondary");
                    document.getElementById(`like-${id}`).classList.toggle("text-body");
                    document.getElementById(`like-${id}`).setAttribute("fill", 'var(--bs-secondary)');
                    document.getElementById(`like-${id}`).setAttribute("data-id", true);
                    let newTotal = Number(document.getElementById(`like-count-${id}`).innerText) + 1;
                    document.getElementById(`like-count-${id}`).textContent = newTotal;
                }
            })
        }
    }

    function postComment(id) {
        let text = document.getElementById(`value-comment-post-${id}`).value;
        let html =
            `<div class="d-flex align-items-start mb-1">
                <div class="avatar mt-25 me-75">
                    <img class="" src="https://diarium.telkom.co.id/getfoto/${userData.username}" alt="avatarImg" height="34" width="34">
                </div>
                <div class="profile-user-info w-100">
                    <div class="d-flex align-items-center justify-content-between">
                        <a class="fw-bold" href="/profile/${userData.username}">
                            <small class="mb-0">${userData.nama}</small>
                        </a>
                    </div>
                    <small>${text}</small>
                </div>
            </div>`

        if (text !== '') {
            commentPost(
                {
                    "imgPath": "",
                    "text": text,
                    "type": "post",
                    "typeId": id,
                    "userId": userData.id_user
                }
            ).then((res) => {
                if (res.data.status === '200') {
                    document.getElementById(`comment-post-${id}`).insertAdjacentHTML("beforeend", html);
                }
            })
        }
    }

    function loadComment(id) {
        let html = ""
        let offset = document.getElementById(`load-more-comment-${id}`).getAttribute("data-offset");
        loadCommentById(
            `/post/${id}/${userData.id_user}/10/${offset}`
        ).then((res) => {
            if (res.data.status === '200') {
                res.data.data.forEach(element => {
                    let redirect = '#'
                    if (element.owner.username) {
                        redirect = `/profile/${element.owner.username}`
                    }
                    html += `<div id="comment-${element.id}" class="d-flex align-items-start mb-1">
                            <div class="avatar mt-25 me-75">
                                <img class="" src=${element.owner.avatar} alt="avatarImg" height="34" width="34">
                            </div>
                            <div class="profile-user-info w-100">
                            <div class="row">
                                <div class="col">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <a class="fw-bold" href="${redirect}">
                                            <small class="mb-0">${element.owner.fullname}</small>
                                        </a>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="d-flex align-items-end justify-content-end">
                                        <a class="mb-0" id="comment-delete-${element.id}"></a>
                                    </div>
                                </div>
                            </div>
                                <small>${parse(element.text)}</small>
                            </div>
                        </div>`
                }
                );
                if (parseInt(offset) > 0) {
                    document.getElementById(`comment-post-${id}`).innerHTML += html;
                } else {
                    document.getElementById(`comment-post-${id}`).innerHTML = html;
                }
                res.data.data.forEach(element => {
                    if (element.owner.username == userData.username) {
                        document.getElementById(`comment-delete-${element.id}`).addEventListener("click", function () {
                            deleteComment(element.id, id)
                        }, false);
                        document.getElementById(`comment-delete-${element.id}`).innerHTML = 'x';
                    }
                })
                if ((10 * (parseInt(offset) + 1)) >= res.data.count) {
                    document.getElementById(`load-more-comment-${id}`).style.display = 'none';
                }
                document.getElementById(`load-more-comment-${id}`).setAttribute("data-offset", String((parseInt(offset) + 1)));
            }
        })
    }

    function deleteComment(id, postId) {
        deleteCommentById(
            `/${id}`
        ).then((res) => {
            document.getElementById(`comment-${id}`).remove();
            let newTotal = Number(document.getElementById(`comment-count-${postId}`).innerText) - 1;
            if (newTotal == 0) {
                document.getElementById(`comment-count-${postId}`).textContent = '';
            } else {
                document.getElementById(`comment-count-${postId}`).textContent = newTotal;
            }
        });
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

    function openModal(data) {
      dispatch(toggleImageModal(true));
      dispatch(storeDataModal({
        image : data.src
      }));
    }

    const renderTransactions = () => {
        return listNewsfeed.map(item => {
            return (
                <Card className='card-transaction bg-tertiary-100' key={`post-${item.id}`}>
                    <CardBody>
                        <>
                            {
                                item.community ? (
                                    <>
                                        <div className='d-flex justify-content-start align-items-center mb-1'>
                                            <Avatar className='me-1 mb-auto photo-karyawan ' img={item.community.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                                            <div>&nbsp;&nbsp;</div>
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
                                        <Avatar className='me-1 mb-auto photo-karyawan' img={item.page.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                                        <div>&nbsp;&nbsp;</div>
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
                                        <Avatar className='me-1 mb-auto photo-karyawan' img={item.owner.avatar} imgHeight='40' imgWidth='40' />
                                        <div>&nbsp;&nbsp;</div>
                                        <div className='profile-user-info'>
                                            <div>
                                                <Link to={`/profile/${item.owner.username}`} className="fw-bold">
                                                    <small>{item.owner.fullname.substr(0, 17)}</small>
                                                </Link>
                                            </div>
                                            <div>
                                                <small>{item.owner.jabatan.substr(0, 17)}</small>
                                            </div>
                                            <div>
                                                <small className='text-muted'>{item.updatedAt}</small>
                                                <small className='text-muted'>{mapPrivacy(item.privacy)}</small>
                                            </div>
                                        </div>
                                        <div>
                                            &nbsp; &nbsp; <CaretRight24Regular /> &nbsp; &nbsp;
                                        </div>
                                        <div className='d-flex justify-content-start align-items-center mb-1'>
                                            <Avatar className='me-1 mb-auto photo-karyawan' img={item.receiver.avatar} imgHeight='40' imgWidth='40' />
                                            <div>&nbsp;&nbsp;</div>
                                            <div className='profile-user-info'>
                                                <div>
                                                    <Link to={`/profile/${item.receiver.username}`} className="fw-bold">
                                                        <small>{item.receiver.fullname.substr(0, 17)}</small>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <small>{item.receiver.jabatan.substr(0, 17)}</small>
                                                </div>
                                                <div>
                                                    <small>&nbsp;</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : <>
                                    <div className='d-flex justify-content-start align-items-center mb-1'>
                                        <Avatar className='me-1 mb-auto photo-karyawan' img={item.owner.avatar} imgHeight='40' imgWidth='40' />
                                        <div>&nbsp;&nbsp;</div>
                                        <div className='profile-user-info'>
                                            <div>
                                                <Link to={`/profile/${item.owner.username}`} className="fw-bold">
                                                    <small className='mb-0'>{item.owner.fullname}</small>
                                                </Link>
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
                                                        <Avatar className='me-1 mb-auto photo-karyawan' img={item.sharedSource.community.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                                                        <div>&nbsp;&nbsp;</div>
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
                                                    <Avatar className='me-1 mb-auto photo-karyawan' img={item.sharedSource.page.logo.replace('_%d_', '_960_')} imgHeight='40' imgWidth='40' />
                                                    <div>&nbsp;&nbsp;</div>
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
                                                    <Avatar className='me-1 mb-auto photo-karyawan' img={item.sharedSource.owner.avatar} imgHeight='40' imgWidth='40' />
                                                    <div>&nbsp;&nbsp;</div>
                                                    <div className='profile-user-info'>
                                                        <div>
                                                            <Link to={`/profile/${item.sharedSource.owner.username}`} className="fw-bold">
                                                                <small className='mb-0'>{item.sharedSource.owner.fullname}</small>
                                                            </Link>
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
                                        <div className={`box-img mt-4 mb-7 box-img-${item.sharedSource.typeContent.length}`}>
                                            {item.sharedSource.typeContent.map((content, index) => (
                                            <img key={`post-image-${item.id}-${index}`} src={content.replace('_%d_', '_960_')} className='img-fluid cursor-pointer' onClick={() => openModal({src: content.replace('_%d_', '_960_')})}/>
                                            ))}
                                        </div>
                                    ) : item.sharedSource.contentType == 'vidio' && item.sharedSource == null ? (
                                        item.sharedSource.typeContent.map((content, index) => (
                                            <iframe key={`post-iframe-${item.id}-${index}`} src={content.replace('_%d_', '_960_')} className='w-100 rounded height-250 mb-50 border-0'></iframe>
                                        ))
                                    ) : null}
                                    {item.sharedSource.birthdayCardId ? (
                                        <img src={birthdayImg} className='img-fluid' />
                                    )
                                        : null}
                                    <CardText>{parse(item.sharedSource.text)}</CardText>
                                </CardBody>
                            </Card>
                        ) : null}
                        {item.contentType == 'image' && item.sharedSource == null ? (
                            <div className={`box-img mt-4 mb-7 box-img-${item.typeContent.length}`}>
                                {item.typeContent.map((content, index) => (
                                    <img key={`post-image-${item.id}-${index}`} src={content.replace('_%d_', '_960_')} className='img-fluid cursor-pointer' onClick={() => openModal({src: content.replace('_%d_', '_960_')})} />
                                ))}
                            </div>
                        ) : item.contentType == 'vidio' && item.sharedSource == null ? (
                            item.typeContent.map((content, index) => (
                                <iframe key={`post-iframe-${item.id}-${index}`} src={content.replace('_%d_', '_960_')} className='w-100 rounded height-250 mb-50 border-0'></iframe>
                            ))
                        ) : null}
                        {item.birthdayCardId ? (
                            <img src={birthdayImg} className='img-fluid' />
                        )
                            : null}
                        <CardText>{parse(item.text)}</CardText>
                        <Row className='d-flex justify-content-start align-items-center flex-wrap pb-50 post-actions'>
                            <Col className='d-flex justify-content-between justify-content-sm-start mb-2' sm='6'>
                                <div className='d-flex align-items-center text-muted text-nowrap cursor-pointer'>
                                    <Heart id={`like-${item.id}`}
                                        data-id={item.alreadyLike}
                                        fill={item.alreadyLike ? 'var(--bs-secondary)' : 'none'}
                                        onClick={(e => actionlikePost(item.id))}
                                        size={18}
                                        className={`mx-50 ${item.alreadyLike ? 'text-secondary' : 'text-body'}`}
                                    />
                                    <div id={`like-count-${item.id}`}>{item.expressionsCount ? (item.expressionsCount) : null}</div>
                                    <MessageSquare size={18} className='text-body mx-50' />
                                    <div id={`comment-count-${item.id}`}>{item.commentsCount ? (item.commentsCount) : null}</div>
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
                        <div className="post-comments" id={`comment-post-${item.id}`}>
                            {item.comments.map(comment => (
                                <div id={`comment-${comment.id}`} key={`comment-${comment.id}`} className='d-flex align-items-start mb-1'>
                                    <Avatar img={comment.owner.avatar ? comment.owner.avatar : blankAvatar} className='mt-25 me-75 mb-auto' imgHeight='34' imgWidth='34' />
                                    <div className='profile-user-info w-100'>
                                        <div className='row'>
                                            <Col>
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <Link to={comment.owner.username ? `/profile/${comment.owner.username}` : '#'} className="fw-bold">
                                                        <small className='mb-0'>{comment.owner.fullname}</small>
                                                    </Link>
                                                </div>
                                            </Col>
                                            <Col>
                                                {userData.username == comment.owner.username ? (
                                                    <div className='d-flex align-items-end justify-content-end'>
                                                        <a className='mb-0' onClick={e => deleteComment(comment.id, item.id)}>x</a>
                                                    </div>
                                                ) : null}
                                            </Col>
                                        </div>
                                        <small>{parse(comment.text)}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {item.commentsCount > 2 ?
                            <div className='d-flex justify-content-center mb-1'>
                                <a color='info' size='sm' data-offset="0" id={`load-more-comment-${item.id}`} onClick={(e => loadComment(item.id))}>Load more comment ..</a>
                            </div>
                            : null}
                        <div>
                            <fieldset className='form-label-group mb-50'>
                                <div className='col-sm-12 row'>
                                    <div className='col-sm-10'><Input type='input' id={`value-comment-post-${item.id}`} placeholder='Add Comment' required /></div>
                                    <div className='col-sm-2'><Button color='primary' size='md' onClick={(e => postComment(item.id))}>Send</Button></div>
                                </div>
                            </fieldset>
                        </div>
                    </CardBody>
                </Card>
            )
        })
    }

    return (
        <Card className='card-transaction mb-7'>
            <CardHeader>
                <CardTitle tag='h4' className='card-title'>Linimasa</CardTitle>
            </CardHeader>
            <CardBody>
                <div style={{ height: "435px" }}>
                    <ScrollBar>
                        {listNewsfeed.length > 0 ? (
                            <div>{renderTransactions()}</div>
                        ) :
                            <img alt="..." className="w-100 align-middle border-0" src={NoData} />
                        }
                    </ScrollBar>
                </div>
            </CardBody>
            <CardFooter>
                <div className="d-flex flex-row-reverse">
                    <Link to={"/profile?tab=social"} className="fw-bold">
                        <Badge tag='div' color='light-primary' pill>
                            <span className="">Lihat Selengkapnya <ChevronRightRegular className="fs-6" height="100%" /></span>
                        </Badge>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ContentLinimasa
