import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Logo from '../../svg/logo-black.svg';

const useStyles = makeStyles(theme => ({
  colorPrimary: {
    backgroundColor: '#FFFFFF',
    color: '#2A2D33',
  },
  colorDark: {
    backgroundColor: '#2A2D33',
    color: '#FFFFFF',
    boxShadow: 'none',
  },
  logoPrimary: {
    fill: '#FFFFFF',
  },
  logoDark: {
    fill: '#2A2D33',
  },
  navItem: {
    fontWeight: 800,
    color: '#2A2D33',
    marginRight: '20px',
  },
  navDark: {
    fontWeight: 800,
    color: '#FFFFFF',
    marginRight: '20px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row'
  },
  logIn: {
    color: '#4BA173',
    borderColor: '#4BA173',
    '&:hover': {
      background: 'rgba(75, 161, 115, 0.1)',
    },
  },
  grow: {
    flexGrow: 1,
    flexBasis: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.55),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '40%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: '#2A2D33',
  },
}));

const PrimarySearchAppBar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const location = useLocation();

  const isMenuOpen = Boolean(anchorEl);
  const { handleLogIn, isLoggedIn, logout } = props;

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link
          to="/my-account"
          style={{ textDecoration: 'none', color: '#2A2D33' }}
        >
          My account
        </Link>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout();
        }}
      >
        Sign Out
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar
        className={
          location.pathname === '/' ? classes.colorDark : classes.colorPrimary
        }
        position="static"
      >
        <Toolbar>
          <div className={classes.grow}>
            <div className={classes.nav}>
              <Link style={{ textDecoration: 'none' }} to="/explore">
                <Typography
                  className={
                    location.pathname === '/'
                      ? classes.navDark
                      : classes.navItem
                  }
                  variant="subtitle1"
                >
                  Explore
                </Typography>
              </Link>
              <Link style={{ textDecoration: 'none' }} to="/create-campaign">
                <Typography
                  className={
                    location.pathname === '/'
                      ? classes.navDark
                      : classes.navItem
                  }
                  variant="subtitle1"
                >
                  Start a Campaign
                </Typography>
              </Link>
            </div>
          </div>

          <div className={classes.grow}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link to="/">
                <Logo
                  className={
                    location.pathname === '/'
                      ? classes.logoPrimary
                      : classes.logoDark
                  }
                />
              </Link>
            </div>
          </div>

          <div className={classes.grow}>
            <div className={classes.sectionDesktop}>
              {isLoggedIn ? (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle
                    className={
                      location.pathname === '/'
                        ? classes.logoPrimary
                        : 'inherit'
                    }
                  />
                </IconButton>
              ) : (
                <Button
                  onClick={handleLogIn}
                  className={classes.logIn}
                  variant="outlined"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default PrimarySearchAppBar;
