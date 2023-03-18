import { getPodcastGenres } from "@/providers/podcasts/PodcastsProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    getPodcastGenres()
        .then(genres => res.status(200).json(genres))
        .catch(err => console.error(err))
}