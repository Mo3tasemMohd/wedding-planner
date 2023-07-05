import React, { useState } from 'react'
import { Card, Carousel, Modal, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import "../css/providerServices.css"
import { RateStars } from './rateStars'
import axios from 'axios'

export function ProviderServiceCard(props) {
    let { service, onDelete} = props
    let navigate = useNavigate()
    useEffect(() => {
    }, [])

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const [showModal, setShowModal] = useState(false);
    let deleteService = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.delete(`http://localhost:8000/service/delete-service/${service.id}/`, { headers });
            setShowModal(false)
            console.log(response.data);
            onDelete(); 
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = () => {
        setShowModal(true);
    };
    let source = "http://localhost:8000"
    return (
        <div className=' col-sm-12 col-12  mx-auto text-start '>
            <Card className='border border-4 shadow-lg  mt-4 cartprodcard'>
                <Card.Body className='row cartCardbody '>
                    <div className='col-md-4 col-sm-3'>

                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            {service.images && service.images.map((img, j) => (
                                <Carousel.Item key={j}>
                                    <Card.Img
                                        className='img-card col-sm-12 col-md-12'
                                        variant='top'
                                        src={source + img.image}
                                        id='cart-img-card'
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>

                    </div>
                    <div className='col-md-8'>
                        <div className="d-flex align-items-end">
                            <Card.Title className=" mb-1 me-4">{service.service_service_category}</Card.Title>
                            <span className=" mt-4">
                                <span className="d-flex align-items-end">
                                    <RateStars rating={service.service_rate} className='mt-2' />
                                </span>
                            </span>
                        </div>
                        <Card.Text className='mt-1 mb-4'>
                            <svg width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill location-item m-1" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                            {service.service_location}
                        </Card.Text>
                        <div>
                            <Card.Subtitle className="mb-2 text-muted d-inline">Price</Card.Subtitle>
                            <span className='px-2'>{'   $' + service.service_price}</span>
                        </div>
                        <div className='my-2'>
                            <Card.Subtitle className="my-2 text-muted">Description</Card.Subtitle>
                            <div className='text-output-area'>
                                {service.service_description}
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="text-start col-3">
                                <NavLink to={`/services/${service.id}`} className='cartcardbtn mb-5'>
                                    Details
                                </NavLink>
                            </div>
                            <div className="text-start col-3">
                                <NavLink to={`/services/${service.id}/edit`} className='cartcardbtn mb-5'>
                                    Edit
                                </NavLink>
                            </div>
                            <div className="text-start col-3">

                            <NavLink onClick={handleDelete} className='cartcardbtn mb-5'>
                                Delete
                            </NavLink>
                            </div>

                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Delete</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={deleteService}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>

                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}