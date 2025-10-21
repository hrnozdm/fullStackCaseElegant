import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface UserInfo {
  id: string;
  email: string;
  role: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: UserInfo | null;
  userToken: string | null;
  setUser: (user: UserInfo | null) => void;
  setUserToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_info");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUserToken(token);
      } catch (error) {
        console.error("User info parse error:", error);
        localStorage.removeItem("user_info");
        localStorage.removeItem("auth_token");
      }
    }
  }, []);

  const handleSetUserToken = (token: string | null) => {
    setUserToken(token);
    if (token) {
      localStorage.setItem("auth_token", token);
    } else {
      localStorage.removeItem("auth_token");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    setUser(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        setUser,
        setUserToken: handleSetUserToken,
        logout,
        isAuthenticated: !!user && !!userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
