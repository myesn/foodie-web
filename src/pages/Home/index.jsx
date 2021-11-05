import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Col, Row } from '@douyinfe/semi-ui';

import api from '../../api';
import awaiter from '../../utils/awaiter';

import './index.scss';

const Home = () => {
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
    <Row>
      <Col span={24}>
        <Slider {...settings}>
          {carousels.map((item) => {
            return (
              <div style={{ backgroundColor: item.backgroundColor }}>
                <img src={item.imageUrl} />
              </div>
            );
          })}
        </Slider>
      </Col>
    </Row>
  );
};

export default Home;
