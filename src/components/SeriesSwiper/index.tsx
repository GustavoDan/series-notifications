import { Flex, Heading } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Keyboard, Mousewheel, Navigation } from "swiper";

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
    series: Series[];
}

export function SeriesSwiper({ series, title }: SeriesSwiperProps) {
    return (
        <Flex flexDirection="column" gap={3}>
            <Heading>{title}</Heading>

            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                navigation
                mousewheel
                freeMode
                grabCursor
                //keyboard
                //onReachEnd={handleLoadMore}
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
        </Flex>
    );
}
