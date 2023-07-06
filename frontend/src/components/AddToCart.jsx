import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker'



export function AddToCart(props) {
  let {service} = props
  let token = ""

  let [error, setError] = useState(false)
  let [calendar, setCalendar] = useState(null)
  let [addedService, setAddedService] = useState(false)
  let [excluded, setExcluded] = useState([])



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
    .then( async (data) => {
      if ((data.services).includes(service.id)){
        setAddedService(true)
        let date = await fetch(`http://127.0.0.1:8000/service/${service.id}/getreserveddate/`,
        {
          "method": 'GET',
          "headers": {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          }
        }).then ((response) => response.json())
        .then((data) => {
          setCalendar(new Date(`${data.date_reserved} ${data.slot_reserved}:00`))
        })
      }
    }).catch()

  }

  useEffect(() => {
    checkReserved() 
  }, [addedService])
  

  let deleteFromPackage = async () => {
    token = localStorage.getItem('token')
        let response = await fetch(`http://127.0.0.1:8000/service/${service.id}/reserveddate/`,
        {
        'method': 'DELETE',
        'headers': {
            "Authorization": 'Bearer ' + token,
            "Content-Type": 'application/json',
        }
        })
        .then( async (response) => {
            let resp = await callPackage("delete-from-package", "DELETE")
            if (resp.status == 200)
            {
                setCalendar("")
                setAddedService(false)
                await showReservedDates()
            }
        })
  }


  let callPackage = async (url, meth) => {
    token = localStorage.getItem('token')
    let response = await fetch(`http://127.0.0.1:8000/package/${url}/`, {
        'method': `${meth}`,
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
      let response = await callPackage("add-to-package", "POST")
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
    let response = await fetch(`http://127.0.0.1:8000/service/${service.id}/reserveddates`);

    if (response.status == 200) {
      let response_data = await response.json();
      console.log(response_data);
      filterReservations(response_data)
    } else {
      console.log('failed');
    }
  };

  
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
        <Card.Body>
          <span>
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
          </span>
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