import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/user-service';
import {toast, ToastContainer} from 'react-toastify';


const Signup = () => {

    const [user, setUser] = useState({
        name: "",
        mobile: "",
        password: ""
    });

    const handleChange = (e, field) => {
        setUser({ ...user, [field]: e.target.value });
    }

    const resetForm = () => {
        setUser({
            name: "",
            mobile: "",
            password: ""
        });
    }

    const submitForm = (e) => {
        e.preventDefault();

        registerUser(user)
            .then((response) => {
                toast.success("User Registration Successful..");
            })
            .catch((error) => {
                toast.error("User Registration Not Successful...");
            });
    }

    return (
        <div className='container mt-4 p-2 w-50 bg-success rounded text-light'>

            <form onSubmit={(e) => submitForm(e)}>

                <div className="form-group">
                    <label htmlFor="name">Name : </label>
                    <input type="text" className="form-control" name="name" id="name" aria-describedby='name' placeholder='Enter Name'
                        onChange={(e) => handleChange(e, "name")}
                        value={user.name}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile : </label>
                    <input type="number" className="form-control" name="mobile" id="mobile" aria-describedby='mobile' placeholder='Enter Mobile'
                        onChange={(e) => handleChange(e, "mobile")}
                        value={user.mobile}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password : </label>
                    <input type="password" className="form-control" name="password" id="password" aria-describedby='password' placeholder='Enter Password'
                        onChange={(e) => handleChange(e, "password")}
                        value={user.password}
                    />
                </div>

                <div className="row mt-4">
                    <div className="col text-center">
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </div>

                    <div className="col text-center">
                        <button type="reset" className="btn btn-danger" onClick={resetForm}>Reset</button>
                    </div>

                </div>

                <div className="row m-2 text-center">
                    <p>Already Have an Account ?? <span className='text-warning'><Link to={"/login"} style={{ textDecoration: "none" }}>Login</Link></span></p>
                </div>



            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
