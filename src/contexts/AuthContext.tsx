import React, { useState } from "react";
import { AuthContextType, AuthProviderProps } from "../model/auth";

export const AuthContext = React.createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
