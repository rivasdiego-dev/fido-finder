import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AppLayout from '../views/layouts/AppLayout';
import AuthLayout from '../views/layouts/AuthLayout';
import Login from '../views/pages/Login';
import VerifyToken from '../views/pages/VerifyToken';
import AuthGuard from '../components/guards/AuthGuard';
import User from '../views/pages/User';
import Home from '../views/pages/Home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div> const error = useRouteError(); Error </div>}>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="auth/verify" element={<VerifyToken />} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/pet-map" element={<>Map of lost pets</>} />
          <Route path="/search" element={<>Search a lost pet</>} />
          <Route path="/new-post" element={<>Post a new lost pet </>} />
          <Route path="/profile" element={<User />} />
        </Route>
      </Route>
    </Route>
    // </Route>
  )
);
