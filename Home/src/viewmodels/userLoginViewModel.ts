import { useState } from "react";
import type { LoginResponse } from "../data/response/LoginResponse";
import type { LoginRequest } from "../data/request/LoginRequest";
import { loginService } from "../service/LoginService";
import { saveUser } from "../utils/AuthStorage";

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
                token: res.token,
            };

            saveUser(user);

            setState(prev => ({ ...prev, loading: false }));
            return user;
        } catch (e: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: e.message || "로그인 중 오류가 발생했습니다.",
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