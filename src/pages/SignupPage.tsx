import { useState } from "react";
import { validateEmail, validatePassword } from "../utils/authUtils";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword) {
      return;
    }
    const formData = { email: email, password: password };
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="bg-white px-8 py-6 rounded-sm min-w-[18rem]">
        <h1 className="mb-8 text-center text-xl font-bold">회원가입</h1>

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
            className="border border-gray-300 px-2 py-1 mb-2 rounded-sm text-sm focus:outline-sky-300"
            type="password"
            data-testid="password-input"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
            value={password}
            required
          />
          <p className="text-xs text-end mb-4 text-gray-400">
            *비밀번호는 8글자 이상으로 입력해주세요
          </p>

          <button
            className={`px-2 py-1 border bg-sky-600 text-white rounded-sm hover:opacity-50 hover:cursor-pointer ${
              isValidEmail && isValidPassword ? "" : "opacity-50"
            }`}
            data-testid="signin-button"
            type="submit"
            disabled={!isValidEmail || !isValidPassword}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
