import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import { useTranslation } from 'next-i18next';

export { Nav };

function Nav() {
    const { t } = useTranslation("common");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">{t("home")}</NavLink>
                <NavLink href="/account/login" exact className="nav-item nav-link">{t("login")}</NavLink>
            </div>
        </nav>
    );
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">{t("home")}</NavLink>
                <NavLink href="/users" className="nav-item nav-link">{t("users")}</NavLink>
                <a onClick={logout} className="nav-item nav-link">{t("logout")}</a>
            </div>
        </nav>
    );
}

