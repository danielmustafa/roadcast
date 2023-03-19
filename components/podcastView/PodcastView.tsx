import { getPodcastGenres } from "@/providers/podcasts/PodcastsProvider";
import { useEffect, useState } from "react";
import NumberedInstruction from "../mapView/NumberedInstruction";
import GenreList, { Genre } from "./genreList/GenreList";

export default function PodcastView() {
    let [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        getPodcastGenres()
            .then(genres => setGenres(genres))
            .catch(console.error)
    }, [])

    return (
        <div className="block">
            <NumberedInstruction
                number={2}
                text="Pick Some Podcast Topics" />
            <GenreList genres={genres} />
        </div>)

}