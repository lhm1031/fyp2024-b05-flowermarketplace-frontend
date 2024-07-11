import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import Sidebar from './Sidebar'

function Orders() {
    const [orders, setOrders] = useState([])

    const axios = apiInstance
    const userData = UserData()

    if (UserData()?.vendor_id === 0) {
        window.location.href = '/vendor/register/'
      }

    useEffect(() => {
        axios.get(`vendor/orders/${userData?.vendor_id}/`).then((res) => {
            setOrders(res.data);  
            console.log(res.data);  
        })
   
    }, []);

    return (
        <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main">
                    <div className="mb-3 mt-3" style={{ marginBottom: 300 }}>
                        <div>
                            <h4><i class="bi bi-cart-check-fill"></i> All Orders  </h4>

                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#Order ID</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>                                    
                                    </tr>
                                </thead>
                                <tbody>
                                {orders?.map((o, index) => (
                                    <tr key={index}>
                                        <th scope="row">#{o.oid}</th>
                                        <td>${o.total}</td>
                                        <td>{o.payment_status?.toUpperCase()}</td>
                                        <td>{o.order_status?.toUpperCase()}</td>
                                        <td>{moment(o.date).format("DD MMM, YYYY")}</td>
                                        <td>
                                            <Link to={`/vendor/orders/${o.oid}/`} className="btn btn-primary mb-1">
                                                <i className="fas fa-eye" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {orders < 1 &&
                                    <h5 className='mt-4 p-3'>No orders yet</h5>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
