import React from 'react';
import { useSelector } from 'react-redux';
import PageWrapper from "../../components/PageWrapper";
import { Carousel, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import burgerImg from '../../assets/burger.jpg';
import fishImg from '../../assets/fish-with-veg.jpg';
import oatmealImg from '../../assets/oatmeal-with-nuts.jpg';

const carouselItems = [
  {
    title: 'Healthy Chicken Salad',
    desc: 'High protein, low calorie, perfect for fitness enthusiasts!',
    image: burgerImg,
    link: '/recipes/chicken-salad'
  },
  {
    title: 'Steamed Fish with Vegetables',
    desc: 'High protein, low calorie, perfect for fitness enthusiasts!',
    image: fishImg,
    link: '/recipes/steamed-fish'
  },
  {
    title: 'Oatmeal with Nuts',
    desc: 'High fiber, low GI, perfect for breakfast.',
    image: oatmealImg,
    link: '/recipes/oatmeal-nuts'
  }
];

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Container className="p-0" fluid>
        <Carousel>
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
                style={{ height: '100vh', objectFit: 'cover' }}
              />
              <Carousel.Caption
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '10px',
                  padding: '20px',
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Button variant="light" color="secondary" onClick={() => navigate(item.link)}>
                  View Details
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </PageWrapper>
  );
};

export default Home;
