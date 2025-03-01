import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import axios from "../lib/axios";
import { createContext, useContext } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const getUser = async () => {
    try {
      const res = await axios.get("/api/user");
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  // Fetch the user data with React Query
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false, // Disable automatic retries
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });

  // Get CSRF token
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  // Register function using React Query logic
  const register = async ({ setErrors, ...props }) => {
    await csrf();
    setErrors([]);

    try {
      await axios.post("/register", props);
      // invalidate the 'user' query to refetch its data
      queryClient.invalidateQueries("user");
      toast.success("Account created successfully!");
      return <Navigate to="/dashboard" replace state={{ from: location }} />;
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
  };

  // Login function
  const login = async ({ setErrors, ...props }) => {
    await csrf();
    setErrors([]);

    try {
      await axios.post("/login", props);
      queryClient.invalidateQueries("user");
      toast.success("Logged in successfully :D");
      return <Navigate to="/dashboard" replace state={{ from: location }} />;
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
  };

  // Forgot Password function
  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    try {
      const response = await axios.post("/forgot-password", { email });
      setStatus(response.data.status);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
  };

  // Reset Password function
  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();
    setErrors([]);
    setStatus(null);

    try {
      const response = await axios.post("/reset-password", {
        token: params.token,
        ...props,
      });
      //nav("/login?reset=" + btoa(response.data.status));
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        throw error;
      }
    }
  };

  // Resend Email Verification function
  const resendEmailVerification = async ({ setStatus }) => {
    const response = await axios.post("/email/verification-notification");
    setStatus(response.data.status);
  };

  // Logout function
  const logout = async () => {
    if (!error) {
      await axios.post("/logout");
      queryClient.invalidateQueries("user");
    }
    window.location.pathname = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
