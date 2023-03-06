import { Text, Flex } from "@chakra-ui/react";
import { LanguageMenu } from "./LanguageMenu";

import { UserMenu } from "./UserMenu";

export function Navbar() {
    return (
        <Flex
            width="100vw"
            alignItems="center"
            justifyContent="space-between"
            bg="black"
            color="customgreen.400"
            p={4}
        >
            <Text fontSize={30} userSelect="none">
                Series Notifications
            </Text>

            <Flex gap={5} alignItems="center">
                <LanguageMenu display={{ base: "none", md: "unset" }} />
                <UserMenu />
            </Flex>
        </Flex>
    );
}
