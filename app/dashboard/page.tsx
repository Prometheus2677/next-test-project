"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/authUtils";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) router.push("/login");
      setAuthenticated(isAuthenticated);
    };

    fetchAuth();
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get("/api/movies", { withCredentials: true });
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, [authenticated]);

  const handleLogout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setAuthenticated(false);
    router.push("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {authenticated ? <p>Authenticated</p> : <p>Not Authenticated</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
