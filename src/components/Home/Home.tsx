import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {fetchShows} from "../../features/showsSlice.ts";

const Home = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { items: shows, loading } = useSelector((state: RootState) => state.shows);

    const findSeries = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search.trim()) return;

        dispatch(fetchShows(search)).then((res: any) => {
            if (res.payload && res.payload[0]) {
                navigate(`/show/${res.payload[0].id}`);
            }
        });
    }

    return (
        <div className="container m-2">
            <h1>Find series</h1>
            <form onSubmit={findSeries} className="position-relative m-2 d-flex">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary ms-2">
                    Search
                </button>
            </form>

            {loading && (
                <div className="d-flex justify-content-center my-4">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <div className="row mt-4">
                {shows.map(show => (
                    <div key={show.id} className="col-md-4 mb-3">
                        <div className="card h-100">
                            {show.image && <img src={show.image} className="card-img-top" alt={show.name} />}
                            <div className="card-body">
                                <h5 className="card-title">{show.name}</h5>
                                <p className="card-text" dangerouslySetInnerHTML={{ __html: show.summary }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
