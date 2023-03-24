import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AppState } from '../App';
import { getCurrentUserInfo, isLoggedIn } from '../services/helper-service';
import { getAllUsers, loginUser } from '../services/user-service';


const Login = () => {

    const useAppState = useContext(AppState);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        name: "",
        password: ""
    });

    const handleChange = (e, field) => {
        setUser({ ...user, [field]: e.target.value });
        console.log(user);
    }

    const resetForm = () => {
        setUser({
            name: "",
            password: ""
        });
    }

    const submitForm = (e) => {

        e.preventDefault();

        getAllUsers()
            .then((response) => {
                setUsers(response);
                console.log("users",users);
            })
            .catch((error) => {
                toast.error("Something went wrong");
            });

        for (let i = 0; i < users.length; i++) {

            if (user.name == users[i].name && user.password == users[i].password) {

                localStorage.setItem('data', JSON.stringify(user));
                toast.success("Login Successful");

                useAppState.setLogin(true);
                useAppState.setUsername(getCurrentUserInfo().name);
                navigate("/");

                break;

            }
            else {
                continue;
            }

        }

        if(useAppState.login==false){
            toast.error("Invalid Credentials");
        }

    }

    return (
        <div className='container mt-4 p-4 w-50 bg-secondary rounded text-light'>
            <form onSubmit={(e) => submitForm(e)}>
                <div className="form-group">
                    <label htmlFor="name">Name : </label>
                    <input type="text" className="form-control" name="name" id="name" aria-describedby='name'
                        placeholder='Enter Name'
                        onChange={(e) => handleChange(e, "name")}
                        value={user.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password : </label>
                    <input type="password" className="form-control" name="password" id="password" aria-describedby='password'
                        placeholder='Enter Password'
                        onChange={(e) => handleChange(e, "password")}
                        value={user.password}
                    />
                </div>

                <div className="row m-2 text-center">
                    <p>Do Not Have An Account ?? <span className="text-warning"><Link to={"/signup"} style={{ textDecoration: "none" }}>Sign Up</Link></span></p>
                </div>

                <div className="row mt-4">
                    <div className="col text-center">
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </div>

                    <div className="col text-center">
                        <button type="reset" className='btn btn-danger' onClick={resetForm}> Reset </button>
                    </div>
                </div>

            </form>
            <ToastContainer />
        </div>
    )
        
}

export default Login
