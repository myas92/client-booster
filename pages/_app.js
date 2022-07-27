import { appWithTranslation } from 'next-i18next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';
import Link from 'next/link';

export default appWithTranslation(App);

function App({ Component, pageProps }) {
    const { t } = useTranslation("common");
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const { locale } = router;
    const bootstrapUrl = locale == 'fa' ? "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" :
        "//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
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
            `/${locale}/`];

        const pathWithLang = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(pathWithLang)) {
            setAuthorized(false);
            if (locale != 'fa') {
                if ([`/${locale}/`].includes(pathWithLang)) {
                    router.push(`/${locale}/`);
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
                <title>User Registration and Login Example</title>

                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link rel="stylesheet" href={bootstrapUrl} />
            </Head>
            <div className={`app-container ${user ? 'bg-light' : ''}`} dir={locale == "fa" ? "rtl" : "ltr"}>
                <Link href="/">
                    <button type="button" className="btn btn-primary">{t("home")}</button>
                </Link>
                <Nav />
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>

        </>
    );
}


export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}