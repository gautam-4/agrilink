import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-10">
      <nav className="header__nav navigation flex items-center justify-between">
        <div className="header__logo">
          <div id="logo" className="flex justify-center items-center cursor-pointer">
            <img src={logo} alt="" className="w-[180px]" />
          </div>
          <div className="header__logo-overlay"></div>
        </div>
        
        <ul className="header__menu hidden lg:flex">
          <li><a href="">Home</a></li>
          <li><a href="#services">About</a></li>
          <li><a href="#contact">Our Team</a></li>
          <li><button className="btnLogin-popup">Get Started</button></li>
        </ul>
        
        <div className="lg:hidden pr-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-secondary">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li><a href="">Home</a></li>
            <li><a href="#services">About</a></li>
            <li><a href="#contact">Our Team</a></li>
            <li><button className="btnLogin-popup">Login</button></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;