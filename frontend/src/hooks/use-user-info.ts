import { useAuth } from "@/context/auth-context";

export function useUserInfo() {
  const { user: userInfo, logout } = useAuth();

  // Rol kontrolü için yardımcı fonksiyonlar
  const isAdmin = userInfo?.role === "admin";
  const isDoctor = userInfo?.role === "doctor";
  const canManagePatients = isAdmin || isDoctor;

  return {
    userInfo,
    logout,
    isAdmin,
    isDoctor,
    canManagePatients,
  };
}
