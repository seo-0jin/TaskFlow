import type { IssueStatusDef, IssueTypeDef, PriorityDef, RoleDef } from '../../../const/ItemContent';
import type { PermissionMap } from './PermissionCode';

export type TemplateConfig = {
  issueStatuses: IssueStatusDef[];
  issueTypes: IssueTypeDef[];
  priorities: PriorityDef[];
  roles: RoleDef[];
  permissions: PermissionMap;
};
