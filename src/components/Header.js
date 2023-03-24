import React,{useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import {AppState} from '../App';
import {getCurrentUserInfo, logout} from '../services/helper-service';

const Header = () => {

    const navigate = useNavigate();

    const useAppState = useContext(AppState);

    const logoutUser = ()=>{
        logout();
        toast.success("Logged Out Successfully..");
        useAppState.setLogin(false);
        navigate("/");
    }

  return (
    <nav className='navbar bg-dark text-white border-bottom border-success p-3'>
        <div className='container-fluid'>
            <Link to="/" style={{textDecoration:"none", fontSize:"20px"}}>
                <span className='text-danger fw-bold'>Filmy</span><span className="text-light fw-bold">Verse</span>
            </Link>

            {
                (useAppState.login)
                ?
                <div>
                    <button className="btn btn-outline-warning" onClick={()=> navigate("/add-new-movie")}>Add New Movie</button>
                    <button className="btn btn-outline-danger mx-3" onClick={logoutUser}>Log Out</button>
                </div>
                :
                <button className="btn btn-outline-success" onClick = {()=> navigate("/login")}>Login</button>
            }
        </div>
    </nav>
  )
}

export default Header
