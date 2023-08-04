import React, { useState } from "react";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (newAccessToken: string | null) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

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
