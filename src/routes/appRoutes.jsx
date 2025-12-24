import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Favorites from "../pages/Favorites";
import ForgetPassword from "../pages/ForgetPassword";
import ProtectedRoute from "./ProtectedRoute";

const appRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/movies",
    element: (
      <ProtectedRoute>
        <Movies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/movies/:id",
    element: (
      <ProtectedRoute>
        <MovieDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/favorites",
    element: (
      <ProtectedRoute>
        <Favorites />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget",
    element: <ForgetPassword />,
  },
  {
    path: "*",
    element: <Login />,
  },
];

export default appRoutes;

