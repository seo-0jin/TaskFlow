import { useEffect, useState } from "react";
import { SummaryType, type SummaryValue } from "../const/SummaryType";
import { IssueStatus, type IssueStatusValue } from "../const/IssueStatus";
import { PriorityType, type PriorityValue } from "../const/PriorityType";
import { RoutePath } from "../const/RoutePath";
import { useNavigate } from "react-router-dom";

// -------------------- Summary --------------------
export interface DashboardSummary {
    dueTodayCount: number;        // 오늘 마감
    inProgressCount: number;      // 진행 중
    unassignedCount: number;      // 미지정
    doneLast7DaysCount: number;   // 최근 7일 완료
}

// -------------------- Charts --------------------
export interface IssueStatusChartItem {
    status: IssueStatusValue
    label: string;   // 화면 표시용
    count: number;
}

export interface ProjectProgress {
    completed: number; // 완료 %
    onHold: number; // 보류%
    remaining: number; // 잔여 %
}

// -------------------- Recent Issues --------------------
export interface RecentIssue {
    issueId: string;
    title: string;
    projectName: string;
    status: IssueStatusValue
    priority: PriorityValue
    updatedAt: string;
}

// -------------------- Dashboard State --------------------
export interface DashBoardState {
    loading: boolean;

    summary: DashboardSummary;

    issueStatusChart: IssueStatusChartItem[];
    projectProgress: ProjectProgress;

    recentIssues: RecentIssue[];
}

export interface DashBoardViewModel {
    state: DashBoardState;

    loadDashboard: () => Promise<void>;

    onClickSummary: (
        type: SummaryValue
    ) => void;

    onClickIssue: (issueId: string) => void;
}


export const useDashBoardViewModel = (): DashBoardViewModel => {
    const [state, setState] = useState<DashBoardState>({
        loading: true,

        summary: {
            dueTodayCount: 0,
            inProgressCount: 0,
            unassignedCount: 0,
            doneLast7DaysCount: 0,
        },

        issueStatusChart: [],
        projectProgress: {
            completed: 0,
            onHold: 0,
            remaining: 100,
        },

        recentIssues: [],
    });

    const navigate = useNavigate();

    // -------------------- Load --------------------
    const loadDashboard = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        // 지금은 dummy, 나중에 API로 교체 > api 각각 나누고 메소드도 나눠야할 듯
        setTimeout(() => {
            setState({
                loading: false,

                summary: {
                    dueTodayCount: 4,
                    inProgressCount: 12,
                    unassignedCount: 3,
                    doneLast7DaysCount: 18,
                },

                issueStatusChart: [
                    { status: "TODO", label: "할 일", count: 8 },
                    { status: "IN_PROGRESS", label: "진행 중", count: 12 },
                    { status: "ON_HOLD", label: "보류", count: 12 },
                    { status: "DONE", label: "완료", count: 20 },
                    { status: "OVERDUE", label: "지연", count: 3 },
                ],

                projectProgress: {
                    completed: 70,
                    onHold: 10,
                    remaining: 20,
                },

                recentIssues: [
                    {
                        issueId: "TASK-1023",
                        title: "로그인 오류 수정",
                        projectName: "TaskFlow",
                        status: IssueStatus.IN_PROGRESS,
                        priority: PriorityType.HIGH,
                        updatedAt: "2025-01-15T10:30:00Z",
                    },
                    {
                        issueId: "ISSUE-1024",
                        title: "로그인 토큰 만료 오류 수정",
                        projectName: "TaskFlow",
                        status: IssueStatus.IN_PROGRESS,
                        priority: PriorityType.HIGH,
                        updatedAt: "2025-01-18T09:32:00Z",
                    },
                    {
                        issueId: "ISSUE-1023",
                        title: "대시보드 차트 렌더링 개선",
                        projectName: "ProjectPulse",
                        status: IssueStatus.TODO,
                        priority: PriorityType.MEDIUM,
                        updatedAt: "2025-01-18T08:15:00Z",
                    },
                    {
                        issueId: "ISSUE-1022",
                        title: "이슈 목록 페이징 처리",
                        projectName: "TaskFlow",
                        status: IssueStatus.DONE,
                        priority: PriorityType.HIGH,
                        updatedAt: "2025-01-17T17:40:00Z",
                    },
                    {
                        issueId: "ISSUE-1021",
                        title: "권한별 메뉴 노출 제어",
                        projectName: "ECS",
                        status: IssueStatus.OVERDUE,
                        priority: PriorityType.LOW,
                        updatedAt: "2025-01-17T16:10:00Z",
                    },
                ],
            });
        }, 500);
    };

    // -------------------- Actions --------------------
    // 이슈 현황 클릭
    const onClickSummary = (type: SummaryValue) => {
        switch (type) {
            case SummaryType.DUE_TODAY:
                navigate(`${RoutePath.ISSUES}?filter=dueToday`);
                break;

            case SummaryType.IN_PROGRESS:
                navigate(`${RoutePath.ISSUES}?status=IN_PROGRESS`);
                break;

            case SummaryType.UNASSIGNED:
                navigate(`${RoutePath.ISSUES}?assignee=none`);
                break;

            case SummaryType.DONE_7D:
                navigate(`${RoutePath.ISSUES}?done=7d`);
                break;

            default:
                navigate(RoutePath.ISSUES);
        }
    };

    // 테이블에서 이슈 클릭
    const onClickIssue = (issueId: string) => {
        console.log("navigate to issue:", issueId);
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    return {
        state,
        loadDashboard,
        onClickSummary,
        onClickIssue,
    };
};