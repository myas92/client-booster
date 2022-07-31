import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import { useTranslation } from 'next-i18next';
import { Accordion, Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';

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
export { NavBar };

function NavBar() {
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
        <Navbar bg="light" expand="lg" >
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="/favicon.ico"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt=""
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            navbarItems.map(navbarItem => {
                                let currentItem = []
                                if (navbarItem.items) {
                                    const dropdowns = navbarItem.items.map(
                                        dropdownItem => {
                                            return <NavDropdown.Item key={dropdownItem.id} href={dropdownItem.url}>{t(dropdownItem.name)}</NavDropdown.Item>
                                        }
                                    )
                                    const parentNavDropdown = <NavDropdown key={20} title={t(navbarItem.name)} id="basic-nav-dropdown">{dropdowns}</NavDropdown>
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
            </Container>
        </Navbar>
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

