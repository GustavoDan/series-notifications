import {
    Menu,
    MenuButton,
    Text,
    MenuList,
    MenuItem,
    MenuButtonProps,
    MenuItemOption,
    MenuOptionGroup,
    Flex,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export function LanguageMenu(props: MenuButtonProps) {
    const { t } = useTranslation();
    const { locale, locales, ...router } = useRouter();

    const onToggleLanguageClick = async (newLocale: string) => {
        const { pathname, asPath, query } = router;
        await router.push({ pathname, query }, asPath, { locale: newLocale });
        router.reload();
    };

    return (
        <Menu variant="darkgray">
            <MenuButton as={Text} textTransform="uppercase" {...props}>
                {locale?.split("-")[0]}
            </MenuButton>

            <MenuList>
                <MenuOptionGroup defaultValue={locale} type="radio">
                    {locales?.map((language) => {
                        return (
                            <MenuItemOption
                                justifyContent="center"
                                value={language}
                                key={language}
                                onClick={() => onToggleLanguageClick(language)}
                            >
                                {t("language_name", { lng: language })}
                            </MenuItemOption>
                        );
                    })}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
}
