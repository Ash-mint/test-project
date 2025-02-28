import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../hooks/auth";
import AuthNavbar from "../components/Navbar/AuthNavbar";

const SharedLayout = () => {
  const { isLoading, user } = useAuth();

  // Show a loading indicator while checking authentication state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {user ? <AuthNavbar /> : <Navbar />}
      <Outlet />
    </>
  );
};

export default SharedLayout;
