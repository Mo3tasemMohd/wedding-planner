import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../config/dataService";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  Username: Yup.string().required("Username is required"),
  Password: Yup.string().required("Password is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  Email: Yup.string().required("Email is required"),
  PhoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{11}$/, "Phone number must be 11 digits"),
});

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    axios
      .post(`${BASE_URL}/customer/register/`, {
        username: data.Username,
        password: data.Password,
        email: data.Email,
        customer_phone: data.PhoneNumber
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access);
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.detail);
        
      });
  };

  return (
    <div className="container pt-3 mt-5 w-50" style={{ height: "90vh" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-2xl text-center mb-4">Register</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            {...register("Email")}
            isInvalid={!!errors.Email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            {...register("PhoneNumber")}
            isInvalid={!!errors.PhoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.PhoneNumber?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            {...register("Username")}
            isInvalid={!!errors.Username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Username?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("Password")}
            isInvalid={!!errors.Password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("ConfirmPassword")}
            isInvalid={!!errors.ConfirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.ConfirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>

        <p className="mt-3">
          Already have an account?{" "}
          <span
            className="text-primary cursor cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>

        {error && <p className="text-danger mt-3">{error}</p>}
      </Form>
    </div>
  );
}