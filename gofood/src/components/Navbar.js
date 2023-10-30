import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import { useState } from 'react';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Navbar(props) {
  const [cartview , setCartView] = useState(false);
  localStorage.setItem('temp',"first")
  let items = useCart();
 const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem("authToken");
    navigate("/login")

  }
  const loadCart = () => {
    setCartView(true)
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">GO-FOOD</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>

        </li>
      : ""}
       
        
      </ul>
      {(!localStorage.getItem("authToken"))?
      <div className='d-flex'>
      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
    
  
      <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
      </div>
      : 
      <div>
      <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
      Logout
      </div>
      <div className='btn bg-white text-success mx-2' onClick={loadCart}>
      <Badge color="secondary" badgeContent={items.length}><ShoppingCartIcon/></Badge>
        Cart
       
        </div>
        {cartview? <Modal onClose={()=>setCartView(false)} ><Cart /></Modal> : ""}
        </div>
      }
       
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
