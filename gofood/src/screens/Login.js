import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: ""})
    let navigate = useNavigate()

    const handleSubmit = async(e) => {
       e.preventDefault();
       try{
       const response = await fetch("http://localhost:5000/api/loginuser",{
         method: 'POST',
         headers: {
            'Content-Type':'application/json'
         },
         body: JSON.stringify({name:credentials.name, email:credentials.email, password: credentials.password})
       });
       
       if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
       }
       const json = await response.json();
       console.log(json);
       alert("Successfully logged in..");
       navigate("/");

       if(!json.success){
        alert("Enter valid credentials..");
       }
       if(json.success){
        localStorage.setItem("authToken",json.authToken)
        localStorage.setItem("userEmail",credentials.email);
        console.log(localStorage.getItem("authToken"))
        
        navigate("/");
       }
    }catch(error){
        console.error(error);
    }



    }

    const onChange = (event) => {
       setCredentials({...credentials,[event.target.name]: event.target.value})
    }
  return (
    <div>
        <div className='container'>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"
    name="password" value={credentials.password} onChange={onChange}/>

  </div>
  <button type="submit" className="m-3 btn btn-success">Login</button>
  <Link to = "/createuser" className='m-3 btn btn-danger'>I am a New User</Link> 
</form>
</div>
    </div>
  )
}

export default Login
