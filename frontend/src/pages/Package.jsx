import React, { useEffect, useState } from 'react'
import { CustomerCard } from './CustomerCard'
import { AddToCart } from '../components/AddToCart'

export function Package() {

    let [services, setServices] = useState([])
    let [all, setAll] = useState(true)
    let [token, setToken] = useState("")
    let [pack, setPack] = useState("")

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    })

    let CallBackend = async (url, meth) => {
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


    let showAll = async () => {
        setAll(true)
        let data = await CallBackend("service/all-services", "GET")
        setServices(data['results'])
    }
    let showMine = async () => {
        setAll(false)
        
        let data = await CallBackend("package/view-package-services/", "GET")
        console.log(data)
        setServices(data)

        let allPackage =  await CallBackend("package/view/", "GET")
        console.log(allPackage)
        setPack(allPackage)
    }
    let checkout = async () => {
        let data = await CallBackend(`package/${pack.id}/empty-package/`, "DELETE")
        await showMine()
    }

  return (
    <div>
        <div className="container">
            <div className="row justify-content-center p-5 g-3 my-5">
                <div className='text-center w-50 bg-danger '>
                    <button onClick={showAll} className='btn btn-dark mx-5'>Show All</button>
                    <button onClick={showMine} className='btn btn-dark mx-5'>show my</button>
                </div>
            </div>
            <div className="row justify-content-center p-5 g-3 bg-secondary">
                {all ? 
                (services.map( (_service) => {
                    return <CustomerCard key={_service.id} service={_service} images={_service.images} />
                }))
                :
                (services.map( (_service) => {
                    return <CustomerCard key={_service.id} service={_service} images={_service.images} />
                }))
                }
                {!all && (
                    <div className='d-flex justify-content-center align-items-center bg-dark text-light'>
                        <label>Price: {pack.package_price} </label>
                        <button onClick={checkout} className='btn btn-info mx-5'>Checkout</button>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}