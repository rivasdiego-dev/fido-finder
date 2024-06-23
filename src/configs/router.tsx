import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AppLayout from "../views/layouts/AppLayout";
import AuthLayout from "../views/layouts/AuthLayout";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route errorElement={<div> const error = useRouteError(); Error </div>}>
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<>Some login</>} />
            <Route path="auth/verify-token" element={<>Verify token</>} />
        </Route>

        <Route element={<AppLayout />}>
            <Route index path="/" element={<>Home Page</>} />
            <Route path="/pet-map" element={<>Map of lost pets</>} />
            <Route path="/search" element={<>Search a lost pet</>} />
            <Route path="/new-post" element={<>Post a new lost pet </>} />
            <Route path="/profile" element={<>User profile</>} />
        </Route>
    </Route>
));

