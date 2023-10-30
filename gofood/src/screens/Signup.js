import React from 'react'
import Login from './Login'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", location: ""})

    const handleClick = async(e) => {
      e.preventDefault();
      let navLocation = () => {
        return new Promise((res,req)=> {
          navigator.geolocation.getCurrentPosition(res,req);
        });
      }
      let latlong = await navLocation().then(res => {
        let latitude = res.coords.latitude;
        let longitude = res.coords.longitude;
        return [latitude,longitude]
      })
      let [lat,long] = latlong
      console.log(lat,long)
      const response = await fetch("http://localhost:5000/api/geolocation",{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({latlong: {lat,long}})
      });

    }

    const handleSubmit = async(e) => {
       e.preventDefault();
       try{
       const response = await fetch("http://localhost:5000/api/createuser",{
         method: 'POST',
         headers: {
            'Content-Type':'application/json'
         },
         body: JSON.stringify({name:credentials.name, email:credentials.email, password: credentials.password, location: credentials.location})
       });
       if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const json = await response.json();
       console.log(json);
       alert("Successfully registered...");
       navigate("/login");


       if(!json.success){
        alert("Enter valid credentials");
       }
    }catch(error){
        console.error('An error occured:', error);
    }
    }
    const onChange = (event) => {
       setCredentials({...credentials,[event.target.name]: event.target.value})
    }

  return (
    <>
<div className='container'>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"
    name="password" value={credentials.password} onChange={onChange}/>

  </div>
  <div className="mb-3">
  <label htmlFor="exampleInp" className="form-label">Location</label>
    <input type="text" className="form-control"
    name="location" value={credentials.location} onChange={onChange}/>
  </div>
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to = "/login" className='m-3 btn btn-danger'>Already A User</Link> 
</form>
</div>
    </>
  )
}

export default Signup
