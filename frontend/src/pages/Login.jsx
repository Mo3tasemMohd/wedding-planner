import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../config/dataService";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logform1 from "../media/home/logform1.png";
import AuthContext from "../context/UserContext";

const schema = Yup.object().shape({
  Username: Yup.string().required("Username is required"),
  Password: Yup.string().required("Password is required"),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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
        localStorage.setItem("token", res.data.access);
        // validation();
        navigate("/home");
      })
      .catch((err) => {
        setError(err.response.data.detail);
      });
  };
  // };

  return (
    <div className="container pt-3 mt-5 d-flex justify-content-center align-items-center">
      <div className="position-relative">
        <h2 className="font-bold text-2xl text-center mb-4">Login</h2>
        <img
          src={logform1}
          className="img-fluid "
          alt="Login form background"
        />
        <div className="position-absolute top-50 start-50 translate-middle w-75">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                {...register("Username")}
                isInvalid={!!errors.Username}
                className="bg-mint w-75 mx-auto"
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
                className="bg-mint w-75 mx-auto"
              />

              <span></span>
              <Form.Control.Feedback type="invalid">
                {errors.Password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="w-25 text-dark"
                style={{
                  backgroundColor: "#facadaab",
                  borderColor: "#caf8f7a8",
                }}
              >
                Login
              </Button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </div>
      </div>
    </div>
  );
}