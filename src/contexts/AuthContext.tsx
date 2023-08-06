import React, { useState } from "react";
import { AuthContextType, AuthProviderProps } from "../model/auth";

export const AuthContext = React.createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
