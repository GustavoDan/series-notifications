import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Flex } from "@chakra-ui/react";
import { i18n } from "next-i18next";
import axios from "axios";

import { Series, SeriesSwiper } from "@/components/SeriesSwiper";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface i18nProps {
    locales: string[];
    locale: string;
}

interface HomeProps {
    regionPopularSeriesRes: Series[];
    worldPopularSeriesRes: Series[];
    topRatedSeries: Series[];
    onAirSeries: Series[];
}

export default function Home({
    regionPopularSeriesRes,
    worldPopularSeriesRes,
    topRatedSeries,
    onAirSeries,
}: HomeProps) {
    const { t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        if (regionPopularSeriesRes.length < 1) router.push("/");
    }, []);

    return (
        <Flex flexDirection="column" gap={5}>
            <SeriesSwiper
                title={t("popular_series_region")}
                series={regionPopularSeriesRes}
            />
            <SeriesSwiper
                title={t("popular_series_world")}
                series={worldPopularSeriesRes}
            />
            <SeriesSwiper
                title={t("popular_series_world")}
                series={regionPopularSeriesRes}
            />
            <SeriesSwiper
                title={t("top_rated_series")}
                series={topRatedSeries}
            />
            <SeriesSwiper title={t("on_air_series")} series={onAirSeries} />
        </Flex>
    );
}

export async function getStaticProps({ locale, locales }: i18nProps) {
    const getFromTmdb = async (requestString: string) => {
        return await axios.get(requestString).then((res) => res.data.results);
    };
    const region = i18n?.t("language_region");
    const all_monetization_types = "flatrate|free|ads|rent|buy";

    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ["common"],
                null,
                locales
            )),
            regionPopularSeriesRes: await getFromTmdb(
                `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=${locale}&watch_region=${region}&with_watch_monetization_types=${all_monetization_types}`
            ),
            worldPopularSeriesRes: await getFromTmdb(
                `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=${locale}`
            ),
            topRatedSeries: await getFromTmdb(
                `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=${locale}`
            ),
            onAirSeries: await getFromTmdb(
                `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&language=${locale}`
            ),
        },
    };
}
