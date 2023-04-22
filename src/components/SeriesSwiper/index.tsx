import { Card, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation } from "swiper";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import axios from "axios";

import { SeriesCard } from "./SeriesCard";

import "swiper/css";
import "swiper/css/navigation";

export interface Series {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

interface SeriesSwiperProps {
    title: string;
}

export function SeriesSwiper({ title }: SeriesSwiperProps) {
    const { i18n, t } = useTranslation("home");

    const [series, setSeries] = useState<Series[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const listingParam = title
        .toLowerCase()
        .split("_")
        .filter((word) => word !== "series")
        .join("-");

    const removeDuplicateSeries = (series: Series[]) => {
        return series.filter(
            (currentSerie, currentIndex, self) =>
                currentIndex === self.findIndex((t) => t.id === currentSerie.id)
        );
    };

    const getSeriesList = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/api/list/series/${listingParam}?language=${
                    i18n.language
                }&region=${t("common:language_region")}&page=${page}`
            );

            setSeries((previousData) =>
                removeDuplicateSeries([...previousData, ...res.data])
            );
            setPage(page + 1);
        } catch (error: any) {
            console.log(`SeriesSwiper.getSeriesList error ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex flexDirection="column" gap={3}>
            <Heading>{t(title)}</Heading>

            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                navigation
                mousewheel
                freeMode
                grabCursor
                onInit={getSeriesList}
                onReachEnd={getSeriesList}
                modules={[Navigation, Mousewheel, FreeMode]}
            >
                {series.map((serie) => {
                    return (
                        <SwiperSlide key={serie.id}>
                            <SeriesCard series={serie} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {(loading || series.length === 0) && (
                <Card
                    bg="gray.700"
                    color="gray.100"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="377px"
                    userSelect="none"
                    onClick={getSeriesList}
                >
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Text whiteSpace="pre-line" textAlign="center">
                            {t("no_series_loaded")}
                        </Text>
                    )}
                </Card>
            )}
        </Flex>
    );
}
