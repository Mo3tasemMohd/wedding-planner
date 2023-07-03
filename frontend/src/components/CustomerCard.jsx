import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker'



export function CustomerCard(props) {
  let {service} = props
  let token = ""

  let [error, setError] = useState(false)
  let [calendar, setCalendar] = useState(null)
  let [slot, setslot] = useState(0)
  let timeRelevance = {
    "15": 1,
    "18": 2,
    "21": 3
  }
  let getToken = () => {
    token = localStorage.getItem('token')
  }


  const filterTime = (time) => {
    const hours = time.getHours();
    return hours >= 15 && hours < 24 ;
  };


  let addToPackage = async () => {
    let temp = new Date(calendar)
    let year = temp.getFullYear()
    let month = String(temp.getMonth() + 1).padStart(2, '0')
    let day = String(temp.getDate()).padStart(2, '0')
    let tempDate = `${year}-${month}-${day}`

    let time = temp.getHours()
    // console.log(time)

    if (!calendar || ((time != 15) && (time != 18) && (time != 21)) )
    {
      setError(true)
      console.log("failed")
    }
    else{
      setError(false)
      getToken()
      // console.log("token: " + token)
      let response = await fetch("http://127.0.0.1:8000/package/add-to-package/", {
        'method': 'POST',
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify({'services': service.id})
      })

      if (response.status == 200) {}
      else console.log(response.status, response.statusText)

      // console.log(timeRelevance[toString(time)])
      // console.log("convert: " + time.toString())
      // let date_response = await fetch("http://127.0.0.1:8000/package/test/", {
      let date_response = await fetch("http://127.0.0.1:8000/service/add-service-reserveddate/", {
        'method': 'POST',
        'headers': {
          "Authorization": 'Bearer ' + token,
          "Content-Type": 'application/json',
        },
        // 'body': JSON.stringify(calendar)
        'body': JSON.stringify(
          {
          "service_reserved": service.id,
          "date_reserved": tempDate,
          "slot_reserved": timeRelevance[time.toString()]
          })
      })
      if (date_response.status == 201) console.log("okay")
      else console.log(date_response.status, date_response.statusText)

    }
  }

  return (
    <div className='col-lg-4 col-md-6 col-12'>
      <Card style={{ width: '100%' }}> 
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
          <Card.Text>
            <Card.Title>Select date: </Card.Title>
            <DatePicker
              selected={calendar}
              showTimeSelect={true}
              onChange={date => setCalendar(date)}
              // dateFormat="yyyy-MM-dd"
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={new Date()}
              showYearDropdown
              scrollableMonthYearDropdown
              filterTime={filterTime}
              timeIntervals={180}
              
            />
          </Card.Text>
          {error && (<p className='text-danger'> Select valid date and time </p>)}
          
        </Card.Body>


          <Button onClick={addToPackage} className='btn btn-success'>
            Add
          </Button>
      </Card> 
    </div>
  )
}
