import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import AuthGuard from '../components/guards/AuthGuard';
import AddPetLoader from '../lib/loaders/AddPetLoader';
import EditPetLoader from '../lib/loaders/EditPetLoader';
import HomeLoader from '../lib/loaders/HomeLoader';
import LostPetPostLoader from '../lib/loaders/LostPetPostLoader';
import PetLoader from '../lib/loaders/PetLoader';
import SearchLoader from '../lib/loaders/SearchLoader';
import SeenReportsLoader from '../lib/loaders/SeenReportsLoader';
import StatsLoader from '../lib/loaders/StatsLoader';
import AppLayout from '../views/layouts/AppLayout';
import AuthLayout from '../views/layouts/AuthLayout';
import AddPet from '../views/pages/AddPet';
import EditPet from '../views/pages/EditPet';
import EditResidence from '../views/pages/EditResidence';
import EditUser from '../views/pages/EditUser';
import Home from '../views/pages/Home';
import Login from '../views/pages/Login';
import LostPetMap from '../views/pages/LostPetMap';
import LostPetPost from '../views/pages/LostPetPost';
import MyPosts from '../views/pages/MyPosts';
import NewPost from '../views/pages/NewPost';
import Pet from '../views/pages/Pet';
import PetQrScanner from '../views/pages/PetQrScanner';
import PetSeenReports from '../views/pages/PetSeenReports';
import ReportPet from '../views/pages/ReportPet';
import Search from '../views/pages/Search';
import Stats from '../views/pages/Stats';
import User from '../views/pages/User';
import UserProfile from '../views/pages/UserProfile';
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
          <Route index path="/" element={<Home />} loader={HomeLoader} />
          <Route path="/stats" element={<Stats />} loader={StatsLoader} />
          <Route path="/pet-map" element={<LostPetMap />} />
          <Route path="/search" element={<Search />} loader={SearchLoader} />
          <Route path="/search/qr" element={<PetQrScanner />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/pet/:id" element={<Pet />} loader={PetLoader} />
          <Route
            path="/pet/:id/edit"
            element={<EditPet />}
            loader={EditPetLoader}
          />
          <Route path="/profile" element={<User />} />
          <Route
            path="/profile/:id"
            element={<UserProfile />}
          />
          <Route path="/profile/edit" element={<EditUser />} />
          <Route path="/profile/edit/residence" element={<EditResidence />} />
          <Route
            path="/profile/add-pet"
            element={<AddPet />}
            loader={AddPetLoader}
          />
          <Route
            path="/post/:id"
            element={<LostPetPost />}
            loader={LostPetPostLoader}
          />
          <Route path="/post/:id/report" element={<ReportPet />} />
          <Route
            path="/post/:id/seen-reports"
            element={<PetSeenReports />}
            loader={SeenReportsLoader}
          />
          <Route path="/post/own" element={<MyPosts />} />
        </Route>
      </Route>
    </Route>
  )
);
