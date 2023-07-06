import React, { useEffect, useState } from 'react'
import { AddToCart } from '../components/AddToCart'
import { Card } from 'react-bootstrap'
import { Checkout } from '../components/Checkout'

export function Package() {

    let [services, setServices] = useState([])
    // let [token, setToken] = useState("")
    let [pack, setPack] = useState("")
    let token = ""

    useEffect(() => {
        const trytest = async () => {
            await showMine()
        } 
        trytest()
    }, [])

    let CallBackend = async (url, meth) => {
        // setToken(localStorage.getItem('token'))
        token = localStorage.getItem('token')
        let response = await fetch(`http://127.0.0.1:8000/${url}`,
        {
            "method": `${meth}`,
            "headers": {
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            }
        }
        )
        let data = await response.json()
        if(response.status === 200){
            console.log(data)
            return data
        }   
        else{
            console.log("failed")
        }
    }

    let showMine = async () => {
        
        let data = await CallBackend("package/view-package-services/", "GET")
        console.log(data)
        setServices(data)

        let allPackage =  await CallBackend("package/view/", "GET")
        console.log(allPackage)
        setPack(allPackage)
    }
    let checkout = async () => {
        console.log("Checked out")
        let data = await CallBackend(`package/${pack.id}/empty-package/`, "DELETE")
        await showMine()
    }

    return (
        <div>
            <div className="container pt-5">
                <div className="row justify-content-center p-5 g-3 bg-secondary">
                    {
                        (services.map((service) => {
                            return <div>
                                <Card style={{ width: '100%' }}>
                                    {service.images && service.images.map((img, id) => {
                                        return <Card.Img className='cardImg' key={id} variant="top" src={"http://127.0.0.1:8000/" + img.image} />
                                    })}
                                    <Card.Body>
                                        <Card.Title>{service.service_service_category}</Card.Title>
                                        <Card.Text>
                                            <Card.Title>Price: </Card.Title>
                                            {service.service_price}
                                        </Card.Text>
                                        <Card.Text>
                                            <Card.Title>Description: </Card.Title>
                                            {service.service_description}
                                        </Card.Text>
                                        <Card.Text>
                                            <Card.Title>Pick date: </Card.Title>
                                            <AddToCart key={service.id} service={service} />
                                        </Card.Text>

                                        {/* {addedService && (<p className='text-success'>Reservation completed</p>)} */}
                                    </Card.Body>


                                </Card>
                            </div>
                        })
                        )
                    }
                     (
                        <div className='d-flex justify-content-center align-items-center bg-dark text-light'>
                            <label>Price: {pack.package_price} </label>
                            <Checkout checkoutFun = {checkout} pack_id={pack.id} />
                            {/* <button onClick={checkout} className='btn btn-info mx-5'>Checkout</button> */}
                        </div>
                    )
                </div>
            </div>
        </div >
    )
}