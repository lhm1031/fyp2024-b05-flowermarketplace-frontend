import React, { useEffect, useState } from 'react'
import apiInstance from '../../utils/axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { SERVER_URL } from '../../utils/constants'
//import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"



//import GetCurrentAddress from '../plugin/UserCountry'
import UserData from '../plugin/UserData'
import CartID from '../plugin/CartID'



function Checkout() {
  const [order, setOrder] = useState([])
  const [couponCode, setCouponCode] = useState("")
  const [paymentLoading, setPaymentLoading] = useState(false)

  const param = useParams() 

 
  const [loading, setLoading] = useState(false)
  const userData = UserData()
  let cart_id = CartID()
  
  //let navigate = useNavigate();

  const fetchOrderData = () => {
    apiInstance.get(`checkout/${param.order_oid}/`).then((res) => {
      setOrder(res.data)
    })
  }

  useEffect(() => {
      fetchOrderData()    
  }, []) 

  const applyCoupon = async () => {  
    console.log(couponCode);
    console.log(order.oid);

    const formdata = new FormData()
    formdata.append("order_oid", order.oid)
    formdata.append("coupon_code", couponCode)

    try {
          const response = await apiInstance.post("coupon/", formdata) 
          fetchOrderData()       
          Swal.fire({
            icon: response.data.icon,
            title: response.data.message
          })
    } catch (error) {
        console.log(error);

    }
  }

  const payWithStripe = (event) => {
    setPaymentLoading(true)
    event.target.form.submit();
  }

/*
  const initialOptions = {
    clientId: PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case "couponCode":
        setCouponCode(value)
        break;

      default:
        break;
    }
  }





*/
  return (
    <div>
      <main>
            <main className="mb-4 mt-4">
                <div className="container">
                    {/* Section: Checkout form */}
                    <section className="">
                        <div className="row gx-lg-5">
                            <div className="col-lg-8 mb-4 mb-md-0">
                            {/* Section: Biling details */}
                                <section className="">
                                    <div className="alert alert-warning">
                                    <strong>Review Your Shipping &amp; Order Details </strong>
                                    </div>
                                    <div>
                                        <h5 className="mb-4 mt-4">Contact Information</h5>                     
                                        <div className="row mb-4">
                                            <div className="col-lg-12">                                            
                                                <label className="form-label" htmlFor="form6Example2">Full Name</label>
                                                <input
                                                    type="text"
                                                    id="form6Example2"
                                                    readOnly
                                                    className="form-control"
                                                    name='fullName'
                                                    value={order.full_name}
                                                />                                            
                                            </div>
                                            <div className="col-lg-6 mt-3">                                                
                                                    <label className="form-label" htmlFor="form6Example2">Email</label>
                                                    <input
                                                      type="text"
                                                      id="form6Example2"
                                                      readOnly
                                                      className="form-control"
                                                      name='email'
                                                      value={order.email}
                                                    />                                                
                                            </div>
                                            <div className="col-lg-6 mt-3">                                            
                                                <label className="form-label" htmlFor="form6Example2">Mobile</label>
                                                <input
                                                type="text"
                                                id="form6Example2"
                                                readOnly
                                                className="form-control"
                                                name='mobile'
                                                value={order.mobile}
                                                />                                            
                                            </div>
                                        </div>  
                                        <h5 className="mb-4 mt-5">Shipping Details</h5>   
                                        <div className="row mb-4">                  
                                            <div className="col-lg-6 mt-3">                       
                                                <label className="form-label" htmlFor="form6Example2">Address</label>
                                                <input
                                                  type="text"
                                                  id="form6Example2"
                                                  readOnly
                                                  className="form-control"
                                                  name='address'
                                                  value={order.address}
                                                />                                            
                                            </div>
                                            <div className="col-lg-6 mt-3">                                            
                                                <label className="form-label" htmlFor="form6Example2">City</label>
                                                <input
                                                  type="text"
                                                  id="form6Example2"
                                                  readOnly
                                                  className="form-control"
                                                  name='city'
                                                  value={order.city}
                                                />                                            
                                            </div>
                                            <div className="col-lg-6 mt-3">                                                
                                                  <label className="form-label" htmlFor="form6Example2">State</label>
                                                    <input
                                                      type="text"
                                                      id="form6Example2"
                                                      readOnly
                                                      className="form-control"
                                                      name='state'
                                                      value={order.state}
                                                  />                                                
                                            </div>
                                            <div className="col-lg-6 mt-3">                                                
                                                  <label className="form-label" htmlFor="form6Example2">Country</label>
                                                    <input
                                                      type="text"
                                                      id="form6Example2"
                                                      readOnly
                                                      className="form-control"
                                                      name='country'
                                                      value={order.country}
                                                  />                                                
                                            </div>
                                        </div>                

                                        <h5 className="mb-4 mt-4">Billing address</h5>
                                        <div className="form-check mb-2">
                                            <input className="form-check-input me-2" type="checkbox" defaultValue="" id="form6Example8" defaultChecked="" />
                                            <label className="form-check-label" htmlFor="form6Example8">
                                                Same as shipping address
                                            </label>
                                        </div>
                                    </div>
                                </section>
                            {/* Section: Biling details */}
                            </div>
                            <div className="col-lg-4 mb-4 mb-md-0">
                                {/* Section: Summary */}
                                <section className="shadow-4 p-4 rounded-5 mb-4">
                                    <h5 className="mb-5">Order Summary</h5>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Sub Total </span>
                                        <span>${order?.sub_total}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Shipping </span>
                                        <span>${order?.shipping_amount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Tax Fee</span>
                                        <span>${order?.tax_fee}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Servive Fee </span>
                                        <span>${order?.service_fee}</span>
                                    </div>
                                    {order.saved != "0.00" &&

                                      <div className="d-flex text-danger fw-bold justify-content-between mb-3">
                                        <span>Discount </span>
                                        <span>-${order?.saved}</span>
                                      </div>                                  
                                    }
                                    <hr className="my-4" />
                                    <div className="d-flex justify-content-between fw-bold mb-5">
                                        <span>Total </span>
                                        <span>${order?.total}</span>
                                    </div>
                                    <section className ="shadow rounded-3 card p-4 mb-4 rounded 5">
                                      <h5 className='mb-4'>Apply Promo Code </h5>
                                      <div className='d-flex align-items-center'>
                                        <input
                                          type="text"                       
                                          className="form-control rounded-me-1"
                                          placeholder="Promo Code"
                                          onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                        <button
                                          type="button"
                                          className="btn btn-success ms-2 btn-rounded overflow-visble"
                                          onClick={applyCoupon}
                                        >
                                          Apply
                                        </button>
                                      </div>
                                    </section>
                                    
                                    {paymentLoading === true &&                                    
                                        <form action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`}>
                                            <button onClick={payWithStripe} disabled type="submit" className="btn btn-primary btn-rounded w-100">                                     
                                                Processing... <i className='fas fa-spinner fa-spin'></i>
                                            </button>
                                        </form>                                 
                                    }

                                    {paymentLoading === false &&                                    
                                        <form action={`${SERVER_URL}/api/v1/stripe-checkout/${order?.oid}/`} method='POST'>
                                            <button onClick={payWithStripe} type="submit" className="btn btn-primary btn-rounded w-100">                                     
                                                Pay With Stripe <i className='fas fa-credit-card'></i>
                                            </button>
                                        </form>                                 
                                    }
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
      </main>
    </div>
  )
}

export default Checkout