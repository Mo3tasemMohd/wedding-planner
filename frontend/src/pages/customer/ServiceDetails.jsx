import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import axios from 'axios';
import '../../css/ServiceDetails.css';
import '../../css/providerServices.css';
import { NotFound } from '../NotFound';
import { RateStars } from '../../components/rateStars';
import { calcRate } from '../../js/rate';

export function ServiceDetails() {
    let isProvider = false;




    let { id } = useParams();
    let navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const [service, setService] = useState({});
    const [serviceRate, setServiceRate] = useState(null); // Initialize as null

    let getServiceData = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/service/get-service/${id}/`);
            setService(response.data);
            response = await axios.get(`http://localhost:8000/service/${id}/view-rate/`);
            setServiceRate(calcRate(response.data));

        } catch {
            navigate('/not_found');
        }
    };

    useEffect(() => {
        getServiceData();
    }, []);

    let backToServices = () => {
        navigate('/home');
    };

    let source = 'http://localhost:8000';
    return (
        <div className=" p-4 mt-5 text-center ">
            <div className="row mt-5 p-4">
                <div className="col-6 cont2">
                    <div className="border-4">
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            {service.images &&
                                service.images.map((img, j) => (
                                    <Carousel.Item key={j}>
                                        <img className="img-card col-sm-12 col-md-12" variant="top" src={source + img.image} id="cart-img-card" />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </div>
                </div>
                <div className="col-6 mt-5">
                    <div className="d-flex flex-column flex-nowrap justify-content-center h-75">
                        <div className="d-flex align-items-end">
                            <h1 className=" mb-1 me-4">{service.service_service_category}</h1>
                            <span className=" mt-4">
                                <span className="d-flex align-items-end">
                                    {console.log(serviceRate)}
                                    {serviceRate !== null && <RateStars rating={serviceRate} className="mt-2" />} {/* Display RateStars only when serviceRate is not null */}
                                </span>
                            </span>
                        </div>
                        <div className="mt-1 mb-4">
                            <svg width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill location-item m-1" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                            {service.service_location}
                        </div>
                        <h4 className="my-3 col-sm-12 col-md-12">Price: ${service.service_price}</h4>
                        <div className="my-2">
                            <h4 className="my-2 text-muted">Description</h4>
                            <div className="text-output-area">{service.service_description}</div>
                        </div>
                        <p className="my-3 fs-4 col-sm-12 col-md-12">{service.decription}</p>
                        {isProvider && <div className="my-3 col-sm-12 col-md-12">
                            <button className="btn btn-warning col-4 ms-5 fs-5 ">Edit</button>
                            <button className="btn btn-danger col-4 mx-5 fs-5">Delete</button>
                        </div>}
                    </div>
                </div>
                <div className='rate-part p-5'>
                    <div className='rate-view'>
                        
                        <div>
                            <h2>Customers Reviews</h2>
                            <span>
                                                            {serviceRate !== null && <RateStars rating={serviceRate} className="mt-2" />} {/* Display RateStars only when serviceRate is not null */}

                            </span>
                            <span></span>
                        </div>
<div>
                            Rate This Services
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <button className="btn btn-dark fs-5" onClick={backToServices}>
                    Back to Halls
                </button>
            </div>
        </div>
    );
}