import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import '../../css/ServiceDetails.css';
import '../../css/providerServices.css';
import { NotFound } from '../NotFound';
import { RateStars } from '../../components/rateStars';
import { calcRatesPercent, calculateAverageRate, nRates } from '../../js/rate';
import ReactStars from 'react-rating-stars-component';

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
    const [serviceRateLength, setServiceRateLength] = useState(null); // Initialize as null
    const [serviceRateState, setServiceRateState] = useState({}); // Initialize as null
    const [rating, setRating] = useState(0);

    const handleRatingChange =  (newRating) => {
        setRating(newRating);}

        const submitRate = async () => {

        if (true) {
            const data = {
                service_rated: service.id, // replace with the actual service ID
                service_rate: rating, // replace with the actual rating value
                // customer_user: 6,
            };

            const token = localStorage.getItem('token');

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            await axios.post('http://127.0.0.1:8000/service/rate/', data, { headers })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            // axios.put(`http://127.0.0.1:8000/service/update-service/${id}/`, formData, { headers })
            //     .then(() => {
            //         // navigate('/services');
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        }

    };

    let getServiceData = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/service/get-service/${id}/`);
            setService(response.data);
            response = await axios.get(`http://localhost:8000/service/${id}/view-stat/`);
            setServiceRate(calculateAverageRate(response.data));
            setServiceRateLength(nRates(response.data))
            setServiceRateState(calcRatesPercent(response.data))

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
                                        <img className="img-card col-sm-12 col-md-12" variant="top" src={source + img.image} alt={img.image} id="cart-img-card" />
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>
                <div className="col-6 mt-5">
                    <div className="d-flex flex-column flex-nowrap justify-content-center h-75">
                        <div className="d-flex align-items-end">
                            <h1 className=" mb-1 me-4">{service.service_service_category}</h1>
                            <span className=" mt-4">
                                <span className="d-flex align-items-end">
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
                            <div className='w-50 text-start'>
                                <h2>Customers Reviews</h2>
                                <div className='row justify-content-start'>
                                    <span className='d-inline w-auto'>
                                        {serviceRate !== null && <RateStars rating={serviceRate} className="mt-2" />}
                                    </span >
                                    <span className='d-inline w-auto pt-1'>Based on {serviceRateLength} reviews</span>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='row justify-content-center'>
                                        {Object.keys(serviceRateState).map((key, index) => (
                                            <div className='row mb-1 col-12' key={index}>
                                                <div className='col-1 p-1'> {key}<span className="star">&#9733;</span></div>

                                                <div className='col-8 vertical-align-center'>
                                                    <div className='rate-bar h-50 w-100'>
                                                        <div className='progress-bar' style={{ width: `${serviceRateState[key]}%` }} ></div>
                                                    </div>
                                                </div>
                                                <div className='col-3'>{serviceRateState[key].toFixed(1)}%</div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className='w-50 row justify-content-start text-start'>
                                <h2>Rate this service</h2>
                                <div className='col-6'>
                                    <ReactStars
                                        count={5}
                                        size={50}
                                        activeColor="#ffc107"
                                        value={rating}
                                        onChange={handleRatingChange}
                                    />
                                </div><div className='col-6 vertical-align-center'>
                                    <button
                                    className='btn btn-secondary'
                                    onClick={submitRate}
                                    >
                                       Submit
                                    </button>
                                </div>



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
    )
}