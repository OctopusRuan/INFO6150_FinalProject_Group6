import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PageWrapper from "../../components/PageWrapper";
import { Carousel, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import chickenImg from '../../assets/Chicken-Salad.jpg';
import fishImg from '../../assets/fish-with-veg.jpg';
import oatmealImg from '../../assets/oatmeal-with-nuts.jpg';
import Footer from '../../components/Footer';

const carouselItems = [
  {
    title: 'Healthy Chicken Salad',
    desc: 'Packed with lean grilled chicken, fresh greens, and a zesty light dressing, this salad delivers high protein with low calories—ideal for post-workout meals or a clean lunch option for fitness lovers.',
    image: chickenImg,
    link: '/recipes/chicken-salad',
    nutrition: {
      calories: '320 kcal',
      protein: '35g',
      carbs: '10g',
      fat: '12g'
    }
  },
  {
    title: 'Steamed Fish with Vegetables',
    desc: 'Delicately steamed white fish paired with a colorful medley of seasonal vegetables. This light yet satisfying dish is rich in nutrients, low in fat, and perfect for a refreshing, guilt-free dinner.',
    image: fishImg,
    link: '/recipes/steamed-fish',
    nutrition: {
      calories: '280 kcal',
      protein: '30g',
      carbs: '8g',
      fat: '10g'
    }
  },
  {
    title: 'Oatmeal with Nuts',
    desc: 'A warm and hearty bowl of oatmeal topped with a nutritious mix of almonds, walnuts, chia seeds, and blueberries. Rich in fiber and healthy fats, it’s a perfect way to start your morning full of energy.',
    image: oatmealImg,
    link: '/recipes/oatmeal-nuts',
    nutrition: {
      calories: '350 kcal',
      protein: '12g',
      carbs: '30g',
      fat: '18g'
    }
  }
];


const Home = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <>
      <Container className="p-0" fluid>
        <Carousel interval={6000} fade>
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
                style={{ height: '100vh', objectFit: 'cover' }}
              />

              {/* 👇 悬浮内容框居中 */}
              <Carousel.Caption
                style={{
                  position: 'absolute',
                  bottom: '2%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.55)',
                  borderRadius: '12px',
                  padding: '24px',
                  maxWidth: '90%',          // ✅ 拼写修正 + 限制最大宽度
                  width: '1000px',
                  height: 'fit-content',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ color: '#fff', fontWeight: 'bold' }}>{item.title}</h3>
                <p style={{ color: '#ddd' }}>{item.desc}</p>

                {expandedIndex === idx && (
                  <div style={{ color: '#fff', marginBottom: '12px' }}>
                    <p>🔥 Calories: {item.nutrition.calories}</p>
                    <p>🥩 Protein: {item.nutrition.protein}</p>
                    <p>🍞 Carbs: {item.nutrition.carbs}</p>
                    <p>🧈 Fat: {item.nutrition.fat}</p>
                  </div>
                )}

                <Button
                  variant="light"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === idx ? null : idx)
                  }
                  className="me-2"
                >
                  {expandedIndex === idx ? 'Hide Details' : 'View Details'}
                </Button>

              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
