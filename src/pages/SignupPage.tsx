import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../utils/authUtils";
import { sendSignupFormData } from "../services/authApi";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [isServerError, setIsServerError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isServerError) {
      const timer = setTimeout(() => {
        setIsServerError(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isServerError]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setValidationErrorMessage("이메일에 @를 포함해주세요");
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
      setValidationErrorMessage("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!validatePassword(newPassword)) {
      setValidationErrorMessage("비밀번호는 8글자 이상으로 입력해주세요");
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
      setValidationErrorMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword) {
      return;
    }
    const formData = { email: email, password: password };
    sendSignupFormData(formData)
      .then((res) => {
        setIsServerError(false);
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        setIsServerError(true);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-300">
      <div className="bg-white px-8 py-6 rounded-sm min-w-[18rem]">
        <h1 className="mb-8 text-center text-xl font-bold">회원가입</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 px-2 py-1 mb-2 rounded-sm text-sm focus:outline-sky-300"
            type="email"
            data-testid="email-input"
            placeholder="이메일"
            onChange={handleEmailChange}
            autoComplete="email"
            name="email"
            value={email}
            required
          />
          <input
            className="border border-gray-300 px-2 py-1 mb-2 rounded-sm text-sm focus:outline-sky-300"
            type="password"
            data-testid="password-input"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
            autoComplete="new-password"
            name="password"
            value={password}
            required
          />
          <p className="text-xs text-end mb-4 text-gray-400">
            *비밀번호는 8글자 이상으로 입력해주세요
          </p>
          {validationErrorMessage && (
            <p className="text-xs mb-2 text-red-500 font-bold">
              {validationErrorMessage}
            </p>
          )}
          {isServerError && (
            <p className="text-xs mb-2 text-red-500 font-bold">
              회원가입 중 서버 에러가 발생했습니다
            </p>
          )}
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
