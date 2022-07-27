import { userService } from 'services';
import { Link } from 'components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export default Dashboard;

function Dashboard() {
    const { t } = useTranslation("common")
    return (
        <div className="p-4">
            <div className="container">
                <h1>{userService.userValue?.firstName}!</h1>
                <p><Link href="/users">{t("manage_users")}</Link></p>
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
