export const ProjectTemplate = {
  TEMPLATE_NAME: "템플릿 이름",
  DESCRIPTION: "설명",
  STATUS: "이슈 상태",
  ROLES: "프로젝트 역할",
  LAST_UPDATE: "마지막 수정일",
  UNKNOWN: "",
} as const;

export type ProjectTemplateKey = keyof typeof ProjectTemplate;
export type ProjectTemplateValue = (typeof ProjectTemplate)[ProjectTemplateKey];
