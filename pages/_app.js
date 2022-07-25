import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';

export default appWithTranslation(App);

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

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
        const publicPaths = ['/account/login', '/account/register',`/${router.locale}/account/login`, `/${router.locale}/account/register`];
        const pathWithLang = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(pathWithLang)) {
            setAuthorized(false);
            if(router.locale!='fa'){
                router.push( `/${router.locale}/account/login`);

            }
            else{
                router.push( `/account/login`);
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
                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>
        </>
    );
}
