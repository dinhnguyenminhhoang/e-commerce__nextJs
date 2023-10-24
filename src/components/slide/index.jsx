"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import NextBtn from "./NextBtn";
import PreBtn from "./PreBtn";
const HotSaleSlide = ({ listItem, numberSlide, SlideItem }) => {
    const sliderRef = useRef();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextClick = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handlePrevClick = () => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const handleSetSlider = (index) => {
        sliderRef.current?.slickGoTo(index);
    };
    var settings = {
        infinite: true,
        speed: 200,
        slidesToShow: numberSlide || 1,
        slidesToScroll: 1,
        nextArrow:
            currentSlide === listItem.length - 1 ? null : (
                <NextBtn onClick={handleNextClick} />
            ),
        prevArrow:
            currentSlide === 0 ? null : <PreBtn onClick={handlePrevClick} />,
        autoplay: true,
        autoplaySpeed: 2000,
        afterChange: (index) => {
            setCurrentSlide(index);
        },
    };
    return (
        <Slider {...settings} ref={sliderRef} className="relative group">
            {listItem?.length > 0 &&
                listItem.map((item) => (
                    <SlideItem data={item} key={item._id} />
                ))}
        </Slider>
    );
};

export default HotSaleSlide;
