"use client"
import { useRouter } from "next/router";
import { useUserAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const { user } = useUserAuth();
  if (!user) {
    router.push('/')
  }
  return children;
};

export default ProtectedRoute;
