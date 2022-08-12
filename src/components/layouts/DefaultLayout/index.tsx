import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Header';

// import { Container } from './styles';

const DefaultLayout: React.FC = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export default DefaultLayout;
