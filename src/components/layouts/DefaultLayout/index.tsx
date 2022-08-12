import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Header';
import { LayoutContainer } from './styles';

const DefaultLayout: React.FC = () => (
  <LayoutContainer>
    <Header />
    <Outlet />
  </LayoutContainer>
);

export default DefaultLayout;
