import CreateEventForm from "../components/forms/CreateEventForm";
import EditEventForm from "../components/forms/EditEventForm";
import AuthLayout from "../Layouts/AuthLayout";
import GuestLayout from "../Layouts/GuestLayout";
import SharedLayout from "../Layouts/SharedLayout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import EventDetails from "../pages/events/EventDetails";
import ExploreEvents from "../pages/events/ExploreEvents";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/protected/dashboard/Dashboard";

export const routes = [
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <SharedLayout />,
    children: [
      {
        path: "/events",
        element: <ExploreEvents />,
      },
      {
        path: "/events/:eventId",
        element: <EventDetails />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/events/create",
        element: <CreateEventForm />,
      },
      {
        path: "/events/:eventId/edit",
        element: <EditEventForm />,
      },
    ],
  },
];
