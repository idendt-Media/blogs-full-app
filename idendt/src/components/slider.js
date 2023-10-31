import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "" }}
      onClick={onClick}
    />
  );
}
  
  function SliderComponent() {
    const cardStyle = {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems:"center",
      backGround:"#212121"

      
            // Add any other inline styles you need for the card
    };
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <Arrow />,
      nextArrow: <Arrow />,
    };

  return (
    <div className="w-full  bg-[#212121] flex flex-row justify-center items-center py-40">

      <div className="w-[80%]">

      <Slider {...settings}>
      <div className="" style={cardStyle} >
          <img src="assets/sales/slides/slider-01.png" alt="slides" className="w-[100%] object-contain" />
        </div>
        <div className="card" style={cardStyle}>
        <img src="assets/sales/slides/slider-01.png" alt="slides" className="w-[100%] object-cover" />
        </div>
        <div className="card" style={cardStyle}>
        <img src="assets/sales/slides/slider-01.png" alt="slides" className="w-[100%]" />
        </div>
        <div className="card" style={cardStyle}>
        <img src="assets/sales/slides/slider-01.png" alt="slides" className="w-[100%]" />
        </div>
        <div className="card" style={cardStyle}>
        <img src="assets/sales/slides/slider-01.png" alt="slides" className="w-[100%]" />
        </div>
        <div className="card" style={cardStyle}>
        <img src="assets/sales/slides/slider-01.png" alt="slides" className="w-[100%]" />
        </div>
      </Slider>
      </div>

    </div>
  );
}

export default SliderComponent;
