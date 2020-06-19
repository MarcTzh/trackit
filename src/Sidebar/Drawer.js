import React from 'react';
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
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import { MenuList, MenuItem } from '@material-ui/core';
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

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

// import InfoIcon from '@material-ui/icons/Info';
//for menu logo
import Trackit_logo from '../Images/Trackit_logo.png';

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

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          
          {/* <Typography variant="h6" noWrap>
            Trackit
          </Typography> */}
          <img src={Trackit_logo} 
          alt="Trackit_logo"
          height='60' />
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
            <ListItemIcon><HomeIcon /></ListItemIcon>
                Home
            </MenuItem>
            <MenuItem component={Link} to="/profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem component={Link} to="/products">
            <ListItemIcon><PhoneAndroidIcon /></ListItemIcon>
                Products
            </MenuItem>
            <MenuItem component={Link} to="/categories">
            <ListItemIcon><PhoneAndroidTwoToneIcon /></ListItemIcon>
                Categories
            </MenuItem>
            <MenuItem component={Link} to="/addnew">
            <ListItemIcon><AddIcon /></ListItemIcon>
                Add Products
            </MenuItem>
            <MenuItem component={Link} to="/updateProduct">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
                Update Product
            </MenuItem>
            <MenuItem component={Link} to="/settings">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
                Settings
            </MenuItem>
        </MenuList>
        {/* original code */}
          {/* {['Dashboard', 'Notifications', 'Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* <Typography paragraph>
          Blank page
        </Typography> */}
        <Switch>
          <Route exact path="/" component={Home}>
          </Route>
          <Route exact path="/Profile" component={Profile}>
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
        </Switch>
        <AuthOptions />
      </main>
      
    </div>
  );
}
