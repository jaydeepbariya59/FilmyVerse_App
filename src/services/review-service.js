import axios from 'axios';

export const sendReview = (review) =>{
    return axios.post("http://localhost:8000/reviews", review).then((response)=> response.data);
}

export const getReviewsByMovieId = (movieId) =>{
    return axios.get("http://localhost:8000/reviews?movieId="+movieId).then((response) => response.data);
}