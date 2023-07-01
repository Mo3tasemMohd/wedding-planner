import React, { useState, useEffect, useRef } from 'react';
import '../../CSS/home.css'
import Hall from '../../media/home/Hall.jpg'
import Cars from '../../media/home/Cars.jpg'
import Photosessions from '../../media/home/Photosessions.jpg'
import Makeup from '../../media/home/Makeup.jpg'
import bg1 from '../../media/home/bg1.jpg'
import { Card, Button, Col, Row, Container } from 'react-bootstrap';



export  function Home() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const cards = [
    { id: 1, imgSrc: Hall, title: 'Hall', text: 'You can reserve the best Halls in Egypt' },
    { id: 2, imgSrc: Photosessions, title: 'Photosessions', text: 'Take memorable photos for your wedding' },
    { id: 3, imgSrc: Cars, title: 'Cars', text: 'Luxury Cars for your wedding' },
    { id: 4, imgSrc: Makeup, title: 'Makeup', text: 'Best Makeup artists for here' }
  ];

  const observeCards = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(entries => {
      const newVisibleCards = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target.dataset.cardId);

      setVisibleCards(prevVisibleCards => [
        ...new Set([...prevVisibleCards, ...newVisibleCards])
      ]);

      if (newVisibleCards.length > 0) {
        observer.disconnect();
      }
    }, options);

    cardRefs.current.forEach(cardRef => {
      observer.observe(cardRef);
    });

    return () => {
      cardRefs.current.forEach(cardRef => {
        observer.unobserve(cardRef);
      });
    };
  };

  useEffect(observeCards, []);

  useEffect(() => {
    let timeoutId;
    cardRefs.current.forEach((cardRef, index) => {
      timeoutId = setTimeout(() => {
        setVisibleCards(prevVisibleCards => [...prevVisibleCards, String(index + 1)]);
      }, (index + 1) * 1500);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="cards-with-transition">
      <img className='bg'  src={bg1}></img>
      <div className='body w-100  pt-1'>
  <Container className=' m-auto mt-5'>
    <Row className="justify-content-center align-items-center ms-auto ">
      {cards.map(card => (
        <Col key={card.id} xs={12} md={12} lg={6} >
          <div
            className={`card-with-transition ${visibleCards.includes(String(card.id)) ? 'visible' : ''}`}
            ref={el => (cardRefs.current[card.id - 1] = el)}
            data-card-id={card.id}
          >
            <Card className="card m-auto mb-3" style={{ width:'25rem', borderRadius: '25rem' }}>
              <Card.Img variant="top" src={card.imgSrc} style={{ width:'25rem', height:'25rem',borderRadius: '25rem' }} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Button
                  style={{ background: 'rgba(252, 224, 230)', border: '0px', color: 'black' }}
                  disabled={!visibleCards.includes(String(card.id))}
                >
                  Go To {card.title}
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
  </div>
</div>

  );
};
