import logo from '../assets/logo.png'

function Header() {
  return (
    <>
        <header>
        <nav className="header__nav navigation">
          <div className="header__logo">
            <div id="logo"><img src={logo} alt="" /></div>
            <div className="header__logo-overlay"></div>
          </div>
          <ul className="header__menu">
            <li>
              <a href="">Home</a>
            </li>
            <li>
                <a href="#services">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <button className="btnLogin-popup">Login</button>
            </li>
          </ul>
    
        </nav>
      </header>
    </>
  )
}

export default Header