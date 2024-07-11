//import './App.css'; // Importing the CSS file for styling.

import { Route, Routes, BrowserRouter } from 'react-router-dom' // Importing necessary components from 'react-router-dom' for routing.
import { useEffect, useState } from 'react'
import Login from './views/auth/login' // Importing the 'Login' component.
import Logout from './views/auth/logout' // Importing the 'Logout' component.
import Register from './views/auth/register' // Importing the 'Register' component.
import ForgotPassword from './views/auth/forgotPassword'
import CreatePassword from './views/auth/createPassword'
import StoreHeader from './views/base/storeHeader'
import StoreFooter from './views/base/storeFooter'
import Products from './views/store/Products'
import ProductDetail from './views/store/ProductDetail'
import Cart from './views/store/Cart'
import Checkout from './views/store/Checkout'
import PaymentSuccess from './views/store/PaymentSuccess'
import Search from './views/store/Search'
import { CartContext } from './views/plugin/Context'
import CartID from './views/plugin/CartID'
import UserData from './views/plugin/UserData'
import apiInstance from './utils/axios'
import Account from './views/customer/Account'
import PrivateRoute from './layout/PrivateRoute' // Importing the 'PrivateRoute' component.
import MainWrapper from './layout/MainWrapper' // Importing the 'MainWrapper' component.
import Orders from './views/customer/Orders'
import OrderDetail from './views/customer/OrderDetail'
import Wishlist from './views/customer/Wishlist'
import CustomerNotification from './views/customer/CustomerNotification'
import CustomerSettings from './views/customer/CustomerSettings'
import Invoice from './views/customer/Invoice'
import Dashboard from './views/vendor/Dashboard'
import Product from './views/vendor/Product'
import VendorOrders from './views/vendor/Orders'
import VendorOrderDetail from './views/vendor/OrderDetail'
import Earning from './views/vendor/Earning'





/*
import AddProduct from './views/vendor/AddProduct';
import UpdateProduct from './views/vendor/UpdateProduct';



import Reviews from './views/vendor/Reviews';
import ReviewDetail from './views/vendor/ReviewDetail';
import Coupon from './views/vendor/Coupon';
import EditCoupon from './views/vendor/EditCoupon';
import VendorNotifications from './views/vendor/Notifications';
import VendorSettings from './views/vendor/Settings';
import Shop from './views/vendor/Shop';
import VendorRegister from './views/vendor/VendorRegister';
import OrderItemDetail from './views/vendor/OrderItemDetail';
*/


function App() { // Define the main 'App' component.
    const [count, setCount] = useState(0)
    const [cartCount, setCartCount] = useState()

    const cart_id = CartID()
    const userData = UserData()
    
    useEffect(() => {
        const url = userData? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
        apiInstance.get(url).then((res) => {
            setCartCount(res.data.length)            
        })
    }, [])

    return (
        <CartContext.Provider value={[cartCount, setCartCount]} >

            <BrowserRouter>                             
                <StoreHeader />  
                <MainWrapper>
                    <Routes> {/*  Define a collection of routes.*/}                      
                        {/* Authentication Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />             
                        <Route path="/forgot-password" element={<ForgotPassword />} /> 
                        <Route path="/create-new-password" element={<CreatePassword />} />  

                        {/* Store Components */}
                        <Route path="/" element={<Products />} />
                        <Route path="/detail/:slug/" element={<ProductDetail />} />
                        <Route path="/cart/" element={<Cart />} />
                        <Route path="/checkout/:order_oid/" element={<Checkout />} />
                        <Route path="/payment-success/:order_oid/" element={<PaymentSuccess />} />
                        <Route path="/search" element={<Search />} />

                        {/* Customer Routes */}
                        <Route path="/customer/account/" element={<PrivateRoute><Account /></PrivateRoute>} />
                        <Route path="/customer/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
                        <Route path="/customer/orders/:order_oid/" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
                        <Route path="/customer/wishlist/" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
                        <Route path="/customer/notifications/" element={<PrivateRoute><CustomerNotification /></PrivateRoute>} />
                        <Route path="/customer/settings/" element={<PrivateRoute><CustomerSettings /></PrivateRoute>} />
                        <Route path="/customer/invoice/:order_oid/" element={<PrivateRoute><Invoice /></PrivateRoute>} />

                        {/* Vendor Routes */}
                        <Route path="/vendor/dashboard/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/vendor/products/" element={<PrivateRoute> <Product /></PrivateRoute>} />
                        <Route path="/vendor/orders/" element={<PrivateRoute> <VendorOrders /></PrivateRoute>} />
                        <Route path="/vendor/orders/:order_oid/" element={<PrivateRoute> <VendorOrderDetail /></PrivateRoute>} />
                        <Route path="/vendor/earning/" element={<PrivateRoute> <Earning /></PrivateRoute>} />




                            
                    </Routes>
                </MainWrapper>
                        
                <StoreFooter />   
            </BrowserRouter>

        </CartContext.Provider >

    )
}

export default App; // Export the 'App' component as the default export.
