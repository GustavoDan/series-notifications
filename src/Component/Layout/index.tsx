import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

import { Navbar } from "../Navbar";

interface LayoutProps {
    children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <Flex direction="column" height="100vh">
            <Navbar />
            <main style={{ flexGrow: 1 }}>{children}</main>
        </Flex>
    );
}
