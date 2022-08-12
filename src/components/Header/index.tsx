import React from 'react';
import { Timer, Scroll } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './styles';
import Logo from '../../assets/logo-ignite.svg';
// import { Container } from './styles';

const Header: React.FC = () => (
  <HeaderContainer>
    <img src={Logo} alt="" />
    <nav>
      <NavLink to="/" title="Timer">
        <Timer size={24} />
      </NavLink>
      <NavLink to="/history" title="Histórico">
        <Scroll size={24} />
      </NavLink>
    </nav>
  </HeaderContainer>
);

export default Header;
