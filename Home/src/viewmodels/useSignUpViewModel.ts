import { useState } from "react";
import { signUpService } from "../service/SignUpService";
import type { SignUpRequest } from "../data/request/SignUpRequest";

export const useSignUpViewModel = () => {
    const [state, setState] = useState({
        loginId: "",
        password: "",
        name: "",
        phone: "",
        position: "",
        loading: false,
        error: null as string | null,
    });

    const setLoginId = (value: string) => {
        setState(prev => ({ ...prev, loginId: value }));
    };

    const setPassword = (value: string) => {
        setState(prev => ({ ...prev, password: value }));
    };

    const setName = (value: string) => {
        setState(prev => ({ ...prev, name: value }));
    };

    const setPhone = (value: string) => {
        setState(prev => ({ ...prev, phone: value }));
    };

    const setPosition = (value: string) => {
        setState(prev => ({ ...prev, position: value }));
    };

    const submit = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const payload: SignUpRequest = {
            loginId: "",
            password: "",
            name: "",
            phone: "",
            position: ""
        }

        try {
            // 1) 아이디 중복 체크
            const available = await signUpService.checkLoginId(payload.loginId);
            if (!available) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: "이미 사용 중인 아이디입니다.",
                }));
                return null;
            }

            // 2) loginId 사용 가능하면 회원가입 요청
            const res = await signUpService.signUp(payload);

            setState(prev => ({ ...prev, loading: false }));
            return res;
        } catch (e: any) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: e.message || "회원가입 중 오류가 발생했습니다.",
            }));
            return null;
        }
    };

    return {
        state,
        setLoginId,
        setPassword,
        setName,
        setPhone,
        setPosition,
        submit
    };
};
