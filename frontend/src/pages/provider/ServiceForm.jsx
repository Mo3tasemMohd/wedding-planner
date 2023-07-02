import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ServiceForm() {
    let navigate = useNavigate();
    let { id } = useParams();
    let [service, setService] = useState({});
    let [formValues, setFormValues] = useState({
        service_service_category: '',
        service_price: '',
        service_description: '',
        service_location: '',
        images: [], // New field for images
    });

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
                    // navigate('/services');
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            axios.put(`http://127.0.0.1:8000/service/update-service/${id}/`, formData, { headers })
                .then(() => {
                    // navigate('/services');
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
        let response = await axios.get(`http://127.0.0.1:8000/service/get-service/${id}/`);
        setService(response.data);
        setFormValues({
            service_service_category: response.data.service_service_category,
            service_price: response.data.service_price,
            service_description: response.data.service_description,
            service_location: response.data.service_location,
            images: [], // Clear images field for update operation
        });
    };

    useEffect(() => {
        if (id !== '0') {
            getService();
        }
    }, []);

    return (
        <div className="bg-light container p-5 mt-5 text-dark">
            <Form onSubmit={formOperation} encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Service Category</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={operationHandler}
                        name="service_service_category"
                        defaultValue={service.service_service_category}>
                        <option value="Hall-Reservation">Hall-Reservation</option>
                        <option value="Car-Rental">Car-Rental</option>
                        <option value="Photo-Session">Photo-Session</option>
                        <option value="MakeUp-Artist">MakeUp-Artist</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        onChange={operationHandler}
                        name="service_price"
                        placeholder="Enter price"
                        type="text"
                        defaultValue={service.service_price}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={operationHandler}
                        name="service_description"
                        placeholder="Enter description"
                        as="textarea"
                        rows={3}
                        defaultValue={service.service_description}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        onChange={operationHandler}
                        name="service_location"
                        placeholder="Enter location"
                        type="text"
                        defaultValue={service.service_location}
                    />
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                        type="file"
                        name="images"
                        multiple
                        onChange={operationHandler}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {id === '0' ? 'Add' : 'Update'}
                </Button>
            </Form>
        </div>
    );
}
