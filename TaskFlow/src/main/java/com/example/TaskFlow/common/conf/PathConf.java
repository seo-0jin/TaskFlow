package com.example.TaskFlow.common.conf;

/**
 * Controller Request URL 관련 정의 클래스.
 */
public class PathConf {
    public static final String API = "/api";

    /**
     * Login, SignUp
     */
    public static final String LOGIN = "/login";
    public static final String CHECK_LOGIN_ID = "/check-login-id";
    public static final String LOGOUT = "/logout";
    public static final String SIGNUP = "/signup";

    /**
     * MetaData
     */
    public static final String POSITIONS = "/positions";
    public static final String ROLES = "/roles";

    /**
     * Dashboard
     */
    public static final String DASHBOARD_PROJECT_INFO = "/dashboard-project-info";

    /**
     * System
     */
    public static final String PROJECT_TEMPLATE = "/project-template";
    public static final String TEMPLATE_LIST = "/list"; // 템플릿 목록
    public static final String CREATE_TEMPLATE = "/create"; // 템플릿 생성
    public static final String EDIT_TEMPLATE = "/edit"; // 템플릿 수정
}
