export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
      <div className="bg-white px-8 py-6 rounded-sm min-w-[18rem]">
        <h1 className="mb-8 text-center text-xl font-bold">회원가입</h1>

        <form action="" className="flex flex-col">
          <input
            className="border border-gray-300 px-2 py-1 mb-2 rounded-sm text-sm focus:outline-sky-300"
            type="email"
            data-testid="email-input"
            placeholder="이메일"
            required
          />
          <input
            className="border border-gray-300 px-2 py-1 mb-4 rounded-sm text-sm focus:outline-sky-300"
            type="password"
            data-testid="password-input"
            placeholder="비밀번호"
            required
          />
          <p className="text-xs text-end mb-4 text-gray-400">
            *비밀번호는 8글자 이상으로 입력해주세요
          </p>
          <button
            className="px-2 py-1 border bg-sky-600 text-white rounded-sm"
            data-testid="signup-button"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
