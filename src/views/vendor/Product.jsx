import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import { Link } from 'react-router-dom'


function Product() {
    const [products, setProducts] = useState([])
    const userData = UserData()

    useEffect(() => {
        apiInstance.get(`vendor/products/${userData?.vendor_id}/`).then((res) => {           
            setProducts(res.data);
        })
    }, [])

    return (
        <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <Sidebar />            
            <div className="col-md-9 col-lg-10 main mt-2">
                <div className="row mb-3 container">
                    <div className="col-lg-12" style={{ marginBottom: 100 }}>
                    <div className="tab-content">
                        <br />
                        <div role="tabpanel" className="tab-pane active" id="home1">
                        <h4 className='mb-3'>Products</h4>
                        <table className="table">
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Orders</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {products?.map((p, index) => (
                                    <tr key={index}>
                                        <th scope="row">
                                            <img src={p.image} style={{width:"100px", height:"100px", objectFit:"cover", borderRadius:"10px"}} alt="" />
                                        </th>
                                        <td>{p.title}</td>
                                        <td>${p.price}</td>
                                        <td>{p.stock_qty}</td>
                                        <td>{p.orders}</td>
                                        <td>{p?.status?.toUpperCase()}</td>
                                        <td>
                                        <Link to={`/detail/${p.slug}`} className="btn btn-primary mb-1 me-2"><i className="fas fa-eye" /></Link>
                                        <Link to="" className="btn btn-success mb-1 me-2"><i className="fas fa-edit" /></Link>
                                        <Link to="" className="btn btn-danger mb-1 me-2"><i className="fas fa-trash" /></Link>
                                        </td>
                                    </tr>
                                ))}

                                {products < 1 &&
                                <h5 className='mt-4 p-3'>No products yet</h5>
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Product