import { useState, useEffect } from 'react';
import Slider from 'react-slick';

import api from '../../api';
import awaiter from '../../utils/awaiter';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

const Carousel = () => {
  const [carousels, setCarousels] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const retriveCarousels = async () => {
    const [data, error] = await awaiter(api.home.fetchCarousels());
    if (error) {
      return;
    }

    setCarousels(data);
  };

  useEffect(() => {
    retriveCarousels();
  }, []);

  return (
    <Slider {...settings}>
      {carousels.map((item) => {
        return (
          <div
            style={{
              backgroundColor: item.backgroundColor,
            }}
            key={item.id}>
            <img
              src={item.imageUrl}
              alt='carousel'
              style={{ width: '100%', height: '300px' }}
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default Carousel;
