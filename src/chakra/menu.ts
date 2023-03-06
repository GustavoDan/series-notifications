import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const helpers = createMultiStyleConfigHelpers(["list", "item"]);

export const Menu = helpers.defineMultiStyleConfig({
    baseStyle: {
        item: {
            justifyContent: "center",
        },
    },
    variants: {
        darkgray: {
            list: {
                bg: "gray.600",
                color: "gray.300",
                border: "none",
            },
            item: {
                bg: "gray.600",
                fontWeight: "bold",
                _hover: {
                    bg: "gray.700",
                },
            },
        },
    },
});
