import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'styles/globals.scss';
import 'styles/NavbarMenu.scss';
import 'styles/home-styles/mobile-frame.scss'
import { userService } from 'services';
import { NavbarMenu } from 'components/navbar-menu';
import { Alert } from 'components';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Button, SSRProvider, ThemeProvider } from 'react-bootstrap';

export default appWithTranslation(App);
function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const { locale } = router;

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/account/login',
            '/account/register',
            `/${locale}/account/login`,
            `/${locale}/account/register`,
            `/`,
            `/${locale}`];

        const pathWithLang = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(pathWithLang)) {
            setAuthorized(false);
            if (locale != 'fa') {
                if ([`/${locale}`].includes(pathWithLang)) {
                    router.push(`/${locale}`);
                }
                else {
                    router.push(`/${locale}/account/login`);
                }
            }
            else {
                if ([`/`].includes(pathWithLang)) {
                    router.push(`/`);
                }
                else {
                    router.push(`/account/login`);
                }
            }
        } else {
            setAuthorized(true);
        }
    }
    return (
        <>
            <Head>
                <title>Booster</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <SSRProvider>
            <ThemeProvider>
                    <div className={`app-container ${user ? 'bg-light' : ''}`} dir={locale == "fa" ? "rtl" : "ltr"} >
                    <NavbarMenu />
                    <Alert />
                        {authorized && <Component {...pageProps} />}
                    </div>
                </ThemeProvider>
            </SSRProvider>
        </>
    );
}
