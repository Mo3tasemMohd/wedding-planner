import React, { useEffect, useState } from 'react'
// import services from './services';
import { NavLink } from 'react-router-dom';
import { ProviderServiceCard } from '../components/ProviderServiceCard';
import "../../src/css/providerServices.css"
import axios from 'axios';


export function ProviderService() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            const url = `http://127.0.0.1:8000/service/logged-services/`;
            const response = await axios.get(url, { headers });
            setServices(response.data);
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='provider-services p-5 text-center'>
            <div className='container-page'>
                <div className='container'>
                    <div className=''>
                        <h2 className=' mb-5 blurred-text'>My Services</h2></div>
                    <div className="text-start">
                        <NavLink to={`/services/0/edit`} className='cartcardbtn mb-5'>
                            Add New Product
                        </NavLink>
                    </div>

                    {
                        services.length > 0 && services.map((service) => {
                            return (
                                // <NavLink className={'nav-link'}>
                                <ProviderServiceCard key={service.id
                                } service={service}
                                    onDelete={() => {
                                        setServices(services.filter((s) => s.id !== service.id));
                                    }}

                                    className="border-5" />
                                // </NavLink>
                            );
                        }
                        )
                    }
                </div>
            </div>
        </div>

    );
}
