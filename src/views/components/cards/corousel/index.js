import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import { storeDataModal, toggleImageModal } from '../../../../redux/modalToggle';

import { getBanner } from "../../../../api/index";
import ImageModal from "@src/views/components/Modals/ImageModal";

const CardCarousel = (args) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [listBanners, setListBanners] = useState([]);
  const [loopIndex, setLoopIndex] = useState(true);
  const [animating, setAnimating] = useState(false);
  // const { isImageModal } = useSelector((state) => state.modal);
  let timeout;

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === listBanners.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? listBanners.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  function getDataBanner() {
    getBanner().then((res) => {
      let data = res.data ? res.data.data : [];
      let tempData = [];
      for (let i =0 ; i<data.length; i++){
        tempData.push({
          src: data[i].photoPath,
          altText: data[i].content,
          caption: data[i].content,
          url: data[i].url,
          key: i+1
        });
      }
      setListBanners(tempData);
      if (data.length > 1) {
        setLoopIndex(!loopIndex);
      }
    });
  }

  function openModal(data) {
    dispatch(toggleImageModal(true));
    dispatch(storeDataModal({
      caption : data.caption, 
      image : data.src,
      url : data.url
    }));
  }

  useEffect(() => {
    getDataBanner();
  }, [1]);

  useEffect(() => {
    timeout = setTimeout(() => {
      next();
      // setLoopIndex(!loopIndex);
    }, 3000);
  }, [loopIndex]);

  const slides = listBanners.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={`banner-`+item.src}
      >
        <img className="img-contain" src={item.src} alt={item.altText} onClick={() => openModal(item)}/>
        <CarouselCaption className="bg-tertiary-900" captionText={item.caption}/>
      </CarouselItem>
    );
  });

  return (
    <>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={3000}
        pause={false}
        className="mb-7 rounded overflow-hidden card card-carousel"
        {...args}
      >
        <CarouselIndicators items={listBanners} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>

      <ImageModal/>
    </>
  );
}

export default CardCarousel;