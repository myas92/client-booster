import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import { useTranslation } from 'next-i18next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Fade from '@mui/material/Fade';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export { Nav };

function Nav() {
    const { t } = useTranslation("common");
    const [user, setUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isClickedMarkets, setClickedMarkets] = useState(null);
    const [isClickedTrades, setClickedTrades] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const openMarkets = Boolean(isClickedMarkets);
    const openTrades = Boolean(isClickedTrades);
    const handleClickMarkets = (event) => {
        setClickedMarkets(event.currentTarget);
    };
    const handleClickTrades = (event) => {
        setClickedTrades(event.currentTarget);
    };


    const handleCloseMarkets = () => {
        setClickedMarkets(null);
    };

    const handleCloseTrades = () => {
        setClickedTrades(null);
    };

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            color="red"
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem key={1} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">بازارها</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>

                    <Button
                        color="secondary"
                        id="fade-button"
                        aria-controls={openMarkets ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMarkets ? 'true' : undefined}
                        onClick={handleClickMarkets}
                    >
                        بازار
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={isClickedMarkets}
                        open={openMarkets}
                        onClose={handleCloseMarkets}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleCloseMarkets}>بیتکوین</MenuItem>
                        <MenuItem onClick={handleCloseMarkets}>تتر</MenuItem>
                        <MenuItem onClick={handleCloseMarkets}>اتریوم</MenuItem>
                    </Menu>



                    <Button
                        color="secondary"
                        id="fade-button1"
                        aria-controls={openTrades ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openTrades ? 'true' : undefined}
                        onClick={handleClickTrades}
                    >
                        معامله ها
                    </Button>
                    <Menu
                        id="fade-menu1"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={isClickedTrades}
                        open={openTrades}
                        onClose={handleCloseTrades}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleCloseTrades}>معامله سبک</MenuItem>
                        <MenuItem onClick={handleCloseTrades}>معامله حرفه ای</MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
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

