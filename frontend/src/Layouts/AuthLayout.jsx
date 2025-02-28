import { Navigate, Outlet, useLocation } from "react-router";

import { useAuth } from "../hooks/auth";
import AuthNavbar from "../components/Navbar/AuthNavbar";

const AuthLayout = () => {
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
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <AuthNavbar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
