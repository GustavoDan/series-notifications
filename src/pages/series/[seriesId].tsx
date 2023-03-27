import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";

import { i18nProps } from "@/types";

interface Company {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}

interface Series {
    adult: boolean;
    backdrop_path: string;
    created_by: {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string;
    };
    episode_run_time: number[];
    first_air_date: string;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        production_code: string;
        runtime: number;
        season_number: number;
        show_id: number;
        still_path: string;
    };
    name: string;
    next_episode_to_air: undefined;
    networks: Company[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Company[];
    production_countries: { iso_3166_1: string; name: string }[];
    seasons: Season[];
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export default function SeriesPage() {
    const { i18n } = useTranslation();

    const router = useRouter();
    const seriesId = router.query.seriesId;
    const language = i18n.language;

    const [seriesData, setSeriesData] = useState<Series>();

    useEffect(() => {
        const getSeriesData = async () => {
            setSeriesData(
                (
                    await axios.get(
                        `/api/get/series/${seriesId}?language=${language}`
                    )
                ).data
            );
        };

        seriesId && language && getSeriesData().catch(console.error);
    }, []);

    useEffect(() => {
        console.log(seriesData);
    }, [seriesData]);
    return <>{seriesData?.name}</>;
}

export async function getStaticProps({ locale, locales }: i18nProps) {
    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ["common"],
                null,
                locales
            )),
        },
    };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};
