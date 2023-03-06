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
                bg: "gray.200",
                width: "100vw",
            },
            button: {
                WebkitTapHighlightColor: "transparent",
            },
        }),
    },
    components: { Button, Menu },
});
