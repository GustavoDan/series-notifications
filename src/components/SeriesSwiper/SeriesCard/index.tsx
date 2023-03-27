import { Card, CardBody, Stack, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

import { Series } from "..";

interface MovieCardProps {
    series: Series;
}

export function SeriesCard({ series }: MovieCardProps) {
    return (
        <Card bg="gray.700" color="gray.100" width="100%">
            <Link href={`/series/${series.id}`}>
                <CardBody
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    whiteSpace="nowrap"
                >
                    <Image
                        src={
                            series.poster_path
                                ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${series.poster_path}`
                                : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
                        }
                        borderRadius="lg"
                        height="250px"
                        width="170px"
                    />
                    <Stack mt="6" spacing="3" maxW="100%">
                        <Heading
                            size="md"
                            overflow="hidden"
                            textOverflow="ellipsis"
                        >
                            {series.name}
                        </Heading>
                        <Text overflow="hidden" textOverflow="ellipsis">
                            {series.original_name}
                        </Text>
                    </Stack>
                </CardBody>
            </Link>
        </Card>
    );
}
