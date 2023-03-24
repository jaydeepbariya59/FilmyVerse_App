import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import { getAllMovies } from '../services/movie-service';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';

const Cards = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 2000);

        getAllMovies()
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error fetching data of movies");
            });

    }, []);

    return (
        <div className='container p-2 d-flex justify-content-between flex-wrap text-center'>
            {
                loading
                    ?
                    <ClipLoader
                        size={150}
                        className="mx-auto mt-4"
                        color='blue'
                    />

                    :

                    data.map((m, i) => {
                        return (
                            <div key={i} className="card shadow p-1 mb-3 bg-body-tertiary rounded" style={{width : "18rem"}}>
                                <img src={m.poster} className="card-img-top pe-auto" alt="..." width={100} height={300} />
                                <div className="card-body">
                                    <h5 className="card-title">{m.title}</h5>
                                </div>

                                <ul className="list-group">
                                    <li className="list-group-item">Title :  {m.title}</li>
                                    <li className="list-group-item d-flex flex-row"> <span>Rating : 
                                        <ReactStars 
                                            value={m.rating}
                                            half={true}
                                            edit={false}
                                            size={20}
                                        />
                                        </span>
                                    </li>

                                    <li className="list-group-item">Year : {m.year}</li>
                                </ul>

                                <div className="card-body">
                                    <a className="btn btn-primary" onClick={()=> navigate("/movie-detail/"+(m.id))}>More Info</a>
                                </div>
                            </div>
                        )
                    })
            }

            <ToastContainer />
        </div>
    )
}

export default Cards
