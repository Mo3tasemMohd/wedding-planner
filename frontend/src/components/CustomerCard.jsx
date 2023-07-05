import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker'



export function CustomerCard(props) {
  let {service} = props
  let token = ""

  let [error, setError] = useState(false)
  let [calendar, setCalendar] = useState(null)
  let [addedService, setAddedService] = useState(false)
  let [excluded, setExcluded] = useState([])
  let timeRelevance = {
    "15": 1,
    "18": 2,
    "21": 3
  }


  let checkReserved = async () => {
    token = localStorage.getItem('token')
    let response =  await fetch ("http://127.0.0.1:8000/package/view/",
    {
      'method': 'GET',
      'headers': {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if ((data.services).includes(service.id)){
        console.log("(data.services).includes(service.id)")
        setAddedService(true)
        
      }
    })

  }

  useEffect(() => {
    checkReserved() 
  }, [addedService])
  

  let deleteFromPackage = async () => {

  }


  let callPackage = async (url) => {
    token = localStorage.getItem('token')
    let response = await fetch(`http://127.0.0.1:8000/package/${url}/`, {
        'method': 'POST',
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify({"services": service.id})
    })
    return response
  }

  let addToPackage = async () => {
    let temp = new Date(calendar)
    let year = temp.getFullYear()
    let month = String(temp.getMonth() + 1).padStart(2, '0')
    let day = String(temp.getDate()).padStart(2, '0')
    let tempDate = `${year}-${month}-${day}`

    let time = temp.getHours()

    if (!calendar || ((time != 15) && (time != 18) && (time != 21)) )
    {
      setError(true)
      console.log("failed")
    }
    else{
      setError(false)
      let response = await callPackage("add-to-package")
      if (response.status == 200) {
        let date_response = await fetch("http://127.0.0.1:8000/service/add-service-reserveddate/", {
            'method': 'POST',
            'headers': {
              "Authorization": 'Bearer ' + token,
              "Content-Type": 'application/json',
            },
            'body': JSON.stringify(
              {
              "service_reserved": service.id,
              "date_reserved": tempDate,
              // "slot_reserved": timeRelevance[time.toString()]
              "slot_reserved": time.toString()
              })
        })
        if (date_response.status == 201) {
          console.log("all done")
          setAddedService(true)
        }
        else {
          console.log("saved services, failed date", date_response.status, date_response.statusText)
          setAddedService(false)
        }
      }
      else {
        console.log("failed to save service", response.status, response.statusText)
        setAddedService(false)
      }
    }
  }


  const showReservedDates = async () => {
    console.log('opened');
    let response = await fetch(`http://127.0.0.1:8000/service/${service.id}/reserveddates`);
    console.log('fetched');

    if (response.status == 200) {
      let response_data = await response.json();
      console.log(response_data);
      filterReservations(response_data)
    } else {
      console.log('failed');
    }
  };

  // let filterReservations = (dates) => {
  //   dates.map((date) => {
  //     console.log(date['date_reserved'], date['slot_reserved'])
  //     setExcluded([{
  //         "time": `${date['slot_reserved']}:00`,
  //         "date": date['date_reserved']
  //       }, ...excluded 
  //     ])
  //   })
  //   console.log(excluded)
  // }
  
  const filterReservations = (dates) => {
    const newExcluded = dates.map((date) => ({
      time: `${date.slot_reserved}:00`,
      date: date.date_reserved,
    }));
    setExcluded(newExcluded);
  };
  const filterTime = (time) => {
    const hours = time.getHours();
    return hours >= 15 && hours < 24 ;
  };

  return (
    <div className='col-lg-4 col-md-6 col-12'>
      <Card style={{ width: '100%' }}> 
        {service.images && service.images.map( (img, id) => {
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
            <DatePicker
              selected={calendar}
              showTimeSelect={true}
              onCalendarOpen={showReservedDates}
              onChange={date => setCalendar(date)}
              excludeTimes={
                excluded
                  .filter((exclude) => {
                    const excludeDate = new Date(exclude.date);
                    return excludeDate.toDateString() === (calendar ? calendar.toDateString() : '');
                  })
                  .map((exclude) => {
                    const [hours, minutes] = exclude.time.split(':');
                    return new Date(new Date().setHours(hours, minutes, 0));
                  })
              }
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={new Date()}
              showYearDropdown
              readOnly={addedService}
              scrollableMonthYearDropdown
              filterTime={filterTime}
              timeIntervals={180}
              timeZone="Africa/Cairo"
            />
          </Card.Text>
          {error &&  (<p className='text-danger'> Select valid date and time </p>)}

          {/* {addedService && (<p className='text-success'>Reservation completed</p>)} */}
        </Card.Body>

        {addedService ? (
        <Button onClick={deleteFromPackage} className='btn btn-danger'>
        Cancel reservation and pick another date
        </Button>
        ) : (
        <Button onClick={addToPackage} className='btn btn-success'>
        Add
        </Button>
        )}
      </Card> 
    </div>
  )
}
