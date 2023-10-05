import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import LoginContext from '../context/LoginContext';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const NavigationComponent = () => {
    const { isLoggedIn, setIsLoggedIn, userName, setBgColor } = useContext(LoginContext);

    const navigate = useNavigate(); 
    const pages = [{ navItem: 'Login', navLink: '/login' }];
    const settings = ['Profile', 'Project', 'Logout'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const path = isLoggedIn ? `/${userName}` : '/';
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

    const handleUserClickMenu = (menu) => {
        const routePath = menu.toLowerCase(); 
        if (routePath === 'logout') {
            setIsLoggedIn(false);
            navigate("/");
        } else {
            navigate(`/${userName}/${routePath}`);
        }
    };

    const handleButtonClick = () => {
        navigate(path); 
    }

    const changeBackgroundColor = () => {
        console.log("Button clicked!");
        setBgColor("white");
    }

    return (
        <>

                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button onClick={handleButtonClick}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                {isLoggedIn ? userName : 'Divdev'}
                            </Typography>
                        </Button>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >

                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',

                                }}
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
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Devhyun
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                            {isLoggedIn &&
                            <Button onClick={changeBackgroundColor}>
                                <WbSunnyIcon/>
                            </Button>}

                            <Box sx={{ flexGrow: 0 }}>
                                {isLoggedIn ?
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ marginTop: '5%' }}>
                                            <Avatar alt={`${userName}`} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip> :
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, display: 'block' }}
                                    >
                                        <Link style={{ textDecoration: 'none', color: '#F0F0F0' }} to={`${pages[0].navLink}`}>{pages[0].navItem}</Link>
                                    </Button>
                                }
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Button onClick={() => handleUserClickMenu(setting)}>
                                                <Typography textAlign="center" >{setting}</Typography>
                                            </Button>
                                        </MenuItem>
                                    ))}
                                </Menu>

                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
        </>
    )
}

export default NavigationComponent; 