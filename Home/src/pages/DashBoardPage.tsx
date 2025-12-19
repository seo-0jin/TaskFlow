import styles from "@/scss/dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  useDashBoardViewModel,
  type IssueStatusChartItem,
  type ProjectProgress,
  type RecentIssue,
} from "../viewmodels/useDashBoardViewModel";
import TableComp, { type TableColumn } from "../components/table/TableComp";
import { IssueStatusColor, IssueStatusLabel } from "../const/IssueStatus";
import StatusBadge from "../components/StatusBadge";
import { SummaryType } from "../const/SummaryType";
import HorizontalBarChart, {
  type BarDatum,
} from "../components/HorizontalBarChart";

const DashBoardPage = () => {
  useDocumentTitle("대시보드");

  const navigate = useNavigate();

  const {
    state: state,
    loadDashboard: loadDashboard,
    onClickSummary: onClickSummary,
    onClickIssue: onClickIssue,
  } = useDashBoardViewModel();

  const {
    dueTodayCount,
    inProgressCount,
    unassignedCount,
    doneLast7DaysCount,
  } = state.summary;

  const recentIssues: RecentIssue[] = state.recentIssues; // 전체 프로젝트 이슈 현황
  const issueStatusChart: IssueStatusChartItem[] = state.issueStatusChart; // 차트 내 이슈 현황
  const projectProgress: ProjectProgress = state.projectProgress; // 프로젝트 진행률

  // 테이블에 들어갈 columns
  const recentIssueColumns: TableColumn<RecentIssue>[] = [
    {
      key: "title",
      title: "이슈 제목",
      width: "50%",
      render: (row) => (
        <span
          className="ellipsis_data"
          title={row.title}
          style={{ cursor: "pointer", fontWeight: 500 }}
        >
          {row.title}
        </span>
      ),
    },
    {
      key: "projectName",
      title: "프로젝트",
      width: "20%",
    },
    {
      key: "status",
      title: "상태",
      width: "10%",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "updatedAt",
      title: "업데이트",
      width: "20%",
      render: (row) => new Date(row.updatedAt).toLocaleString("ko-KR"),
    },
  ];

  // 차트에 들어갈 issue 현황 매핑
  const toIssueStatusBarData = (items: IssueStatusChartItem[]): BarDatum[] => {
    return items.map((it) => ({
      category: IssueStatusLabel[it.status] ?? it.status,
      value: it.count,
      color: IssueStatusColor[it.status] ?? "#8884d8",
    }));
  };

  // 차트에 들어갈 프로젝트 진행률 매핑
  const toProjectProgressBarData = (p: ProjectProgress): BarDatum[] => [
    { category: "완료", value: p.completed, color: "#51CF66" },
    { category: "보류", value: p.onHold, color: "#ADB5BD" },
    { category: "남음", value: p.remaining, color: "#4DABF7" },
  ];

  return (
    <section className={styles.dashboard}>
      <div className={styles.main_area}>
        {/* 전체 프로젝트 이슈 현황 */}
        <div className={styles.contents_wrap}>
          <div className={styles.issue_status_wrap}>
            <div className={styles.title_wrap}>
              <p className={styles.title}>전체 이슈 현황</p>
              <p className={styles.issue_description}>
                등록된 모든 프로젝트의 이슈를 요약해 보여줍니다.
              </p>
            </div>
            <ul>
              <li
                className={styles.li_item}
                onClick={() => onClickSummary(SummaryType.DUE_TODAY)}
              >
                <div>
                  <h2 className={styles.title}>오늘 마감</h2>
                </div>
                <div className={styles.count}>
                  <span>{dueTodayCount}</span>
                </div>
              </li>
              <li
                className={styles.li_item}
                onClick={() => onClickSummary(SummaryType.IN_PROGRESS)}
              >
                <div>
                  <h2 className={styles.title}>진행 중</h2>
                </div>
                <div className={styles.count}>
                  <span>{inProgressCount}</span>
                </div>
              </li>
              <li
                className={styles.li_item}
                onClick={() => onClickSummary(SummaryType.UNASSIGNED)}
              >
                <div>
                  <h2 className={styles.title}>미지정</h2>
                </div>
                <div className={styles.count}>
                  <span>{unassignedCount}</span>
                </div>
              </li>
              <li
                className={styles.li_item}
                onClick={() => onClickSummary(SummaryType.DONE_7D)}
              >
                <div>
                  <h2 className={styles.title}>최근 7일 완료</h2>
                </div>
                <div className={styles.count}>
                  <span>{doneLast7DaysCount}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 전체 프로젝트 Chart */}
        <div className={styles.chart_wrap}>
          <div className={styles.title_wrap}>
            <h1 className={styles.title}>전체 프로젝트 현황</h1>
          </div>
          <div className={styles.bar_chart_wrap}>
            <div className={styles.bar_chart}>
              <h2 className={styles.title}>이슈 상태 분포</h2>
              <HorizontalBarChart
                data={toIssueStatusBarData(issueStatusChart)}
                showValueLabel
              />
            </div>
            <div className={styles.bar_chart}>
              <h2 className={styles.title}>프로젝트 진행 현황</h2>
              <HorizontalBarChart
                data={toProjectProgressBarData(projectProgress)}
                showValueLabel
              />
            </div>
          </div>
        </div>

        <div className={styles.recent_wrap}>
          <h2 className={styles.title}>최근 업데이트된 이슈 (Top 10)</h2>
          <TableComp
            columns={recentIssueColumns}
            data={recentIssues}
            rowKey={(row) => row.issueId}
          />
        </div>
      </div>
    </section>
  );
};

export default DashBoardPage;
