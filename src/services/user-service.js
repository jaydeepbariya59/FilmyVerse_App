import axios from 'axios';

export const registerUser = (userData) =>{

    return axios.post("http://localhost:8000/users", userData).then((response) => response.data);

}

export const getAllUsers = () =>{
    return axios.get("http://localhost:8000/users").then((response) => response.data);
}