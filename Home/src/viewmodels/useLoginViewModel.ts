import { useState } from "react";
import type { LoginResponse } from "../data/response/LoginResponse";
import type { LoginRequest } from "../data/request/LoginRequest";
import { loginService } from "../service/LoginService";
import { useAuthStore } from "../store/useAuthStore";
import axios, { AxiosError } from "axios";
import type { ApiResponse } from "../data/response/common/ApiResponse";

export interface LoginFormState {
    loginId: string;
    password: string;
    loading: boolean;
    error: string | null;
}

export interface LoginViewModel {
    state: LoginFormState;
    setLoginId: (value: string) => void;
    setPassword: (value: string) => void;
    submit: () => Promise<LoginResponse | null>;
}

export const useLoginViewModel = (): LoginViewModel => {
    const [state, setState] = useState<LoginFormState>({
        loginId: "",
        password: "",
        loading: false,
        error: null,
    });

    const login = useAuthStore((s) => s.login);

    const setLoginId = (value: string) => {
        setState(prev => ({ ...prev, loginId: value }));
    };

    const setPassword = (value: string) => {
        setState(prev => ({ ...prev, password: value }));
    };

    const submit = async (): Promise<LoginResponse | null> => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const payload: LoginRequest = {
            loginId: state.loginId,
            password: state.password,
        };

        try {
            const res = await loginService.login(payload);

            const user: LoginResponse = {
                loginId: res.loginId,
                name: res.name,
                roleCode: res.roleCode,
                phone: res.phone,
                token: res.token,
            };

            // Zustand store에 로그인 저장 (전역 상태 + sessionStorage 저장됨)
            login(user);

            setState(prev => ({ ...prev, loading: false }));
            return user;
        } catch (e: any) {
            let errorMessage = "로그인 중 오류가 발생했습니다.";

            if (axios.isAxiosError(e)) {
                const axiosError = e as AxiosError<ApiResponse<unknown>>;
                const apiResponse = axiosError.response?.data;

                if (apiResponse?.message) {
                    errorMessage = apiResponse.message;
                }
            }
            setState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage,
            }));
            return null;
        }
    };

    return {
        state,
        setLoginId,
        setPassword,
        submit,
    };
}