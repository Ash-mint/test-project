import { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import { Link } from "react-router";
import Button from "../../../components/Ui/Button";
import Input from "../../../components/Ui/Input/Input";
import InputError from "../../../components/Ui/Input/InputError";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const { login } = useAuth();
  const [serverErrors, setServerErrors] = useState([]);

  // Validation Schema
  const eventSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
  });

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(eventSchema) });

  const submitForm = (data) => {
    login({
      email: data.email,
      password: data.password,
      remember: data.rememberMe || false,
      setErrors: setServerErrors,
    });
  };

  return (
    <form
      className="w-[90%] md:w-[35%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-3 outline-gray-400 p-12 rounded-xl"
      onSubmit={handleSubmit(submitForm)}
    >
      <h2 className="leading-relaxed font-black text-2xl text-center mb-6">
        Login to your account
      </h2>
      {/* Email Address */}
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="block mt-1 w-full"
          required
          autoFocus
        />
        <InputError
          messages={errors.email?.message || serverErrors?.email}
          className="mt-2"
        />
      </div>

      {/* Password */}
      <div className="mt-4">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className="block mt-1 w-full"
          required
          autoComplete="current-password"
        />
        <InputError messages={errors.password?.message} className="mt-2" />
      </div>

      {/* Remember Me */}
      <div className="block mt-4">
        <label htmlFor="remember_me" className="inline-flex items-center">
          <input
            id="remember_me"
            type="checkbox"
            {...register("rememberMe")}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end mt-4">
        <Link
          to="/forgot-password"
          className="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </Link>
        <Button type="submit" className="ml-3">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
