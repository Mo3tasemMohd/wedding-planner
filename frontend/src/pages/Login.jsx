import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BASE_URL } from "../config/dataService";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  Username: Yup.string().required('Username is required'),
  Password: Yup.string().required('Password is required'),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    axios
      .post(`${BASE_URL}/customer/api/token/`, {
        username: data.Username,
        password: data.Password,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.access);
        setError('');
        navigate('/home');
      })
      .catch((err) => {
        setError(err.response.data.detail);
      });
  };

  return (
    <div className="container pt-3 mt-5 w-50" style={{ height: '90vh' }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            {...register('Username')}
            isInvalid={!!errors.Username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('Password')}
            isInvalid={!!errors.Password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>
    </div>
  );
}