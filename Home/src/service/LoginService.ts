import { PathConf } from "../const/PathConf";
import type { LoginRequest } from "../data/request/LoginRequest";
import type { ApiResponse } from "../data/response/common/ApiResponse";
import type { LoginResponse } from "../data/response/LoginResponse";
import http from "../utils/HttpUtil";

class LoginService {
    async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await http.post<ApiResponse<LoginResponse>>(PathConf.LOGIN, request);
        const body = response.data;

        if (body.status !== "200" || !body.data) {
            throw new Error(body.message || "로그인에 실패했습니다.");
        }
        
        return body.data;
    }
}

export const loginService = new LoginService();

