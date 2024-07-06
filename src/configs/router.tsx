import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AuthGuard from '../components/guards/AuthGuard';
import AddPetLoader from '../lib/loaders/AddPetLoader';
import LostPetPostLoader from '../lib/loaders/LostPetPostLoader';
import SeenReportsLoader from '../lib/loaders/SeenReportsLoader';
import StatsLoader from '../lib/loaders/StatsLoader';
import AppLayout from '../views/layouts/AppLayout';
import AuthLayout from '../views/layouts/AuthLayout';
import AddPet from '../views/pages/AddPet';
import Home from '../views/pages/Home';
import Login from '../views/pages/Login';
import LostPetPost from '../views/pages/LostPetPost';
import MyPosts from '../views/pages/MyPosts';
import NewPost from '../views/pages/NewPost';
import PetSeenReports from '../views/pages/PetSeenReports';
import ReportPet from '../views/pages/ReportPet';
import Stats from '../views/pages/Stats';
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
          <Route path="/stats" element={<Stats />}
            loader={StatsLoader}
          />
          <Route path="/pet-map" element={<>Map of lost pets</>} />
          <Route path="/search" element={<>Search a lost pet</>} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/profile" element={<User />} />
          <Route
            path="/profile/add-pet"
            element={<AddPet />}
            loader={AddPetLoader}
          />
          <Route path="/post/:id" element={<LostPetPost />}
            loader={LostPetPostLoader}
          />
          <Route path="/post/:id/report" element={<ReportPet />} />
          <Route path="/post/:id/seen-reports" element={<PetSeenReports />}
            loader={SeenReportsLoader}
          />
          <Route path="/post/own" element={<MyPosts />} />
        </Route>
      </Route>
    </Route>
  )
);
