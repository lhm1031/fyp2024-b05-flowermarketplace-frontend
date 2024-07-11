import { useState } from 'react';
import apiInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleEmailSubmit = async () => {
        setIsLoading(true)
        try {
            await apiInstance.get(`user/password-reset/${email}/`).then((res) => {               
                alert("An email has been sent to you.")
                setIsLoading(false)                
            })          
        } catch (error) {            
            alert("Email Does Not Exist")
            setIsLoading(false)
        } 
    }

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Forgot Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <div>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Email Address : 
                                                        </label>
                                                        <input
                                                            onChange={(e) => setEmail(e.target.value)}         
                                                            type="email"
                                                            placeholder='Enter Email'
                                                            id="email"
                                                            name="email"
                                                            className="form-control"                                                                                                              
                                                        />
                                                    </div>

                                                    {isLoading === true
                                                        ? <button disabled type="button" className="btn btn-primary btn-rounded w-100 mb-4">
                                                            Processing... 
                                                        </button>

                                                        : <button onClick={handleEmailSubmit} type="button" className="btn btn-primary btn-rounded w-100 mb-4">
                                                            Send Email <i className="fas fa-paper-plane" />
                                                        </button>
                                                    }
                                                    <div className="text-center">
                                                        <p className='mt-4'>
                                                            Want to sign in? <Link to="/login">Login</Link>
                                                        </p>
                                                    </div>  

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    )
}

export default ForgotPassword