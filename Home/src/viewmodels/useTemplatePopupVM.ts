import { useState } from 'react';
import type { TemplatePopupMode } from '../components/popup/TemplatePopup';
import type { ProjectTemplateDto } from '../data/response/ProjectTemplateDto';
import { useItemList, type ItemListViewModel } from '../hooks/useItemList';
import { buildDefaultIssueStatusItems } from '../const/IssueStatus';
import { buildDefaultPriorityItems } from '../const/PriorityType';
import { buildDefaultIssueTypeItems } from '../const/IssueType';

export interface TemplatePopupViewModel {
    open: boolean;
    mode: TemplatePopupMode;
    templateName: string;
    setTemplateName: (v: string) => void;

    openCreate: () => void;
    openEdit: (row: ProjectTemplateDto) => void;

    statusList: ItemListViewModel,
    statusTypeList: ItemListViewModel,
    priorityList: ItemListViewModel,
    close: () => void;
    submit: () => Promise<void>;
}

export const useTemplatePopupVM = (): TemplatePopupViewModel => {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<TemplatePopupMode>('create');

    const [templateName, setTemplateName] = useState('');
    const [templateDescription, setTemplateDescription] = useState('');

    const statusList = useItemList(buildDefaultIssueStatusItems);
    const statusTypeList = useItemList(buildDefaultIssueTypeItems);
    const priorityList = useItemList(buildDefaultPriorityItems);

    const openCreate = () => {
        setMode("create");
        setTemplateName("");
        statusList.reset();
        statusTypeList.reset();
        priorityList.reset();
        setOpen(true);
    };

    const openEdit = () => {
        setOpen(true);
        setMode('edit');
        setTemplateName("");
    };

    const close = () => setOpen(false);

    const submit = async () => {
        setOpen(false);
    };

    return {
        open,
        mode,
        templateName,
        setTemplateName,
        openCreate,
        openEdit,
        statusList,
        statusTypeList,
        priorityList,
        close,
        submit,
    };
};
