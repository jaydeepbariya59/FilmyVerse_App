import React, { useState, useEffect } from 'react';
import { addMovie, getAllMovies } from '../services/movie-service';
import ReactStars from 'react-stars';
import {toast, ToastContainer} from 'react-toastify';

const NewMovie = () => {

    const [totalCount, setTotalCount] = useState(0);

    const [movie, setMovie] = useState({
        title: "",
        year: "",
        description: "",
        poster: "",
        rating: 0
    });

    const [rating,setRating] = useState(0);

    const handleChange = (event, field) => {
        setMovie({ ...movie, [field]: event.target.value });
    }

    const resetForm = () => {
        setMovie({
            title: "",
            year: "",
            description: "",
            poster: "",
            rating :""
        });
    }

    useEffect(() => {
        getAllMovies()
            .then((response) => {
                setTotalCount(response.data.length);
            })
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        setMovie({...movie, rating : rating});

        addMovie(movie)
            .then((response) => {
                toast.success("Movie Added Successfully");
            })
            .catch((error) => {
                toast.error("Error adding the movie");
            });
    }

    return (
        <div className='container mt-3 p-2 shadow p-3 mb-5 bg-body-tertiary rounded my-4 p-4'>
            <h1 className='display-4 text-center text-success'>Add New Movie</h1>

            <form onSubmit={(e) => submitForm(e)}>
                <div className="form-group m-4">
                    <label htmlFor="title">Title : </label>
                    <input type="text" name="title" id="title" className="form-control" aria-describedby='title' placeholder='Enter Title'
                        value={movie.title}
                        onChange={(e) => handleChange(e, "title")}
                    />
                </div>

                <div className="form-group m-4">
                    <label htmlFor="year">Year : </label>
                    <input type="text" name="year" id="year" className="form-control" aria-describedby='year' placeholder='Enter Year'
                        value={movie.year}
                        onChange={(e) => handleChange(e, "year")}
                    />
                </div>


                <div className="form-group m-4">
                    <label htmlFor="poster">Poster Url: </label>
                    <input type="text" name="poster" id="poster" className="form-control" aria-describedby='poster' placeholder='Enter Poster Url'
                        value={movie.poster}
                        onChange={(e) => handleChange(e, "poster")}
                    />
                </div>


                <div className="form-group m-4">
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" id="description" rows={4} className="form-control" aria-describedby='description' placeholder='Enter Description'
                        value={movie.description}
                        onChange={(e) => handleChange(e, "description")}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating : </label>
                    <ReactStars
                        className='form-control'
                        value={rating}
                        half={true}
                        size={20}
                        onChange={(newRating)=>setRating(newRating)}
                    />

                </div>



                <div className="row mt-4">
                    <div className="col text-center">
                        <button type="submit" className='btn btn-outline-primary'>Submit</button>
                    </div>
                    <div className="col text-center">
                        <button type='reset' className='btn btn-outline-danger' onClick={resetForm}>Reset</button>
                    </div>
                </div>


            </form>

            <ToastContainer />
        </div>
    )
}

export default NewMovie
