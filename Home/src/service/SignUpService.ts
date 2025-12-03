import { ApiPath } from "../const/ApiPath";
import { RoutePath } from "../const/RoutePath";
import type { SignUpRequest } from "../data/request/SignUpRequest";
import type { ApiResponse } from "../data/response/common/ApiResponse";
import http from "../utils/HttpUtil";
import { route } from "../utils/RouteUtil";

class SignUpService {
    async checkLoginId(loginId: string): Promise<boolean> {
        const response = await http.get<ApiResponse<null>>(ApiPath.CHECK_LOGIN_ID, {
            params: { loginId: loginId }
        });

        const body = response.data;

        return body.status === "200";
    }

    async signUp(request: SignUpRequest): Promise<void> {
        const response = await http.post<ApiResponse<null>>(ApiPath.SIGNUP, request);
        const body = response.data;

        if (body.status !== "200") {
            throw new Error(body.message || "회원가입 중 오류가 발생했습니다.");
        }

        route(RoutePath.LOGIN);
    }
}

export const signUpService = new SignUpService();