import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/serviceForm.css"

export default function ServiceForm() {
    let navigate = useNavigate();
    let { id } = useParams();
    let [service, setService] = useState({});
    let [categs, setCategs] = useState([]);
    let [formValues, setFormValues] = useState({
        service_service_category: 'Hall-Reservation',
        service_price: '',
        service_description: '',
        service_location: 'Fifth Settlment',
        images: [], // New field for images
    });

    const locations = ["Fifth Settlement", "First Settlement", "Nasr City", "Maadi", "SHobra", "Masr El-Gdeda", "Fisal", "Third Settlement", "Zamalek", "Haram"].sort();

    let formOperation = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('service_service_category', formValues.service_service_category);
        formData.append('service_price', formValues.service_price);
        formData.append('service_description', formValues.service_description);
        formData.append('service_location', formValues.service_location);
        for (let i = 0; i < formValues.images.length; i++) {
            formData.append('images', formValues.images[i]);
        }

        const token = localStorage.getItem('token');
        console.log(token);

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        };

        if (id === '0') {
            axios.post('http://127.0.0.1:8000/service/add-service/', formData, { headers })
                .then(() => {
                    navigate('/myservices');
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            axios.put(`http://127.0.0.1:8000/service/update-service/${id}/`, formData, { headers })
                .then(() => {
                    navigate('/myservices');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    let operationHandler = (e) => {
        if (e.target.name === 'images') {
            setFormValues({
                ...formValues,
                images: e.target.files, // Store selected files in images field
            });
        } else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
            });
        }
    };
    let getService = async () => {
        let response;
        try {
            response = await axios.get(`http://127.0.0.1:8000/service/get-service/${id}/`);
            setService(response.data);
            setFormValues({
                service_service_category: response.data.service_service_category,
                service_price: response.data.service_price,
                service_description: response.data.service_description,
                service_location: response.data.service_location,
                images: response.data.images, // Clear images field for update operation

            });
        } catch { navigate('/not_found') }
    };

    let getCategories = async () => {
        let response = await axios.get(`http://127.0.0.1:8000/service/service-categories/`);
        setCategs(response.data.categories);
    };

    useEffect(() => {
        getCategories();

        if (id !== '0') {
            getService();
        }
    }, []);

    return (
        <div className=" container p-5 w-50 text-dark form_container">
            <Form className=' service_form mx-auto' onSubmit={formOperation} encType="multipart/form-data" >
                <Form.Group className="mb-4 fs-5" controlId="formBasicEmail">
                    <Form.Label>Service Category</Form.Label>
                    <Form.Control
                        className='form-control-with-shadow1 '
                        required
                        as="select"
                        onChange={operationHandler}
                        name="service_service_category"
                        value={formValues.service_service_category}
                    >

                        {categs.map((categ, index) => {
                            return <option key={index} value={categ}> {categ} </option>
                        })}

                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-4 fs-5" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        className='form-control-with-shadow1 '
                        required
                        onChange={operationHandler}
                        name="service_price"
                        placeholder="Enter price"
                        type="number"
                        defaultValue={service.service_price}
                        max={1000000}
                        min={1}
                        step={0.01}
                    />
                </Form.Group>

                <Form.Group className="mb-4 fs-5" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        className='form-control-with-shadowDesc'
                        required
                        onChange={operationHandler}
                        name="service_description"
                        placeholder="Please, Enter Your Business Name, Address and Describe Your Services"
                        as="textarea"
                        rows={5}
                        defaultValue={service.service_description}
                        minLength={20}
                    />
                </Form.Group>

                <Form.Group className="mb-4 fs-5" controlId="formBasicPassword">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        className='form-control-with-shadow2 '
                        required
                        as="select"
                        onChange={operationHandler}
                        name="service_location"
                        value={formValues.service_location}
                    >
                        {formValues.service_location}
                        {locations.map((location, index) => {
                            return <option key={index} value={location}> {location} </option>
                        })}

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-4 fs-5">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                        className='form-control-with-shadow2 '
                        required={id === '0'}
                        type="file"
                        name="images"
                        multiple
                        onChange={operationHandler}
                    />
                </Form.Group>

                <Button className="serviceBtn" type="submit">
                    {id === '0' ? 'Add' : 'Update'}
                </Button>
            </Form>
        </div>
    );
}
