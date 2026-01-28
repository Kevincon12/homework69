import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {fetchShows, fetchShowsById} from "../../features/showsSlice.ts";

const ShowPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { selectedShow: show, loading } = useSelector((state: RootState) => state.shows);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (id) dispatch(fetchShowsById(+id));
    }, [id]);

    const findSeries = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search.trim()) return;

        dispatch(fetchShows(search)).then((res: any) => {
            if (res.payload && res.payload[0]) {
                navigate(`/show/${res.payload[0].id}`);
            }
        });
    };

    if (loading || !show) return <p>Loading...</p>;

    return (
        <div className="container m-2">
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

            <h1>{show.name}</h1>
            {show.image && <img src={show.image} alt={show.name} />}
            <p dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
    );
};

export default ShowPage;
