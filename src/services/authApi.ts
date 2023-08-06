import { apiClient } from "../api/apiClient";
import { FormData, SigninResponseBody } from "../model/auth";

/** 회원가입 api 요청 함수 */
export const sendSignupFormData = async (formData: FormData): Promise<void> => {
  const response = await apiClient.post("/auth/signup", formData);
  if (response.status !== 201) {
    throw new Error(`회원가입 실패: ${response.status}`);
  }
};

/** 로그인 api 요청 함수 */
export const sendSigninFormData = async (
  formData: FormData
): Promise<SigninResponseBody | void> => {
  const response = await apiClient.post("/auth/signin", formData);
  if (response.status !== 200) {
    throw Error(`로그인 실패: ${response.status}`);
  }
  return response.data;
};
