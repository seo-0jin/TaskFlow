import { useState } from "react";
import { signUpService } from "../service/SignUpService";
import type { SignUpRequest } from "../data/request/SignUpRequest";
import axios, { AxiosError } from "axios";
import type { ApiResponse } from "../data/response/common/ApiResponse";

export const useSignUpViewModel = () => {
    const [state, setState] = useState({
        loginId: "",
        password: "",
        name: "",
        email: "",
        phone: "",
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

    const setEmail = (value: string) => {
        setState(prev => ({ ...prev, email: value }));
    };

    const setPhone = (value: string) => {
        setState(prev => ({ ...prev, phone: value }));
    };

    const submit = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const payload: SignUpRequest = {
            loginId: state.loginId,
            password: state.password,
            name: state.name,
            email: state.email,
            phone: state.phone,
        }

        try {
            await signUpService.signUp(payload);

            setState(prev => ({ ...prev, loading: false }));
            return true;
        } catch (e: any) {
            let errorMessage = "회원가입 중 오류가 발생했습니다.";

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
            return false;
        }
    };

    return {
        state,
        setLoginId,
        setPassword,
        setName,
        setEmail,
        setPhone,
        submit
    };
};
