import React from 'react';
import { Link } from "react-scroll";
import { Link as Links} from  "react-router-dom";

 // SCSS
import './navbar.scss';
// Assets
import LogoImg from '../../assets/navbar/logo.png';
import MobileMenuIcon from '../../assets/navbar/mobile-menu.svg';

const desktopNav = (props) => (
  <nav className={`Navbar ${!props.userIsScrolled ? "extraLargeNavbar" : ""}`}>
    <div className="wrapper flex-s-between">
      <div>
        <Link to="hero" spy={true} smooth={true} offset={0} duration={500}>
          <img src={LogoImg} 
            alt="logo" 
            className="pointer"  
            width="250"
            height="80"/>
        </Link>
      </div>
      <div className="mobile__menu" onClick={props.mobileMenuOpen}>
        <img src={MobileMenuIcon} alt="menu" />
      </div>
      <div className="desktop__menu">
        <ul className="flex-s-between">
          <li>
            <Link activeClass="active-link" to="hero" spy={true} smooth={true} offset={-70} duration={500}>
             HOME
            </Link>
          </li>
          <li>
            <Link activeClass="active-link" to="about" spy={true} smooth={true} offset={-70} duration={500}>
              QUIENES SOMOS
            </Link>
          </li>
          <li>
            <Link activeClass="active-link" to="blog" spy={true} smooth={true} offset={-70} duration={500}>
              PRODUCTOS
            </Link>
          </li>
          <li>
           
          </li>
          <li>
            <Links activeClass="active-link" to="/login" >
              LOGIN
            </Links>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default desktopNav;