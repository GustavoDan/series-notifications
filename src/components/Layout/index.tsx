import { ReactNode } from "react";
import { chakra, Flex } from "@chakra-ui/react";

import { Navbar } from "../Navbar";

interface LayoutProps {
    children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <Flex direction="column" height="100vh">
            <Navbar />
            <chakra.main flexGrow={1} padding={4}>
                {children}
            </chakra.main>
        </Flex>
    );
}
