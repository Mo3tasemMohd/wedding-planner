import React, { useEffect, useState } from 'react'
import { CustomerCard } from './CustomerCard'

export function CustomerCardsContainer() {

    let [services, setServices] = useState([])
    let [all, setAll] = useEffect(false)

    // useEffect(() => {
    //     getCards()
    // }, [])

    let getCards = async (url) => {
        let response = await fetch(`http://127.0.0.1:8000/service/all-services`,
        {
            method:'GET',
        }
        )
        let data = await response.json()
        if(response.status === 200){
            setServices(data['results'])
        }   
        else{
            console.log("failed")
        }
    }


    let showAll = async () => {
        setAll(true)
        await getCards("service/all-services")
    }
    let showMine = async () => {
        setAll(false)
        await getCards("view-package-services/")
    }

  return (
    <div>
        <div className="container">
            <div className="row justify-content-center p-5 g-3 my-5">
                <div className='text-center w-25 '>
                    <button onClick={showAll} className='btn btn-primary'>Show All</button>
                    <button onClick={showMine} className='btn btn-primary'>show my</button>
                </div>
            </div>
            <div className="row justify-content-center p-5 g-3 bg-danger">
                {all ? (services.map( (_service) => {
                    return <CustomerCard key={_service.id} service={_service} images={_service.images} />
                })) :
                (services.map( (_service) => {
                    {/* return <CustomerCard key={_service.id} service={_service} images={_service.images} /> */}
                }))}
            </div>
        </div>
    </div>
  )
}
