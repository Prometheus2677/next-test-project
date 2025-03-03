"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await axios.post("/api/auth/login", data);
      dispatch(setToken(res.data.token));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="border p-2"
        required
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Login
      </button>
    </form>
  );
}
