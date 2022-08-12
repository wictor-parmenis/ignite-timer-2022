import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layouts/DefaultLayout';
import History from '../pages/History';
import Home from '../pages/Home';

const Router: React.FC = () => (
  <Routes>
    <Route path="/" element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Route>
  </Routes>
);

export { Router };
