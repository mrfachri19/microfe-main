import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import moment from "moment";
import { noValue } from "@src/utils/validateInput.js";
import parse from 'html-react-parser';

// ** Custom Components
import Avatar from '@components/avatar'
import AvatarGroup from '@components/avatar-group'
import Tooltip from '@src/views/components/tooltips/Tooltips';
import EmptyCard from '@src/views/components/cards/empty';

// ** Icons Imports
import {
  VideoRegular,
  LocationRegular,
  CalendarLtrRegular,
  ChevronRightRegular
} from "@fluentui/react-icons";

// ** Reactstrap Imports
import {
  Badge, 
  Card, 
  CardTitle, 
  CardBody, 
  CardText, 
  CardFooter,
  Carousel,
  CarouselItem,
  CarouselIndicators,
} from 'reactstrap';

// ** Images
import illustration from '@src/assets/images/illustration/email.svg'

// ** API
import { getTimeManagementV2 } from "../../../../api/index";

export default function RenderCardEvent() {
  return (
    <CardEvent />
  );
}

const CardEvent = (args) => {
  const [listAcaraState, setListAcara] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loopIndex, setLoopIndex] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { dateCardActivity } = useSelector((state) => state.global);
  let timeout;

  function getNext(index, arrLength) {
    return index == arrLength - 1 ? 0 : index + 1;
  }

  // function getPrev(index, arrLength) {
  //   return index == 0 ? arrLength - 1 : index - 1;
  // }

  const next = () => {
    if (listAcaraState.length > 0 ){
      if (animating) return;
      const nextIndex = activeIndex === listAcaraState.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? listAcaraState.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  function getEventToday() {
    getTimeManagementV2(
      // `activity/new?action=my_activity&category=today&start_date=2022-07-29&limit=5&offset=0&appVersion=5.0.6&type=event`
      `activity/new?action=my_activity&category=today&start_date=${dateCardActivity}&limit=5&offset=0&appVersion=5.0.6&type=event`
      // `activity/event?action=my_activity&start_date=${dateCardActivity}&end_date=${dateCardActivity}`
    ).then((res) => {
      let tempData = [];
      const datas = res ? res.data.data.detail : [];

      if (!noValue(datas)) {
        for (let i = 0; i < datas.length; i++) {
          let info = datas[i];
          const timelabel = info.periode.split(" | ");

          let d = {
            titleEvent : info.title,
            subTitleEvent : `Acara ${info.event_source}`,
            dateEvent : timelabel[0],
            detailDateEvent : info.time_periode,
            isEventOnline : info.location_status == "Online",
            locationEvent : info.location,
            participants : [],
            detail: [info]
          };
          
          for (let j = 0; j < info.participant.length; j++) {
            if (j < 3){
              d.participants.push({
                title: `NIK ${info.participant[j].nik}`,
                placement: 'bottom',
                img: info.participant[j].photoPath,
                imgHeight: 33,
                imgWidth: 33
              });
            }
          }
          if (info.participant.length > 3) {
            d.participants.push({
              meta: `+ ${info.participant.length - 3} Peserta lainnya`
            });
          }
          tempData.push(d);
        }
      }

      setListAcara(tempData);
      if (tempData.length > 1) {
        setLoopIndex(!loopIndex);
      }
    });
  }

  function createNewAcara() {
    window.open("/app/calendar");
  }

  useEffect(() => {
    setIsLoading(true);
    getEventToday();
  }, []);

  useEffect(() => {
    timeout = setTimeout(() => {
      next();
      // setLoopIndex(!loopIndex);
    }, 3000);
  }, [loopIndex]);
  

  const slides = listAcaraState.map((dataAcara) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={`acara-`+dataAcara.titleEvent}
      >
        <div className='meetup-img-wrapper rounded-top text-center'>
          <img src={dataAcara.photo_path || illustration} height='170' />
        </div>
        <div className="content-acara">
          <div className='meetup-header d-flex align-items-center'>
            <div className='meetup-day'>
              <h6 className='mb-0'>{moment().format("ddd")}</h6>
              <h3 className='mb-0'>{moment().format("D")}</h3>
            </div>
            <div className='my-auto'>
              <CardTitle tag='h4' className='mb-25'>
                {dataAcara.titleEvent ? parse(dataAcara.titleEvent) : ""}
              </CardTitle>
              <CardText className='mb-0'>{dataAcara.subTitleEvent || ""}</CardText>
            </div>
          </div>
          <div className='d-flex info-meeting'>
              <Avatar color='light-primary' className='rounded me-4 avatar-icon pe-none' icon={<CalendarLtrRegular className="fs-6" height="100%"/>} />
              <div className="info-meeting-detail">
                <h6 className='mb-0'>{dataAcara.dateEvent || ""}</h6>
                <small>{dataAcara.detailDateEvent || ""}</small>
              </div>
          </div>
          <div className='d-flex mt-2 info-meeting'>
                <Avatar color='light-primary' className='rounded me-4 avatar-icon pe-none' 
                  icon={dataAcara.isEventOnline ? <VideoRegular className="fs-6" height="100%"/> : <LocationRegular className="fs-6" height="100%"/>} 
                />
                <div className="info-meeting-detail">
                  <h6 className='mb-0'>{dataAcara.isEventOnline ? "Online":"Offline"}</h6>
                  <Tooltip tooltips={dataAcara.locationEvent || ""} id={`tooltips-event-location-${dataAcara.id}`}>
                    {dataAcara.isEventOnline ? 
                      <a className="d-block text-truncate" href={dataAcara.locationEvent} target="_blank">{dataAcara.locationEvent || ""}</a> :
                      <small className="d-block text-truncate">{dataAcara.locationEvent || ""}</small>
                    }
                  </Tooltip>
                </div>
          </div>
          <AvatarGroup className="photo-karyawan-group" data={dataAcara.participants || []} />
        </div>
      </CarouselItem>
    );
  });

  return (
    <>
    { !noValue(listAcaraState) ?
      <Card className='card-developer-meetup mb-7'>
        <CardBody className="carousel-acara">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            dark
            className="overflow-hidden"
            {...args}
            fade={false}
            slide={true}
            interval={3000}
          >
            <CarouselIndicators items={listAcaraState} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
          </Carousel>
        </CardBody>
        <CardFooter>
          <div className="d-flex flex-row-reverse">
            <Link to={"/app/calendar"} className="fw-bold">
              <Badge tag='div' color='light-primary' pill>
                <span className="">Lihat Selengkapnya <ChevronRightRegular className="fs-6" height="100%"/></span>
              </Badge>
            </Link>
          </div>
        </CardFooter>
      </Card>
      :
      <EmptyCard 
        className="mb-7" 
        text="Tidak ada acara hari ini" 
        cardTitle="Acara"
        action={true}
        actionLabel= "Buat Acara"
        actionOnclik={createNewAcara}
      >
        <CardFooter>
          <div className="d-flex flex-row-reverse">
            <Link to={"/app/calendar"} className="fw-bold">
              <Badge tag='div' color='light-primary' pill>
                <span className="">Lihat Selengkapnya <ChevronRightRegular className="fs-6" height="100%"/></span>
              </Badge>
            </Link>
          </div>
        </CardFooter>
      </EmptyCard>
    }
    </>
  )
}
