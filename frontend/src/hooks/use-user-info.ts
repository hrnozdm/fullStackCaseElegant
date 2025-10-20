import { useAuth } from "@/context/auth-context";

export function useUserInfo() {
  const { user: userInfo, logout } = useAuth();


  return { userInfo, logout };
}
