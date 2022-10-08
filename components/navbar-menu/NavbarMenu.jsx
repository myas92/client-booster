import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import { useTranslation } from 'next-i18next';
import { Accordion, Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
// import styles from './NavbarMenu.module.css'

const navbarItems = [
    {
        id: "1",
        name: "markets",
        url: "/",
        items: [
            {
                id: "1",
                name: "bitcoin",
                url: "/"
            },
            {
                id: "2",
                name: "ethereum",
                url: "/"
            },
            {
                id: "3",
                name: "tether",
                url: "/"
            },
            {
                id: "4",
                name: "shiba",
                url: "/"
            },
            {
                id: "5",
                name: "all_coins",
                url: "/"
            }
        ]
    },
    {
        id: "2",
        name: "trades",
        url: "/",
        items: [
            {
                id: "7",
                name: "professional",
                url: "/"
            },
            {
                id: "8",
                name: "classic",
                url: "/"
            }
        ]
    },
    {
        id: "3",
        name: "user_guide",
        url: "/"
    },
    {
        id: "4",
        name: "wage",
        url: "/wage"
    },
    {
        id: "5",
        name: "blog",
        url: "/blog"
    }
];
export { NavbarMenu };

function NavbarMenu() {
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
        <>
            {/* <Navbar className={styles.bbg} expand="lg" > */}
            {/* <Navbar className="bbg" expand="lg" > */}
            <Navbar variant="mycss text-body" expand="lg" >
                <Navbar.Brand href="/" className="d-none d-lg-block">
                    <img
                        src="/favicon.ico"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt=""
                    />

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className=''>
                    <Nav className="text-body">
                        {
                            navbarItems.map(navbarItem => {
                                let currentItem = []
                                if (navbarItem.items) {
                                    const dropdowns = navbarItem.items.map(
                                        dropdownItem => {
                                            return <NavDropdown.Item key={dropdownItem.id} href={dropdownItem.url}>{t(dropdownItem.name)}</NavDropdown.Item>
                                        }
                                    )
                                    const parentNavDropdown = <NavDropdown key={20} title={t(navbarItem.name)} id="basic-nav-dropdown">
                                        <div className='bbg'>
                                            {dropdowns}

                                        </div>
                                    </NavDropdown>
                                    currentItem.push(parentNavDropdown)
                                }
                                else {
                                    currentItem.push(<Nav.Link key={navbarItem.id} href={navbarItem.url}>{t(navbarItem.name)}</Nav.Link>);
                                }
                                return [...currentItem]
                            })
                        }
                    </Nav>

                </Navbar.Collapse>

                <Nav className='d-flex authentication flex-row justify-content-around'>
                    <Nav.Link href="#deets"> ورود</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes" className='bg-warning'>
                        ثبت نام
                    </Nav.Link>
                </Nav>

            </Navbar>
        </>
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

