import React, { useEffect, useState } from 'react'
import { CustomerCard } from './CustomerCard'

export function CustomerCardsContainer() {

    let [services, setServices] = useState([])

    useEffect(() => {
        getCards()
    }, [])

    let getCards = async () => {
        setServices([
            {
                id: 1,
                name: 'hall',
                url: 'hall.png'
            },
            {
                id: 2,
                name: 'car',
                url: 'car.png'
            },
            {
                id: 3,
                name: 'photosession',
                url: 'photosession.png'
            },
        ])

        let response = await fetch('http://127.0.0.1:8000/service/all-services',
        {
            method:'GET',
        }
        )
        let data = await response.json()

        if(response.status === 200){
            setServices(data['results'])
            console.log(data['results'])
        }   
        else{
            console.log("failed")
        }

    }

  return (
    <div>
        <div className="container">
            <div className="row justify-content-center p-5 g-3">
                {services.map( (_service) => {
                    return <CustomerCard key={_service.id} service={_service} images={_service.images} />
                })}
            </div>
        </div>
    </div>
  )
}
