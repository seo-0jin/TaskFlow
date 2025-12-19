import styles from "@/scss/project_templates.module.scss";
import Button from "../../components/common/Button";
import TableComp, { type TableColumn } from "../../components/table/TableComp";
import StatusBadge from "../../components/badge/StatusBadge";
import type { ProjectTemplateDto } from "../../data/response/ProjectTemplateDto";
import RoleBadge from "../../components/badge/RoleBadge";
import Pagination, { type PageInfo } from "../../components/table/Pagination";
import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { ProjectTemplate } from "../../const/table/ProjectTemplate";

const ProjectTemplates = () => {
  // 테이블에 들어갈 columns
  const projectTemplateColumns: TableColumn<ProjectTemplateDto>[] = [
    {
      key: "templateName",
      title: ProjectTemplate.TEMPLATE_NAME,
      width: "25%",
    },
    {
      key: "projectDescription",
      title: ProjectTemplate.DESCRIPTION,
      width: "25%",
    },
    {
      key: "issueStatuses",
      title: ProjectTemplate.STATUS,
      width: "20%",
      render: (row) => <StatusBadge status={row.issueStatuses} maxCount={3} />,
    },
    {
      key: "projectRoles",
      title: ProjectTemplate.ROLES,
      width: "20%",
      render: (row) => <RoleBadge role={row.projectRoles} maxCount={3} />,
    },
    {
      key: "lastUpdate",
      title: ProjectTemplate.LAST_UPDATE,
      width: "10%",
      render: (row) => new Date(row.updatedAt).toLocaleDateString("ko-KR"),
    },
  ];

  // 임시 더미 데이터
  const projectTemplateDummyData: ProjectTemplateDto[] = [
    {
      templateId: "12314213",
      templateName: "개발 기본 템플릿",
      projectDescription: "웹 개발팀 표준 이슈/권한 구조",
      issueStatuses: ["TODO", "IN_PROGRESS", "DONE"],
      projectRoles: ["OWNER", "PM", "DEV", "QA"],
      updatedAt: "2025-01-10T09:30:00Z",
    },
    {
      templateId: "1231421233",
      templateName: "기본 템플릿",
      projectDescription: "웹 개발팀 표준 이슈/권한 구조",
      issueStatuses: ["TODO", "IN_PROGRESS", "DONE", "OVERDUE"],
      projectRoles: ["OWNER", "PM", "DEV", "QA"],
      updatedAt: "2025-01-12T09:30:00Z",
    },
  ];

  // pagination
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    size: 10,
    totalElements: 1,
    totalPages: 1,
  });

  const handleChangePage = (page: number) => {
    setPageInfo((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleChangeSize = (size: number) => {
    setPageInfo((prev) => ({
      ...prev,
      size,
      page: 1, // 페이지 사이즈 바꾸면 보통 1페이지로
    }));
  };

  const totalElements = projectTemplateDummyData.length;

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      totalElements,
      totalPages: Math.ceil(totalElements / prev.size),
    }));
  }, [totalElements]);

  const pagedData = usePagination(projectTemplateDummyData, pageInfo);

  return (
    <div className={styles.project_templates}>
      <div className={styles.top_content}>
        <Button
          text="템플릿 추가"
          // onClick={handleAddPopup}
        />
      </div>

      <div className={styles.content_area}>
        {/* 테이블 */}
        <div className={styles.table_area}>
          <TableComp
            columns={projectTemplateColumns}
            data={pagedData}
            rowKey={(row) => row.templateId}
          />
        </div>

        {/* Pagination */}
        <div className={styles.pagination_area}>
          <Pagination
            pageInfo={pageInfo}
            onChangePage={handleChangePage}
            onChangeSize={handleChangeSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplates;
