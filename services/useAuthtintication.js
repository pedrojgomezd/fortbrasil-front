import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { clientHttp } from "./clientHttp";

const authContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = (email, password) =>
    clientHttp.get("../sanctum/csrf-cookie").then(() =>
      clientHttp
        .post("/login", { email, password })
        .then((data) => {
          fetchUser();
          router.push("/establishments");
          return data;
        })
        .catch((error) => console.log(error))
    );

  const logout = () =>
    clientHttp.post("/logout").then((data) => {
      setUser(false);
      return data;
    });

  const fetchUser = async () => {
    try {
      const { data, status } = await clientHttp.get("/user");

      if (status !== 200) {
        await clientHttp.get("../sanctum/csrf-cookie");
        setUser(false);
        return;
      }
      setUser(data);
      setLoading(false);
    } catch (error) {
      setUser(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const redirectHome = () => {
      if (["/login", "/register"].includes(router.pathname) && user) {
        router.push("establishments");
      }
    };

    redirectHome();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    login,
    logout,
    loading,
    fetchUser,
  };
}
