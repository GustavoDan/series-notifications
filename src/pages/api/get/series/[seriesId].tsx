import { getFromTmdb } from "@/components/services/getFromTmdb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function listSeries(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { seriesId, language } = req.query;

    try {
        res.status(200).json(
            await getFromTmdb(
                `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${process.env.TMDB_API_KEY}&language=${language}`
            )
        );
    } catch (error: any) {
        res.status(400).send(error.message);
    }
}
