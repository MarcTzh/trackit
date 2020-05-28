import './index.css';
import React from 'react';
//Routing
import NavMenu from './NavMenu';

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      {/* unsure of this */}
        {/* <Route exact path='/' component={Home} /> */}
      <NavItem icon={<BellIcon />} />
      {/* unsure of this */}
        {/* <Route exact path='/about' component={About} /> */}
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
      {/* <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li> */}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>
          {/* LINK ADDED HERE */}
            <Link to="/profile">My Profile</Link>
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="categories">
            Categories
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Preferences</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Notifications</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Pref 2</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Pref 3</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Pref 4</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'categories'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Categories</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Category 1</DropdownItem>
          <DropdownItem leftIcon="🐸">Category 2</DropdownItem>
          <DropdownItem leftIcon="🦋">Category 3?</DropdownItem>
          <DropdownItem leftIcon="🦔">Category 4</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
