"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        if (res.data) setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
        router.push("/login");
      }
    };

    checkAuth();
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
