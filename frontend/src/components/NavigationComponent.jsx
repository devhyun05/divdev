import React, { useState, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
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
import { Link } from 'react-router-dom'; 
import LoginContext from '../context/LoginContext'; 

const NavigationComponent = () => {
    const { isLoggedIn, userName, setUserName  } = useContext(LoginContext); 
    const pages = [{navItem: 'About', navLink: '/about'}, {navItem: 'Login', navLink: '/login'}];
    const settings = ['Profile', 'Dashboard', 'Settings', 'Logout'];
    const [anchorElNav, setAnchorElNav] = useState(null); 
    const [anchorElUser, setAnchorElUser] = useState(null); 

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
        console.log(menu);
    };
    return (
        <>
            <AppBar position="static" style={{backgroundColor: '#121212'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            >
                                Divdev               
                            </Typography>
                            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
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
                                        display: { xs: 'block', md: 'none'},
                                    }}
                                    >
                                       
                                </Menu>
                            </Box>
                            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                            <Typography 
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'flex', md: 'none'},
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
                                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end'}}>
                                    {pages.map((page, index) => (
                                        <Button 
                                            key={index}
                                            onClick={handleCloseNavMenu}
                                            sx={{my: 2, display: 'block'}}
                                        >
                                            {isLoggedIn && page.navItem === 'Login' ? '' : 
                                                <Link style={{textDecoration: 'none', color:'#F0F0F0'}} to={`${page.navLink}`}>{page.navItem}</Link>
                                            }   
                                        </Button>
                                    ))}
                                    <Box sx={{flexGrow: 0}}>
                                        {isLoggedIn ? 
                                        <Tooltip title="Open settings">
                                            <IconButton onClick={handleOpenUserMenu} sx={{marginTop:'5%'}}>
                                                <Avatar alt={`${userName.charAt(0)}`} src="/static/images/avatar/2.jpg"/>
                                            </IconButton>
                                        </Tooltip> : ''}

                                        <Menu 
                                            sx={{ mt: '45px'}}
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
                                                {settings.map((setting)=> (
                                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                        <Typography onClick={handleUserClickMenu(setting)} textAlign="center">{setting}</Typography>
                                                    </MenuItem>
                                                ))}                                                
                                        </Menu>

                                    </Box>
                                </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default NavigationComponent; 