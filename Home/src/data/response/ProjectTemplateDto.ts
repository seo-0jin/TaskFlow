import type { IssueStatusValue } from "../../const/IssueStatus";
import type { ProjectRoleValue } from "../../const/ProjectRole";

export type ProjectTemplateDto = {
    templateId: string;
    templateName: string;
    projectDescription: string;
    issueStatuses: IssueStatusValue[];  // ["TO_DO", "IN_PROGRESS", ...]
    projectRoles: ProjectRoleValue[];   // ["PM", "DEV", "QA"]
    updatedAt: string;
};