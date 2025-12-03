import { ApiPath } from "../const/ApiPath";
import { clearUser } from "../utils/AuthStorage";
import type { LoginRequest } from "../data/request/LoginRequest";
import type { ApiResponse } from "../data/response/common/ApiResponse";
import type { LoginResponse } from "../data/response/LoginResponse";
import http from "../utils/HttpUtil";

class LoginService {
    async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await http.post<ApiResponse<LoginResponse>>(ApiPath.LOGIN, request);
        const body = response.data;

        if (body.status !== "200" || !body.data) {
            throw new Error(body.message || "로그인에 실패했습니다.");
        }

        return body.data;
    }

    async logout(): Promise<void> {
        const response = await http.post<ApiResponse<null>>(ApiPath.LOGOUT, {});

        const body = response.data;

        if (body.status !== "200") {
            throw new Error(body.message || "로그아웃 중 오류가 발생했습니다.");
        }

        clearUser(); // sessiontStorage 비워줌
    }
}

export const loginService = new LoginService();

