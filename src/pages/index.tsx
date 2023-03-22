import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";

import { Series, SeriesSwiper } from "@/components/SeriesSwiper";

interface i18nProps {
    locales: string[];
    locale: string;
}

interface HomeProps {
    popularSeries: Series[];
    topRatedSeries: Series[];
    onAirSeries: Series[];
}

export default function Home({
    popularSeries,
    topRatedSeries,
    onAirSeries,
}: HomeProps) {
    const { t } = useTranslation();

    return (
        <>
            <SeriesSwiper title={t("popular_series")} series={popularSeries} />
            <SeriesSwiper
                title={t("top_rated_series")}
                series={topRatedSeries}
            />
            <SeriesSwiper title={t("on_air_series")} series={onAirSeries} />
        </>
    );
}

export async function getStaticProps({ locale, locales }: i18nProps) {
    const popularSeriesRes = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=${locale}&page=1`
    );
    const topRatedSeriesRes = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=${locale}&page=1`
    );
    const orAirSeriesRes = await axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=${locale}&page=1`
    );

    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ["common"],
                null,
                locales
            )),
            popularSeries: popularSeriesRes.data.results,
            topRatedSeries: topRatedSeriesRes.data.results,
            onAirSeries: orAirSeriesRes.data.results,
        },
    };
}
