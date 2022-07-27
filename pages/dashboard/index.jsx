import { userService } from 'services';
import { Link } from 'components';
import { useTranslation } from 'next-i18next';
export default Dashboard;

function Dashboard() {
    const { t } = useTranslation("common")
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>You&apos;re logged in with Next.js & JWT!!</p>
                <p><Link href="/users">Manage Users</Link></p>
            </div>
        </div>
    );
}
