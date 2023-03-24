import axios from 'axios';

export const getAllMovies = () =>{
    return axios.get("http://localhost:8000/movies").then((response) => response.data);
}

export const getOneMovie = (id)=>{
    return axios.get("http://localhost:8000/movies?id="+id).then((response) => response.data);
}

export const addMovie = (movie) =>{
    return axios.post("http://localhost:8000/movies",movie).then((response) => response.data);
}