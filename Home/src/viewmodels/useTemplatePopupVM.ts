import { useState } from 'react';
import type { TemplatePopupMode } from '../components/popup/TemplatePopup';
import type { ProjectTemplateDto } from '../data/response/ProjectTemplateDto';
import { useItemList, type ItemListViewModel } from '../hooks/useItemList';
import { buildDefaultIssueStatusItems } from '../const/IssueStatus';
import { buildDefaultPriorityItems } from '../const/PriorityType';
import { buildDefaultIssueTypeItems } from '../const/IssueType';
import { buildDefaultProjectRoles } from '../const/ProjectRole';
import type { IssueStatusDef, IssueTypeDef, PriorityDef, RoleDef } from '../const/ItemContent';
import type { TemplateConfig } from '../data/request/template/TemplateConfig';
import { buildDefaultPermissions, type PermissionCode, type PermissionMap } from '../data/request/template/PermissionCode';
import { useAuthStore } from '../store/useAuthStore';

export interface TemplatePopupViewModel {
    open: boolean;
    mode: TemplatePopupMode;

    templateName: string;
    setTemplateName: (v: string) => void;
    templateDescription: string;
    setTemplateDescription: (v: string) => void;

    openCreate: () => void;
    openEdit: (row: ProjectTemplateDto) => void;

    statusList: ItemListViewModel<IssueStatusDef>;
    statusTypeList: ItemListViewModel<IssueTypeDef>;
    priorityList: ItemListViewModel<PriorityDef>;
    projectRoleList: RoleDef[],

    permissions: PermissionMap;
    hasPermission: (permission: PermissionCode, roleCode: string) => boolean;
    togglePermission: (permission: PermissionCode, roleCode: string) => void;

    close: () => void;
    submit: () => Promise<void>;
}

export const useTemplatePopupVM = (): TemplatePopupViewModel => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<TemplatePopupMode>('create');

    const statusList = useItemList(buildDefaultIssueStatusItems);
    const statusTypeList = useItemList(buildDefaultIssueTypeItems);
    const priorityList = useItemList(buildDefaultPriorityItems);
    const projectRoleList = buildDefaultProjectRoles();

    const [templateName, setTemplateName] = useState<string>('');
    const [templateDescription, setTemplateDescription] = useState<string>('');

    const openCreate = () => {
        setMode("create");
        setTemplateName("");
        statusList.reset();
        statusTypeList.reset();
        priorityList.reset();
        resetPermissions();
        setOpen(true);
    };

    const openEdit = () => {
        setOpen(true);
        setMode('edit');
        setTemplateName("");
    };

    const close = () => setOpen(false);

    const [permissions, setPermissions] = useState<PermissionMap>(buildDefaultPermissions);

    const resetPermissions = () => setPermissions(buildDefaultPermissions());

    const hasPermission = (perm: PermissionCode, roleCode: string) => {
        return (permissions[perm] ?? []).includes(roleCode);
    };

    const togglePermission = (perm: PermissionCode, roleCode: string) => {
        setPermissions((prev) => {
            const curr = new Set(prev[perm] ?? []);
            if (curr.has(roleCode)) curr.delete(roleCode);
            else curr.add(roleCode);
            return { ...prev, [perm]: Array.from(curr) };
        });
    };

    const user = useAuthStore((state) => state.user);

    const submit = async () => {
        const configJson: TemplateConfig = {
            issueStatuses: statusList.items,
            issueTypes: statusTypeList.items,
            priorities: priorityList.items,
            roles: projectRoleList,
            permissions,
        };

        const req = {
            createdBy: user?.loginId,
            name: templateName,
            description: templateDescription,
            configJson,
        }

        console.log(req);

        setOpen(false);
    };

    return {
        open,
        mode,
        templateName,
        setTemplateName,
        templateDescription,
        setTemplateDescription,
        openCreate,
        openEdit,
        statusList,
        statusTypeList,
        priorityList,
        projectRoleList,
        permissions,
        hasPermission,
        togglePermission,
        close,
        submit,
    };
};
