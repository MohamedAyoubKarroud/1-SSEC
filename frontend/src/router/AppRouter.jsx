import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import Landing from '../pages/Landing.jsx';
import Login from '../pages/Login.jsx';
import DashboardDirection from '../pages/DashboardDirection.jsx';
import DashboardEmploye from '../pages/DashboardEmploye.jsx';
import DashboardAdmin from '../pages/DashboardAdmin.jsx';
import NotFound from '../pages/NotFound.jsx';

const HOME_BY_ROLE = {
  direction: '/direction',
  employe: '/employe',
  admin_it: '/admin',
};

function Home() {
  const { role } = useAuth();
  if (role) return <Navigate to={HOME_BY_ROLE[role] ?? '/login'} replace />;
  return <Landing />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute roles={['direction']} />}>
        <Route path="/direction/*" element={<DashboardDirection />} />
      </Route>

      <Route element={<ProtectedRoute roles={['employe']} />}>
        <Route path="/employe/*" element={<DashboardEmploye />} />
      </Route>

      <Route element={<ProtectedRoute roles={['admin_it']} />}>
        <Route path="/admin/*" element={<DashboardAdmin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
