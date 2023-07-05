import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Carousel, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../css/ServiceDetails.css';
import '../css/providerServices.css';
import { RateStars } from '../components/rateStars';
import { calcRatesPercent, calculateAverageRate, nRates } from '../js/rate';
import ReactStars from 'react-rating-stars-component';
import AuthContext from "../context/UserContext";

export function ServiceDetails() {
    const user = useContext(AuthContext);
    console.log('user: ', user)

    let { id } = useParams();
    let navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false);
    const [submittedRate, setSubmittedRate] = useState(false);
    const [rating, setRating] = useState(0);
    const [index, setIndex] = useState(0);
    const [service, setService] = useState({});
    const [serviceRate, setServiceRate] = useState(null); // Initialize as null
    const [serviceRateLength, setServiceRateLength] = useState(null); // Initialize as null
    const [serviceRateState, setServiceRateState] = useState({}); // Initialize as null

    useEffect(() => {
        getServiceData();
        getServiceRate();
    }, []);


    const handleSelectedImage = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setSubmittedRate(false)
    };

    const submitRate = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        const data = {
            service_rated: service.id,
            service_rate: rating,
        };
        const url = 'http://127.0.0.1:8000/service/rate/';

        try {
            const response = await axios.post(url, data, { headers });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        getServiceRate()
        setSubmittedRate(true)

    };
    let getServiceData = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/service/get-service/${id}/`);
            setService(response.data);
        } catch {
            navigate('/not_found');
        }
    }
    let getServiceRate = async () => {

        let response = await axios.get(`http://localhost:8000/service/${id}/view-stat/`);
        setServiceRate(calculateAverageRate(response.data));
        setServiceRateLength(nRates(response.data))
        setServiceRateState(calcRatesPercent(response.data))

        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        { console.log(!user.is_provider) }
        if (!user.is_provider) {
            try {
                response = await axios.get(`http://localhost:8000/service/${id}/rate/`, { headers });
                setRating(response.data['rate_value'])
                setSubmittedRate(response.data['rated'])
                setIsLoaded(true)
            }
            catch (error) {
                console.log(error)
            }
        }

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
            navigate('/myservices')
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = () => {
        setShowModal(true);
    };



    let source = 'http://localhost:8000';
    return (
        <div className=" p-4 text-center ">
            <div className="row mt-5 p-4 details-container">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="border-4">
                        <Carousel activeIndex={index} onSelect={handleSelectedImage}>
                            {service.images &&
                                service.images.map((img, j) => (
                                    <Carousel.Item key={j}>
                                        <img className="img-card" variant="top" src={source + img.image} alt={img.image} id="cart-img-card" 
                                        style={{ height: '400px', width: '80%', objectFit: 'cover', borderRadius: '10px' }} />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="text-start">
                        <div className="d-flex flex-column flex-nowrap ps-3c justify-content-center h-75">
                            <div className="d-flex align-items-end flex-wrap">
                                <div className="col-12 mb-2">
                                    <h1 className="mb-1 me-md-4 me-2">{service.service_service_category}</h1>
                                </div>
                                <div className="col-12 mb-2">
                                    <span className="d-flex align-items-end">
                                        {serviceRate != null && <RateStars rating={serviceRate ? serviceRate : 0} className="mt-2" />}
                                    </span>
                                </div>
                            </div>                            <div className="mt-1 mb-4">
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
                            <p className="my-3 fs-4 col-sm-12 col-md-12">{service.description}</p>
                            {console.log(user.is_provider)}
                            {user.is_provider && (
                                <div className="my-3 col-sm-12 col-md-12">
                                    <NavLink to={`/services/${service.id}/edit`} className="cartcardbtn mb-5">
                                        Edit
                                    </NavLink>
                                    <NavLink onClick={handleDelete} className="cartcardbtn mb-5">
                                        Delete
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className="rate-part p-5">
                    <div className="rate-view row">
                        <div className="col-md-6 text-start">
                            <h2>Customers Reviews</h2>
                            <div className="row justify-content-start">
                                <div className="col-auto">
                                    {serviceRate != null && <RateStars rating={serviceRate ? serviceRate : 0} className="mt-2" />}
                                </div>
                                <div className="col-auto pt-1">Based on {serviceRateLength} reviews</div>
                            </div>
                            <div className="row justify-content-start ps-3">
                                <div className="col-md-10">
                                    {Object.keys(serviceRateState).map((key, index) => (
                                        <div className="row mb-1" key={index}>
                                            <div className="col-3 col-md-2 p-1">{key}<span className="star">&#9733;</span></div>
                                            <div className="col-6 col-md-8 vertical-align-center">
                                                <div className="rate-bar h-50 w-100">
                                                    <div className="progress-bar" style={{ width: `${serviceRateState[key]}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="col-3 col-md-2">{serviceRateState[key].toFixed(1)}%</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {isLoaded && <div className="col-md-6  text-start">
                            <h2 className="mb-3">Rate this service</h2>
                            <div className="col-md-6">
                                <ReactStars
                                    edit={true}
                                    count={5}
                                    size={30}
                                    activeColor="#ffc107"
                                    value={rating ? rating : 0}
                                    onChange={handleRatingChange}
                                />
                            </div>
                            <div className="col-md-6 vertical-align-center">
                                <button
                                    onClick={submitRate}
                                    id="submit-button"
                                    disabled={submittedRate}
                                    className={"btn btn-success"}
                                >
                                    {submittedRate ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm2.97 5.97a.75.75 0 0 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L5.97 8.03a.75.75 0 1 1 1.06-1.06l1.47 1.47 2.72-2.72z" />
                                            </svg>
                                            Submitted
                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>
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

    )
}