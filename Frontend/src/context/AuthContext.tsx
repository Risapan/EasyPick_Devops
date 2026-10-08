import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";

interface User {
  id: number;
  fullname: string;
  name: string;
  email: string;
  role: "customer" | "owner" | "admin";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: "customer" | "owner";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("easypick_token"));
  const [isLoading, setIsLoading] = useState(true);

  // Set default auth header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("easypick_token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("easypick_token");
    }
  }, [token]);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/auth/me`);
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setToken(null);
          setUser(null);
        }
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });

    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
    } else {
      throw new Error(res.data.message || "Login failed.");
    }
  };

  const signup = async (data: SignupData) => {
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      name: data.name.trim(),
      fullname: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      role: data.role,
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Registration failed.");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, signup, logout }}>
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
