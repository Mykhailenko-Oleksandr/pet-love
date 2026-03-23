"use client";

import { getCurrentFullUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentFullUser();
        if (user) {
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
}
