"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        email: data.email,
        password: data.password,
      });

      if (res.status === 200) {
        router.push("/login");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Registration failed");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Register
        </button>
      </form>
    </>
  );
}
