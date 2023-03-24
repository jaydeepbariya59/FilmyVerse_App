import React, { useContext, useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { getReviewsByMovieId, sendReview } from '../services/review-service';
import { AppState } from '../App';
import { getCurrentUserInfo } from '../services/helper-service';
import {toast, ToastContainer} from 'react-toastify';

const Reviews = (props) => {

    const useAppState = useContext(AppState);

    const [review, setReview] = useState({
        desc: "",
        rating: "",
        name: useAppState.username,
        movieId: props.id
    });

    useAppState.setUsername(getCurrentUserInfo()?.name);

    const [prevReviews, setPrevReviews] = useState([]);

    useEffect(() => {

        getReviewsByMovieId(props.id)
            .then((response) => {
                console.log(response);
                setPrevReviews(response);
            })
            .catch((error) => {
                console.log(error);
                toast("Error in fetching reviews");
            });
    }, []);

    const handleChange = (e, field) => {

        if (field === "desc") {
            setReview({ ...review, [field]: e.target.value });
        }
        else {
            review.rating = e;
        }

        console.log(review);

    }

    const submitReview = (e) => {
        e.preventDefault();

        sendReview(review)
            .then((response) => {
                console.log(response);

                getReviewsByMovieId(props.id)
                    .then((response) => {
                        console.log(response);
                        setPrevReviews(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Error in fetching reviews");
                    });

                toast.success("Review Submitted");
                return;
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error in submitting the review");
                return;
            });
    }

    return (
        <div className='m-2'>
            <h3 className="display-5 text-center">Reviews</h3>

            <div className="card p-1 bg-secondary">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control mt-4" id="desc" aria-describedby='desc'
                            placeholder='Enter your thoughts'
                            onChange={(e) => handleChange(e, "desc")}
                        />
                    </div>

                    <div className="form-group">
                        <ReactStars
                            size={30}
                            onChange={(e) => handleChange(e, "rating")} />
                    </div>

                    {
                        (useAppState.login == false) ?
                            <div className='text-danger bg-dark p-2 rounded text-center fw-bold'>Login First To Add Your Review...</div>
                            :
                            <button type="submit" className='btn btn-success mt-4' onClick={(e) => submitReview(e)}>Submit</button>
                    }
                </form>

                {
                    prevReviews.map((p, i) => {
                        return (
                            <div className="bg-dark mt-3 p-2">
                                <span className="text-left text-warning">Review By : {p.name}</span>

                                <ReactStars
                                    size={20}
                                    value={p.rating}
                                />

                                <p className="w-100 bg-light text-dark">{p.desc}</p>
                            </div>
                        )
                    })
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Reviews
