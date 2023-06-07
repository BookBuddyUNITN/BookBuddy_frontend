import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectLibLriById, fetchLibri, selectLibriStatus, leaveReview } from "../redux/features/libriSlice";

import ReactStars from "react-rating-stars-component";

function rating(recensioni: any[]) {
    if (!recensioni.length) return <p>No reviews</p>;
    let stars = [];
    let rating = 0;
    for (let i = 0; i < recensioni.length; i++) {
        rating += recensioni[i].voto;
    }
    rating /= recensioni.length;
    rating = rating;
    return Math.round(rating * 10) / 10;
}

export default function Libro() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const status = useSelector(selectLibriStatus);
    const libro = useSelector((state) => selectLibLriById(state as any, id as string));

    const [recensione, setRecensione] = React.useState<{
        rating: number,
        commento: string
    }>({
        rating: 0,
        commento: ""
    });

    if (libro !== undefined || status === "succeded") {
        const stars = rating(libro.recensioni) as number;
        return (
            <>
                <div className="flex flex-col h-[90%] border-2 border-black m-[10px] p-3">
                    <div className="flex h-[400px] flex-row m-3 justify-evenly">
                        <div className="flex-1">
                            <img className="w-[100%] h-[100%] object-contain" src={"https://covers.openlibrary.org/b/isbn/" + libro.ISBN + "-M.jpg"} alt="book cover" />
                        </div>
                        <div className="flex-1 ml-4">
                            <h1 className="font-bold text-[2rem]">{libro.titolo}</h1>
                            <p>{libro.autore}</p>
                            <div className="flex flex-row items-center">
                                <p className="mr-1">{stars}</p>
                                <ReactStars
                                    count={Math.round(stars)}
                                    size={18}
                                    color="#ffd700"
                                    edit={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[100%] mt-[30px] mb-[30px]"></div>
                    <div className="flex flex-row">
                        <div className="border-2 border-black rounded-md p-4 flex flex-col overflow-hidden w-[100%]">
                            <div>
                                <h1 className="font-bold text-[2rem]">Reviews</h1>
                                <div className="w-[100%]">
                                    <form className="flex flex-col flex-1">
                                        <div className="flex flex-row">
                                            <input
                                                value={recensione.commento}
                                                placeholder="Leave a review"
                                                onChange={(e) => setRecensione({ ...recensione, commento: e.target.value })}
                                                className="border-2 border-black rounded-md p-1 flex-1 mr-1" type="text" />
                                            <ReactStars
                                                count={5}
                                                size={18}
                                                activeColor="#ffd700"
                                                onChange={(e: any) => setRecensione({ ...recensione, rating: e })}
                                            />
                                        </div>
                                        <button className="border-2 border-black rounded-md p-1 mt-1" onClick={(e) => {
                                            e.preventDefault();
                                            setRecensione({ rating: 0, commento: "" });
                                            dispatch<any>(leaveReview({
                                                isbn: libro.ISBN,
                                                testo: recensione.commento,
                                                voto: recensione.rating
                                            }));
                                        }}>Send</button>
                                    </form>
                                </div>
                            </div>
                            <div className="flex-1 overflow-scroll">
                                {libro.recensioni.map((recensione: any, index: number) => {
                                    return (<div key={index} className="flex flex-col border-2 border-black rounded-md p-1 mt-1">
                                        <div className="flex flex-row items-center">
                                            <h1 className="font-bold text-[1.1rem] mr-2">{recensione.username}</h1>
                                            <ReactStars
                                                count={recensione.voto - recensione.voto % 1}
                                                size={18}
                                                color="#ffd700"
                                            />
                                        </div>
                                        <p>{recensione.testo}</p>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (status === "idle") dispatch<any>(fetchLibri());
    else if (status === "loading") return <h1>Loading...</h1>;
    else if (status === "failed") return <h1>Error</h1>;

    return <h1>Error</h1>


}