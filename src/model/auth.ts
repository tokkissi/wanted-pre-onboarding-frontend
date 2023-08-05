export interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (newAccessToken: string | null) => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface FormData {
  email: string;
  password: string;
}

export interface SigninResponseBody {
  access_token: string;
}
