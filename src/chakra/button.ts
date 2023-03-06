import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: "20px",
    },
    sizes: {
        sm: {
            fontSize: "8pt",
        },
        md: {
            fontSize: "10pt",
        },
    },
    variants: {
        usermenu: {
            bg: "red.900",
            _hover: {
                bg: "darkred.200",
            },
            _active: {
                bg: "red.800",
            },
            _highlighted: {
                bg: "red.800",
            },
        },
        gray: {
            bg: "gray.500",
        },
    },
};
