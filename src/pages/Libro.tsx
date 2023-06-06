import React from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectLibLriById, fetchLibri, selectLibriStatus, leaveReview } from "../redux/features/libriSlice";

import BackButton from "../components/back_button/BackButton";

function rating(recensioni: any[]) {
    if (!recensioni.length) return <p>No reviews</p>;
    let stars = [];
    let rating = 0;
    for (let i = 0; i < recensioni.length; i++) {
        rating += recensioni[i].rating;
    }
    for (let i = 0; i < rating / recensioni.length; i++) {
        stars.push(<i className="fas fa-star"></i>);
    }
    return stars;
}

export default function Libro() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const status = useSelector(selectLibriStatus);
    const libro = useSelector((state) => selectLibLriById(state as any, id as string));

    const [recensione, setRecensione] = React.useState<string>("");

    if (libro !== undefined || status === "succeded") {
        return (<div className="m-3">
            <div className="w-[100%]">
                <BackButton />
            </div>
            <div className="flex h-[400px] flex-row m-3 justify-evenly">
                <img className="h-[400px]" src={"https://covers.openlibrary.org/b/isbn/" + libro.ISBN + "-M.jpg"} alt="book cover" />
                <div className="flex-grow ml-3">
                    <h1 className="font-bold text-[2rem]">{libro.titolo}</h1>
                    <p>{libro.autore}</p>
                    {rating(libro.recensioni)}
                </div>
            </div>
            <h1 className="font-bold text-[2rem]">Reviews</h1>
            <div className="flex flex-col max-w-[400px]">
                <form className="flex flex-row flex-1">
                    <input
                        value={recensione}
                        placeholder="Leave a review"
                        onChange={(e) => setRecensione(e.target.value)}
                        className="border-2 border-black rounded-md p-1 flex-1 mr-1" type="text" />
                    <button className="border-2 border-black rounded-md p-1" onClick={(e) => {
                        e.preventDefault();
                        dispatch<any>(leaveReview({
                            isbn: libro.ISBN,
                            testo: recensione,
                            voto: 5
                        }));
                    }}>Send</button>
                </form>
                {libro.recensioni.map((recensione: any) => (
                    <div className="flex flex-col border-2 border-black rounded-md p-1 mt-1">
                        <p>{recensione.testo}</p>
                        <p>{recensione.rating}</p>
                    </div>
                ))}
            </div>

        </div>)
    } else if (status === "idle") dispatch<any>(fetchLibri());
    else if (status === "loading") return <h1>Loading...</h1>;
    else if (status === "failed") return <h1>Error</h1>;

    return <h1>Error</h1>


}