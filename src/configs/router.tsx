import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AuthGuard from '../components/guards/AuthGuard';
import AddPetLoader from '../lib/loaders/AddPetLoader';
import AppLayout from '../views/layouts/AppLayout';
import AuthLayout from '../views/layouts/AuthLayout';
import AddPet from '../views/pages/AddPet';
import Home from '../views/pages/Home';
import Login from '../views/pages/Login';
import User from '../views/pages/User';
import VerifyToken from '../views/pages/VerifyToken';

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
          <Route
            path="/profile/add-pet"
            element={<AddPet />}
            loader={AddPetLoader}
          />
        </Route>
      </Route>
    </Route>
  )
);
