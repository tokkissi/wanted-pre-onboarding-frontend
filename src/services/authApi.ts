import { apiClient } from "../api/apiClient";

interface formData {
  email: string;
  password: string;
}

export interface signinResponseBody {
  access_token: string;
}

/** 회원가입 api 요청 함수 */
export const sendSignupFormData = async (formData: formData): Promise<void> => {
  try {
    const response = await apiClient.post("/auth/signup", formData);
    if (response.status === 201) {
      console.log("회원가입 성공");
    }
  } catch (error) {
    console.log(`회원가입 실패: ${error}`);
  }
};

/** 로그인 api 요청 함수 */
export const sendSigninFormData = async (
  formData: formData
): Promise<signinResponseBody | void> => {
  try {
    const response = await apiClient.post("/auth/signin", formData);
    if (response.status === 200) {
      console.log("로그인 성공");
      return response.data;
    }
  } catch (error) {
    console.log(`로그인 실패: ${error}`);
  }
};
