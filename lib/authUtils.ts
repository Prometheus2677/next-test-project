import axios from "axios";

export const checkAuth = async (): Promise<boolean> => {
  try {
    const res = await axios.get("/api/auth/me", { withCredentials: true });
    return !!res.data;
  } catch (error) {
    return false;
  }
};
