import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export function UserMenu() {
    const { t } = useTranslation();

    return (
        <Menu variant="darkgray">
            <MenuButton
                as={Button}
                variant="usermenu"
                rightIcon={<ChevronDownIcon />}
            >
                {t("user_menu_header")}
            </MenuButton>

            <MenuList>
                <MenuItem>{t("sign_in")}</MenuItem>
                <MenuItem>{t("sign_up")}</MenuItem>
            </MenuList>
        </Menu>
    );
}
