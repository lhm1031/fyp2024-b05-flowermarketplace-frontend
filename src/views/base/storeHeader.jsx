import React, { useContext, useState, useEffect } from 'react'
import { useAuthStore } from '../../store/auth'
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from '../plugin/Context'


function StoreHeader() {
  const [isLoggedIn, user] = useAuthStore((state) => [
      state.isLoggedIn,
      state.user,
  ])

  const cartCount = useContext(CartContext)  

  const [search, setSearch] = useState("")

  const handleSearchChange = (event) => {
      setSearch(event.target.value)
      console.log(search);
  }
  
  const navigate = useNavigate()

  const handleSearchSubmit = () => {
     navigate(`/search?query=${search}`)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Blossom Flower Marketplace
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Pages
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">About Us</a></li>
                                    <li><a className="dropdown-item" href="#">Contact Us</a></li>
                                    <li><a className="dropdown-item" href="#">Blog </a></li>
                                    <li><a className="dropdown-item" href="#">Changelog</a></li>
                                    <li><a className="dropdown-item" href="#">Terms & Condition</a></li>
                                    <li><a className="dropdown-item" href="#">Cookie Policy</a></li>

                                </ul>
                            </li> */}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to={"/customer/account/"} className="dropdown-item">
                      <i className="fas fa-user"></i> Account
                    </Link>
                  </li>
                  <li>
                    <Link to={`/customer/orders/`} className="dropdown-item" >
                      <i className="fas fa-shopping-cart"></i> Orders
                    </Link>
                  </li>
                  <li>
                    <Link to={`/customer/wishlist/`} className="dropdown-item" >
                      <i className="fas fa-heart"></i> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to={`/customer/notifications/`} className="dropdown-item" >    
                      <i className="fas fa-bell fa-shake"></i> Notifications
                    </Link>
                  </li>
                  <li>
                    <Link to={`/customer/settings/`} className="dropdown-item" >
                      <i className="fas fa-gear fa-spin"></i> Settings
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Vendor
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to={"/vendor/dashboard/"} className="dropdown-item" >
                        <i className="fas fa-user"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/products/" className="dropdown-item" >
                      {" "}
                      <i className="bi bi-grid-fill"></i> Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/product/new/" className="dropdown-item" >
                      {" "}
                      <i className="fas fa-plus-circle"></i> Add Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/orders/" className="dropdown-item" >
                      {" "}
                      <i className="fas fa-shopping-cart"></i> Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/earning/" className="dropdown-item" >
                      {" "}
                      <i className="fas fa-dollar-sign"></i> Earning
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/reviews/" className="dropdown-item" >
                      {" "}
                      <i className="fas fa-star"></i> Reviews
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/coupon/" className="dropdown-item" >
                      {" "}
                      <i className="fas fa-tag"></i> Coupon
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/notifications/" className="dropdown-item" >
                      {" "}
                      <i className="fas fa-bell fa-shake"></i> Notifications
                    </Link>
                  </li>
                  <li>
                    <Link to="/vendor/settings/" className="dropdown-item" >
                      {" "}
                      <i className="fas fa-gear fa-spin"></i> Settings
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success me-2" type="button"
                    onClick={handleSearchSubmit}                  
                >
                    Search
                </button>
            </form>
            {isLoggedIn()
              ? 
              <>
                <Link className="btn btn-primary me-2" to="/dashboard">Dashboard</Link>
                <Link className="btn btn-primary me-2" to="/logout">Logout</Link>
              </>
              : 
              <>
                <Link className="btn btn-primary me-2" to="/login">Login</Link>
                <Link className="btn btn-primary me-2" to="/register">Register</Link>
              </>
              
            }

            <Link className="btn btn-danger" to="/cart/">
              <i className="fas fa-shopping-cart"></i>{" "}
              <span id="cart-total-items">{cartCount}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default StoreHeader;


