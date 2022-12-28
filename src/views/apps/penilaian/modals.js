import React, { Fragment, useEffect, useState } from 'react'
import { 
    Card, 
    CardBody, 
    Input,
} from 'reactstrap'

import Rating from 'react-rating'


import { getQuestionRating, postAnswer} from '../../../api';

import toastAlert from "@src/utils/alert";

import { useNavigate } from 'react-router-dom';

import imgPenilaian from '@src/assets/img/penilaian.svg'

import { useDispatch, useSelector } from "react-redux";

import { toggelRatingModal } from "../../../redux/modalToggle"
import RatingModal from "../../components/Modals/RatingModal"

import EcommerceDashboard from "../../dashboard/ecommerce/index"


const Penilaian = () => {
    const modals = useSelector((state) => state.modal.isRatingModal);
    const dispatch = useDispatch();
    //  // console.log("rating Modal",modals);
    dispatch(toggelRatingModal(modals));
return (
    <Fragment>
            <div>
            {EcommerceDashboard()}
            <RatingModal />
            </div>
    </Fragment>
)};

export default Penilaian;