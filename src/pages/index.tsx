import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Flex } from "@chakra-ui/react";

import { SeriesSwiper } from "@/components/SeriesSwiper";
import { i18nProps } from "@/types";

export default function Home() {
    return (
        <Flex flexDirection="column" gap={5}>
            <SeriesSwiper title={"popular_series_region"} />
            <SeriesSwiper title={"popular_series_world"} />
            <SeriesSwiper title={"top_rated_series"} />
            <SeriesSwiper title={"on_air_series"} />
        </Flex>
    );
}

export async function getStaticProps({ locale, locales }: i18nProps) {
    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ["common", "home"],
                null,
                locales
            )),
        },
    };
}
