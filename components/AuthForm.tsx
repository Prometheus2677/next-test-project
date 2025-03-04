"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
}

interface AuthFormInputs {
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe?: boolean;
}

export default function AuthForm({ type }: AuthFormProps) {
  const { register, handleSubmit, watch } = useForm<AuthFormInputs>();
  const { handleAuth, error } = useAuth();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data: AuthFormInputs) => {
    if (type === "register" && data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const success = await handleAuth(type, data);
    if (success) router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center md:h-screen">
      <div className="w-full sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
          <h1 className="text-4xl text-white">{type === "login" ? "Sign in" : "Register"}</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                className="bg-gray-50 rounded-lg block w-full p-2.5"
                {...register("email")}
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="bg-gray-50 rounded-lg block w-full p-2.5"
                {...register("password")}
                required
              />
            </div>

            {type === "register" && (
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-gray-50 rounded-lg block w-full p-2.5"
                  {...register("confirmPassword")}
                  required
                />
              </div>
            )}

            {type === "login" && (
              <div className="flex items-center justify-center">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-white">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full text-white bg-green-500 rounded-lg text-sm px-5 py-2.5"
            >
              {type === "login" ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
