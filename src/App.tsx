import './App.css'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./app/store.ts";
import * as React from "react";

const App = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { items: shows, loading } = useSelector((state: RootState) => state.shows);

    const findSeries = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(search.trim()) {
            console.log(search);
        }
    }

    return (
        <>
            <div className='container m-2'>
                <h1>Find series</h1>

                <form onSubmit={findSeries} className='position-relative m-2 d-flex'>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search...'
                        className='form-control'
                    />
                    <button type="submit" className='btn btn-primary ms-2'>
                        Search
                    </button>
                </form>

                <div className="mt-4">
                    {loading && <p>Loading...</p>}
                    <div className="row">
                        {shows.map(show => (
                            <div key={show.id} className="col-md-4 mb-3">
                                <div className="card h-100">
                                    {show.image && <img src={show.image} className="card-img-top" alt={show.name} />}
                                    <div className="card-body">
                                        <h5 className="card-title">{show.name}</h5>
                                        <p className="card-text">{show.summary}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}

export default App
