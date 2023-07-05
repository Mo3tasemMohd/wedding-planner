import React, { useContext, useEffect, useState } from "react";
// import services from './services';
import { NavLink } from "react-router-dom";
import { CategoryServiceCard } from "../components/CategoryServiceCard";
import "../../src/css/providerServices.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/UserContext";

export function CategoryServices() {
  let user = useContext(AuthContext);

  const { state } = useLocation();
  const category = state?.category;
  const title = state?.title;

  let [services, setServices] = useState([]);


  useEffect(() => {
    fetchProducts(category);
  }, []);

  const fetchProducts = async (category) => {
    try {
      const url = `http://127.0.0.1:8000/service/all-services/?category=${category}`;
      const response = await axios.get(url);
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="provider-services">
      <div className="p-5 text-center container-page">
        <div className="container">
          <div className="">
            <h2 className=" mb-5 blurred-text">{title}</h2>
          </div>

          {services.results &&
            services.results.map((service) => {
              return (
                // <NavLink className={'nav-link'}>
                <CategoryServiceCard
                  key={service.id}
                  service={service}
                  className="border-5"
                />
                // </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
}
