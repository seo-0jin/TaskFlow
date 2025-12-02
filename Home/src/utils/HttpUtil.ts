import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const http: AxiosInstance = axios.create({
    baseURL: API_BASE_URL, // api prefill
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청/응답 인터셉터 필요하면 여기서 JWT 헤더 붙이거나 에러 처리 가능
http.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = sessionStorage.getItem("taskflow_token");
        if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any).Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

http.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        // 공통 에러 처리 (토큰 만료 등) 넣어도 됨
        return Promise.reject(error);
    },
);

export default http;
