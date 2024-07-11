import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import apiInstance from '../../utils/axios'
import GetCurrentAddress from '../plugin/UserCountry'
import UserData from '../plugin/UserData'
import CartID from '../plugin/CartID'
import { CartContext } from '../plugin/Context'
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast:true,
    position:"top",
    showConfirmButton:false,
    timer:2500,
    timerProgressBar:true
})

function Products() {
    const [products, setProduct] = useState([])
    const [category, setCategory] = useState([])

    const [colorValue, setColorValue] = useState("No Color")
    const [sizeValue, setSizeValue] = useState("No Size")
    const [qtyValue, setQtyValue] = useState(1)


    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedColors, setSelectedColors] = useState({})
    const [selectedSize, setSelectedSize] = useState({})

    const [cartCount, setCartCount] = useContext(CartContext)

    const currentAddress = GetCurrentAddress()
    const userData = UserData()
    const cart_id = CartID()

    const handleColorButtonClick = (event, product_id, colorName) => {

        setColorValue(colorName)
        setSelectedProduct(product_id)       
 
        setSelectedColors((prevSelectedColors) => ({
            ...prevSelectedColors,
            [product_id]: colorName
        }))
    }


    const handleSizeButtonClick = (event, product_id, sizeName) => {

        setSizeValue(sizeName)
        setSelectedProduct(product_id)

        setSelectedSize((prevSelectedSize) => ({
            ...prevSelectedSize,
            [product_id]: sizeName
        }))
    }
   
    const handleQtyChange = (event, product_id) => {
        setQtyValue(event.target.value)
        setSelectedProduct(product_id)
    }
    
    
    // Use the useEffect hook to execute code when the component mounts (empty dependency array).
    useEffect(() => {
        apiInstance.get('products/').then((response) => {
            setProduct(response.data)
        })

    }, []);

    useEffect(() => {
        apiInstance.get('category/').then((res) => {
            setCategory(res.data)
        })

    }, []);

    const handleAddToCart = async (product_id, price, shipping_amount) => {
        const formdata = new FormData()

        formdata.append("product_id", product_id)
        formdata.append("user_id", userData?.user_id)
        formdata.append("qty",  qtyValue)
        formdata.append("price", price)
        formdata.append("shipping_amount", shipping_amount)
        formdata.append("country", currentAddress.country)
        formdata.append("size", sizeValue)
        formdata.append("color", colorValue)
        formdata.append("cart_id", cart_id)

        const response = await apiInstance.post(`cart-view/`, formdata)  

        Swal.fire({
            icon:"success",
            title:response.data.message
        })

        const url = userData? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`
        apiInstance.get(url).then((res) => {
            setCartCount(res.data.length)            
        })
    }   
    const addToWishlist = async (productId, userId) => {
        const axios = apiInstance;
    
        try {
            // Create a new FormData object to send product information to the server
            const formData = new FormData()
            formData.append('product_id', productId)
            formData.append('user_id', userId)
    
            // Send a POST request to the server's 'customer/wishlist/create/' endpoint with the product information
            const response = await axios.post('customer/wishlist/${userId}/', formData)
    
            // Log the response data from the server
            console.log(response.data);
    
            Swal.fire({
                icon: 'success',
                title: response.data.message,
            })

        } catch (error) {
            // Log any errors that occur during the request
            console.log(error);
        }
    }

    return(
        <>                    
            <main className="mt-5">
                <div className="container">
                    <section className="text-center">
                        <div className="row">
                            {products?.map((p, index) => (
                                <div className="col-lg-4 col-md-12 mb-4" key={index}>
                                    <div className="card">
                                        <div
                                            className="bg-image hover-zoom ripple"
                                            data-mdb-ripple-color="light"
                                        >
                                            <Link to={`/detail/${p.slug}/`}>
                                                <img
                                                    src={p.image}
                                                    className="w-100"
                                                    style={{width:"100%", height:"250px", objectFit:"cover"}}
                                                />                              
                                            </Link>
                                        </div>
                                        <div className="card-body">
                                            <Link to={`/detail/${p.slug}/`} className="text-reset">
                                                <h5 className="card-title mb-3">{p.title}</h5>
                                            </Link>
                                            <a href="" className="text-reset">
                                                <p>{p.category?.title}</p>
                                            </a>
                                            <div className="d-flex justify-content-center">
                                                <h6 className="mb-3">${p.price}</h6>
                                                <h6 className="mb-3 text-muted ms-2"><strike>${p.old_price}</strike></h6>
                                            </div>
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-primary dropdown-toggle"
                                                    type="button"
                                                    id="dropdownMenuClickable"
                                                    data-bs-toggle="dropdown"
                                                    data-bs-auto-close="false"
                                                    aria-expanded="false"
                                                >
                                                    Variation
                                                </button>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="dropdownMenuClickable"
                                                >    

                                                    {/* Quantity */}
                                                    <div className="d-flex flex-column">
                                                        <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                            <li className="p-1">
                                                            <b>Quantity</b>
                                                            </li>  
                                                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                <li>
                                                                    <input
                                                                        className='form-control'
                                                                        value={qtyValue}
                                                                        min={1}
                                                                        onChange={(e) => handleQtyChange(e, p.id)}
                                                                        type="number"                                                       

                                                                    />
                                                                </li> 
                                                            </div>                                           
                                                        </div>
                                                    </div>  

                                                    {/* Size */}
                                                    {p.size?.length > 0 && (
                                                        <div className="d-flex flex-column"> 
                                                            <li className="p-1">
                                                            <b>Size</b>: {selectedSize[p.id] || "No Size"}
                                                            </li>                                           
                                                                <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                    {p?.size?.map((size, index) => (
                                                                        <>
                                                                            <li key={index}>
                                                                                <button
                                                                                    className="btn btn-secondary btn-sm me-2 mb-1"
                                                                                    onClick={(e) => handleSizeButtonClick(e, p.id, size.name)}
                                                                                >
                                                                                    {size.name}
                                                                                </button>
                                                                            </li>
                                                                        </>
                                                                    ))}
                                                                </div>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Color */}
                                                    {p.color?.length > 0 && (
                                                        <div className="d-flex flex-column mt-3">    
                                                            <li className="p-1">
                                                            <b>Color</b>: {selectedColors[p.id] || "No Color"}
                                                            </li>                                                                     
                                                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                                {p?.color?.map((color, index) => (                                                    
                                                                        
                                                                    <li>
                                                                        <button
                                                                            
                                                                            className="btn btn-sm me-2 mb-1 p-3"
                                                                            style={{ backgroundColor: `${color.color_code}`}}
                                                                            onClick={(e) => handleColorButtonClick(e, p.id, color.name)}

                                                                        >
                                                                        </button>
                                                                    </li>
                                                                    
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Add To Cart */}
                                                    <div className="d-flex mt-3 p-1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary me-1 mb-1"
                                                            onClick={() => handleAddToCart(p.id, p.price, p.shipping_amount)}
                                                        >
                                                            <i className="fas fa-shopping-cart" />
                                                        </button>
                                                    </div>
                                                </ul>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger px-3 me-1 ms-2"
                                                    onClick={() => addToWishlist(p.id, userData?.user_id)}
                                                >
                                                    <i className="fas fa-heart" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='row'>
                            {category?.map((c, indedx) => (
                                <div className="col-lg-2">
                                <img 
                                    src={c.image} 
                                    style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}                                     
                                />
                                <h6>{c.title}</h6>
                                </div>
                            ))}

                        </div>               

                    </section>
                {/*Section: Wishlist*/}
                </div>
            </main>
        </>
    )
}

export default Products