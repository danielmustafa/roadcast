import { getPodcastGenres } from "@/providers/podcasts/PodcastsProvider";
import { useEffect, useState } from "react";
import GenreList, { Genre } from "./genreList/GenreList";

export default function PodcastView() {
    let [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        getPodcastGenres()
            .then(genres => setGenres(genres))
            .catch(console.error)
    }, [])

    return (

        <div className="container">
            <GenreList genres={genres} />
        </div>

    )

}