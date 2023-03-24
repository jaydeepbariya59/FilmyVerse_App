import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import Reviews from '../components/Reviews';
import { getOneMovie } from '../services/movie-service';


const MovieDetail = () => {

    const params = useParams();

    const [movie, setMovie] = useState({
        title: "",
        rating: 0,
        description: "",
        year: "",
        poster: ""
    });

    useEffect(() => {
        getOneMovie(params.id)
            .then((response) => {
                setMovie(response[0]);
                console.log(movie);
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong. Try Again");
            });
    }, []);


    return (
        <div className='row p-2 mt-4 bg-secondary text-light p-4 m-4 rounded-5'>

            <div className="col text-center">
                <img src={movie.poster} className="rounded" alt="movie poster" width={300} height={400} />
            </div>

            <div className="col">
                <h1 className='display-3'>{movie.title} <span className="text-light">({movie.year})</span></h1>

                <p className='text-center text-light mt-4 fs-3'>{movie.description}</p>
                <span>
                    <ReactStars
                        value={movie.rating}
                        half={true}
                        edit={false}
                        size={40}
                    />
                </span>


                <div className="container w-100">
                    <Reviews id={params.id} />
                </div>

            </div>


        </div>
    )
}

export default MovieDetail
