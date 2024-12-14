'use client'
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
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { User } from '@/model/User';
import { useRouter } from 'next/navigation'

const pages = [{name: 'General', link: '/general'}, {name: 'Clientes', link: '/general/clientes'},{name:'Promociones', link: '/general/promociones'}, {name: 'Espacios de estacionamiento', link: '/general/espaciosdeestacionamiento'}];
const settings = ['Cerrar sesión'];

export function ResponsiveAppBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  useEffect(() => {
    // Recuperar datos de Local Storage al montar el componente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Actualizar el estado con los datos
    }
  }, [])

  const handleSettingClick = () =>{
    
    localStorage.removeItem('user');
    router.push('/')

  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{bgcolor: '#000000', height: '100px', display: 'flex',justifyContent: 'center'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href='/general'>
            <Box sx={{ display: { xs: 'none', md: 'flex' },height: '20px', width: '180px', mr: 4 }}>
              <img src="https://www.stopparking.com.pe/wp-content/uploads/2023/08/cropped-cropped-logo_stop.png" alt="logo"
              style={{ width: '100%', height: '100%' }} />
            </Box>
          </Link>
          
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Link key={page.name} href={page.link} style={{ textDecoration: 'none', color: '#000000'}}
                >
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
            
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none'}, mr: 1, width: '100%', justifyContent: 'center'}}>
            <Link href='/general'>
              <img src="https://www.stopparking.com.pe/wp-content/uploads/2023/08/cropped-cropped-logo_stop.png" alt="logo"
              style={{ width: '190px', height: '22px' }} />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.name} href={page.link} style={{ textDecoration: 'none'}}
              >
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: '1rem' }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.nombres || "Usuario no disponible"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{  width: 55, height:55}} alt="Remy Sharp" src="https://icon-library.com/images/generic-user-icon/generic-user-icon-9.jpg" />
              </IconButton>
            </Tooltip>
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
                  <Typography sx={{ textAlign: 'center' }}
                    onClick={() => handleSettingClick()}>
                      {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

