import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
    return (
        <>
            <p>Página Inicial</p>
        </>
    );
}

export async function getStaticProps({ locale, locales }: any) {
    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ["common"],
                null,
                locales
            )),
        },
    };
}
