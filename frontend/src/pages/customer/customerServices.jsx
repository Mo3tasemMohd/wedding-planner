import React, { useEffect, useState } from 'react'
// import services from './services';
import { NavLink } from 'react-router-dom';
import { CustomerServiceCard } from '../../components/customerServiceCard';
import "../../../src/CSS/providerServices.css"
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export function CustomerService() {


    const { state } = useLocation();
    const category = state?.category;
    let [services, setServices] = useState([]);

    useEffect(() => {
        fetchProducts(category);
    }, []);

    const fetchProducts = async (category) => {
        try {

            const url = `http://127.0.0.1:8000/service/all-services/?category=${category}`;
            const token = localStorage.getItem('token');
            const response = await axios.get(url
                /* , {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
              }
              */
            );
            setServices(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='provider-services '>
            <div className='p-5 text-center'>
                <div className='container'>
                    <div className=''>
                        <h2 className=' mb-5 blurred-text'>My Services</h2></div>
                    <div className="text-start">
                        <NavLink to='' className='cartcardbtn mb-5'>

                            Add New Product
                        </NavLink>
                    </div>

                    {
                        services.results && services.results.map((service) => {
                            return (
                                // <NavLink className={'nav-link'}>
                                <CustomerServiceCard key={service.id} service={service} className="border-5" />
                                // </NavLink>
                            );
                        }
                        )}
                </div>
            </div>
        </div>

    );
}