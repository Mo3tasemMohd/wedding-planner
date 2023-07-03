import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

export function CustomerCard(props) {
  let {service} = props
  let token = ""

  let getToken = () => {
    token = localStorage.getItem('token')
  }


  let addToPackage = async () => {
    getToken()
    console.log("token: " + token)
    // console.log(service.id)
    // let response = await fetch("http://127.0.0.1:8000/package/test/", {
    let response = await fetch("http://127.0.0.1:8000/package/add-to-package/", {
      'method': 'POST',
      'headers': {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify({'services': service.id})
    })

    if (response.status == 200)
    {
      let d = response
      // console.log(d)
      d = await d.json()
      // console.log(d.id)
    }
    else{
      console.log(response.status, response.statusText)
    }
  }

  // console.log(service.images[0].image)
  // console.log(ok[1].arr['one'])
  // console.log("/media/service_images/Hall-Reservation.png".split('/').pop())
  return (
    <div className='col-lg-4 col-md-6 col-12'>
      <Card style={{ width: '18rem' }}> 
        {service.images && service.images.map( (img, id) => {
          return <Card.Img className='cardImg' key={id} variant="top" src={"http://127.0.0.1:8000/" + img.image} /> 
        })}
          {/* <Card.Img className='cardImg' variant="top" src="desk2.jpg" />  */}
          {/* <Card.Img className='cardImg' variant="top" src={service.images[0].image.split('/').pop()} />  */}
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
        </Card.Body> 
          <Button onClick={addToPackage} className='btn btn-success'>
            Add
          </Button>
      </Card> 
    </div>
  )
}
