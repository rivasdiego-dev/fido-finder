import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route errorElement={<div> const error = useRouteError(); Error </div>}>
        <Route element={<>Some layout <Outlet /></>} >
            <Route path="/login" element={<>Some login</>} />
        </Route>

        <Route element={<>Some layout <Outlet /></>} >
            <Route index path="/" element={<>Home Page</>} />
        </Route>
    </Route>
));

