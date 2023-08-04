import { useContext, useState } from "react";
import { validateEmail, validatePassword } from "../utils/authUtils";
import { sendSigninFormData } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return;
    }
    const formData = { email: email, password: password };
    sendSigninFormData(formData).then((res) => {
      if (res) {
        const accessToken = res.access_token;
        localStorage.setItem("accessToken", accessToken);
        setAccessToken(accessToken);
        navigate("/todo");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-300">
      <div className="bg-white px-8 py-6 rounded-sm min-w-[18rem]">
        <h1 className="mb-8 text-center text-xl font-bold">로그인</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 px-2 py-1 mb-2 rounded-sm text-sm focus:outline-sky-300"
            type="email"
            data-testid="email-input"
            placeholder="이메일"
            onChange={handleEmailChange}
            value={email}
            required
          />
          <input
            className="border border-gray-300 px-2 py-1 mb-4 rounded-sm text-sm focus:outline-sky-300"
            type="password"
            data-testid="password-input"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
            value={password}
            required
          />
          <button
            className={`px-2 py-1 border bg-sky-600 text-white rounded-sm hover:opacity-50 hover:cursor-pointer ${
              isValidEmail && isValidPassword ? "" : "opacity-50"
            }`}
            data-testid="signup-button"
            type="submit"
            disabled={!isValidEmail || !isValidPassword}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
