import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const all_monetization_types = "flatrate|free|ads|rent|buy";

const getFromTmdb = async (requestString: string) => {
    return await axios.get(requestString).then((res) => res.data.results);
};

export default async function listSeries(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { listingParam, language, region, page } = req.query;
    listingParam = listingParam as string;

    const types: Record<string, string> = {
        "popular-region": `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=${language}&watch_region=${region}&page=${page}&with_watch_monetization_types=${all_monetization_types}`,
        "popular-world": `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`,
        "top-rated": `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`,
        "on-air": `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`,
    };

    if (!(listingParam in types))
        res.status(404).send("Invalid listing parameter");

    try {
        res.status(200).json(await getFromTmdb(types[listingParam]));
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}
