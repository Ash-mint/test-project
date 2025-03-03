import { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import { Link } from "react-router";
import Button from "../../../components/Ui/Button";
import Input from "../../../components/Ui/Input/Input";
import InputError from "../../../components/Ui/Input/InputError";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const { register: registerUser } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });
  const [serverErrors, setServerErrors] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  // Validation Schema
  const registerSchema = z
    .object({
      name: z.string().min(2, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    });

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const submitForm = async (data) => {
    setLoading(true); // Set loading to true when the form starts submitting
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      setErrors: setServerErrors,
    });
    setLoading(false);
  };

  return (
    <form
      className="w-[90%] md:w-[35%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-3 outline-gray-400 p-12 rounded-xl"
      onSubmit={handleSubmit(submitForm)}
    >
      <h2 className="leading-relaxed font-black text-2xl text-center mb-6">
        Create an account
      </h2>

      {/* Name */}
      <div>
        <label htmlFor="name">Username</label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          className="block mt-1 w-full"
          required
        />
        <InputError
          messages={errors.name?.message || serverErrors?.name}
          className="mt-2"
        />
      </div>

      {/* Email */}
      <div className="mt-4">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="block mt-1 w-full"
          required
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
        />
        <InputError messages={errors.password?.message} className="mt-2" />
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <Input
          id="passwordConfirmation"
          type="password"
          {...register("passwordConfirmation")}
          className="block mt-1 w-full"
          required
        />
        <InputError
          messages={errors.passwordConfirmation?.message}
          className="mt-2"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center flex-col-reverse gap-y-3 mt-4">
        <Link
          to="/login"
          className="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Already have an account? Login
        </Link>
        <Button type="submit" className="ml-3" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
      </div>
    </form>
  );
};

export default Register;
