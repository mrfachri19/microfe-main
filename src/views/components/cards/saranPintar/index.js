// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Badge } from 'reactstrap'

import { Link } from 'react-router-dom';
import ScrollBar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import {toggleSaranPintarModal } from '../../../../redux/modalToggle';
import SaranPintarModal from "@src/views/components/Modals/SaranPintarModal";

// ** Icons Imports
import {
  Badge20Filled,
  ChevronRightRegular,
  CalendarMonthRegular,
  DataHistogramFilled,
  TargetArrowFilled,
  PersonRunningRegular,
  PersonFeedbackFilled  
} from "@fluentui/react-icons";

const CardSaranPintar = () => {
  const dispatch = useDispatch();
  const saranPintarArr = [
    {
      display:'d-block',
      title: 'Ayo coba dan berikan feedback Web Diarium',
      color: 'bg-secondary-600',
      icon: PersonFeedbackFilled,
      bgColor:'bg-secondary-100',
      url:'/feedback',
      modal: null
    },
    {
      display:'d-block',
      title: 'Mari jaga pola hidup Sehat',
      color: 'bg-primary-600',
      icon: PersonRunningRegular,
      bgColor:'bg-primary-100',
      url:'#',
      modal: toggleSaranPintarModal
    }
  ]

  function openModal(modal,data) {
    if (modal !== null) {      
      dispatch(modal(true));
    }
  }

  const renderSaranPintar = () => {
    return saranPintarArr.map(item => {
      return (
      <Link key={item.title} to={item.url} className={`fw-bold ${item.display} card-smarttips`}>
        <div className='transaction-item mb-2 position-relative align-items-start'  onClick={() => openModal(item.modal,item)}>
          <Badge tag='span' className={`d-flex ${item.color} rounded-0 m-0 p-0 w-100 h-100`}></Badge>
           <div className={`position-relative w-100 d-flex flex-row p-0 ${item.bgColor}`}  style={{ height: "34px"}}>            
              <div className={`rounded bg-tertiary-300 h-100 d-flex`}>
                <item.icon className="fs-6 text-primary-600 m-auto" style={{ width: "2rem"}} />
              </div>
              <div>
                <h6 className='position-absolute top-50 start-15 translate-middle-y fs-4 d-block fw-normal p-2'>{item.title}</h6>
              </div>
              <div>
                <ChevronRightRegular className="position-absolute top-50 end-0 translate-middle-y fs-5 fw-bold text-tertiary-600"/>
              </div>
            </div>
        </div>
      </Link>
      )
    })
  }

  return (
    <>
    <Card className='card-transaction mb-7'>
      <CardHeader>
        <CardTitle tag='h4'>Buat Kamu</CardTitle>
      </CardHeader>
      <CardBody className="d-block" style={{ height: "126px" }}>
        <ScrollBar>
          {renderSaranPintar()}
        </ScrollBar>
      </CardBody>
    </Card>
    <SaranPintarModal/>
    </>
  )
}

export default CardSaranPintar
