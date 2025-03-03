"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {token ? <p>Authenticated</p> : <p>Not Authenticated</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
