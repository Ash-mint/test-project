import { Navigate, Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../hooks/auth";

const GuestLayout = () => {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  // Show a loading indicator while checking authentication state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Redirect authenticated users to the dashboard
  if (user) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default GuestLayout;
