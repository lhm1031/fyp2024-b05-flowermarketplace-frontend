import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import Swal from 'sweetalert2'
import moment from 'moment'

function CustomerNotification() {

    const [notifications, setNotifications] = useState([])   

    const axios = apiInstance
    const userData = UserData()

    const fetchNoti = () => {
        axios.get(`customer/notification/${userData?.user_id}/`).then((res) => {
            setNotifications(res.data)
            console.log(res.data);            
        })        
    }

    useEffect(() => {
        fetchNoti()
    }, [])

    const MarkNotiAsSeen = (notiId) => {
        axios.get(`customer/notification/${userData?.user_id}/${notiId}/`).then((res) => {
            fetchNoti()        
        })  
        
        Swal.fire({
            icon: "success",
            text: "Notification Marked As Seen."
        })    
    }

    return (
        <div>
            <main className="mt-5" style={{ marginBottom: 200 }}>
                <div className="container">
                    <section className="">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-9 mt-1">
                                <section className="">
                                    <main className="mb-5" style={{}}>
                                        <div className="container px-4">
                                            {/* Section: Summary */}
                                            <section className="">
                                                <h3 className="mb-3">
                                                    {" "}
                                                    <i className="fas fa-bell" /> Notifications{" "}
                                                </h3>
                                                <div className="list-group">
                                                    {notifications?.map((n, index) => (
                                                        <a href="#" className="list-group-item list-group-item-action" aria-current="true" >
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Order Confirmed</h5>
                                                                <small>{moment(n.date).format("DD MMM, YYYY")}</small>
                                                            </div>
                                                            <p className="mb-1" align="left">
                                                                Your order #{n?.order?.oid} has been confirmed.<br />
                                                                Total: ${n?.order?.total} <br />
                                                                <button onClick={() => MarkNotiAsSeen(n.id)} className='btn btn-success mt-3'><i className='fas fa-eye'></i></button> 
                                                            </p>                                                            
                                                        </a>
                                                    ))}
                                                </div>
                                                
                                                {notifications.length < 1 &&
                                                    <h4 className='p-4'>No notifications yet. </h4>
                                                }

                                            </section>
                                        </div>
                                    </main>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default CustomerNotification