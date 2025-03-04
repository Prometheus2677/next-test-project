"use client";

import { useState } from "react";
import axios from "axios";

interface AuthData {
  email: string;
  password: string;
}

export function useAuth() {
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (type: "login" | "register", data: AuthData) => {
    setError(null);
    try {
      const res = await axios.post(`/api/auth/${type}`, data, { withCredentials: true });
      if (res.status === 200 || res.status === 201) return true;
    } catch (err) {
      setError(
        type === "register" ? "Registration failed. Try a different email." : "Login failed. Check your credentials."
      );
      console.error("Auth error:", err);
      return false;
    }
  };

  return { handleAuth, error };
}
