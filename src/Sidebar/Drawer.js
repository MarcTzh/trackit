import React, {useState, useEffect, useContext} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
// import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ListIcon from '@material-ui/icons/List';
// import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import FolderIcon from '@material-ui/icons/Folder';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import UpdateIcon from '@material-ui/icons/Update';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import { MenuList, MenuItem } from '@material-ui/core';
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom";

// import galaxy from '../Images/galaxy.jpg';
// import graybg from '../Images/graybg.jpg';

//Routing
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
import Settings from '../Pages/Settings';
import AddNew from '../Pages/AddNew';
import ProductPage from '../Pages/ProductPage';
import CategoryPage from '../Pages/CategoryPage';
import UpdateProduct from '../Pages/UpdateProduct';
import Register from '../auth/Register';
import AuthOptions from "../auth/AuthOptions";
import Login from '../auth/Login';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import UserContext from "../context/UserContext";
import Admin from '../Pages/Admin';

// import InfoIcon from '@material-ui/icons/Info';
//for menu logo
import Trackit_logo from '../Images/Trackit_logo.png';

import '../style.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // color: "#2e84f8"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // backgroundImage: `url(${graybg})`
    backgroundColor: "#21202a",
    // borderColor: "#2e84f8",
    // borderWidth: 2
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showIconButton, setShowIconButton] = React.useState(false);
  const { userData } = useContext(UserContext);
  const handleDrawerOpen = () => {
    console.log(props)
    if(props.user && (props.user.user !== undefined)) {
      setOpen(true);
    } else {
      return <Redirect to='/login' />
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(props.user && (props.user.user !== undefined)) {
      setShowIconButton(true);
    } else {
      setShowIconButton(false);
    }
  }, [props.user])

  useEffect(() => {

  })

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar id="header">
          {showIconButton
            ? <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            : null }
          <div id='title'>
            <Link to="/">
              <img src={Trackit_logo}
              alt="Trackit_logo"
              height='60'
              style={{marginTop: 10}}/>
            </Link>
          </div>
          <div id='header'>

            <AuthOptions 
            closeDrawer={handleDrawerClose}/>
          </div>
          
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <MenuList>
            <MenuItem component={Link} to="/">
            <ListItemIcon><HomeIcon color="primary"/></ListItemIcon>
                Home
            </MenuItem>
            <MenuItem component={Link} to="/profile">
            <ListItemIcon><PersonIcon color="primary"/></ListItemIcon>
                Charts
            </MenuItem>
            <MenuItem component={Link} to="/products">
            <ListItemIcon><ListIcon color="primary"/></ListItemIcon>
                Products
            </MenuItem>
            <MenuItem component={Link} to="/categories">
            <ListItemIcon><FolderIcon color="primary"/></ListItemIcon>
                Categories
            </MenuItem>
            <MenuItem component={Link} to="/addnew">
            <ListItemIcon><AddIcon color="primary"/></ListItemIcon>
                Add Products
            </MenuItem>
            {/* <MenuItem component={Link} to="/updateProduct">
            <ListItemIcon><UpdateIcon /></ListItemIcon>
                Update Product
            </MenuItem> */}
            <MenuItem component={Link} to="/settings">
            <ListItemIcon><SettingsIcon color="primary"/></ListItemIcon>
                Settings
            </MenuItem>
            {/* <MenuItem component={Link} to="/admin">
            <ListItemIcon><SupervisorAccountIcon color="primary"/></ListItemIcon>
                Admin
            </MenuItem> */}
        </MenuList>

        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/" component={Home}>
          </Route>
          <Route exact path="/Profile" component={Profile}>
          </Route>
          <Route exact path="/Login" component={Login}>
          </Route>
          <Route exact path="/Settings" component={Settings}>
          </Route>
          <Route exact path="/Products" component={ProductPage}>
          </Route>
          <Route exact path="/AddNew" component={AddNew}>
          </Route>
          <Route exact path="/Categories" component={CategoryPage}>
          </Route>
          <Route exact path="/UpdateProduct" component={UpdateProduct}>
          </Route>
          <Route exact path="/Register" component={Register}>
          </Route>
          <Route exact path="/ForgotPassword" component={ForgotPassword}>
          </Route>
          <Route exact path="/ResetPassword" component={ResetPassword}>
          </Route>
          <Route
            path="/ResetPassword/:token"
            component={ResetPassword}
          />
          <Route exact path="/Admin" component={Admin}></Route>
        </Switch>
        
      </main>
      
    </div>
  );
}
