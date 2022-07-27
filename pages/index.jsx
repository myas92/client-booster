import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default Home;
function Home() {
    const { t } = useTranslation("common");
    const router = useRouter();
    console.log(router);
    return (

        <div className="p-4">
            <div className="container">
                <h1>{t("hello")}</h1>
            </div>
        </div>
    );
}
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}