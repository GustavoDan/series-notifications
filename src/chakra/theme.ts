import { extendTheme } from "@chakra-ui/react";

import { Button } from "./button";
import { Menu } from "./menu";

export const theme = extendTheme({
    colors: {
        customgreen: {
            100: "#03A062",
            200: "#008529",
            300: "#1CA152",
            400: "#25D069",
        },
        darkred: {
            100: "#5B0505",
            200: "#4A0303",
            300: "#470303",
        },
    },
    styles: {
        global: () => ({
            body: {
                "--swiper-navigation-color": "gray.300",
                bg: "gray.800",
                color: "gray.100",
                maxW: "100vw",
            },
            main: {
                flexGrow: 1,
                padding: 4,
            },
            button: {
                WebkitTapHighlightColor: "transparent",
            },
            ".swiper": {
                maxW: "100%",
                userSelect: "none",
                zIndex: 0,
            },
            ".swiper-slide": {
                width: "100%",
                textAlign: "center",
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            },
        }),
    },
    components: { Button, Menu },
});
