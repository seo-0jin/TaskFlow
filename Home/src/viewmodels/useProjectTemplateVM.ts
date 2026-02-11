import { useState } from 'react';
import { useTemplatePopupVM, type TemplatePopupViewModel } from './useTemplatePopupVM';
import type { ProjectTemplateDto } from '../data/response/ProjectTemplateDto';

export interface ProjectTemplateState {
    loading: boolean;
}

export interface ProjectTemplateViewModel {
    state: ProjectTemplateState;

    popupVM: TemplatePopupViewModel;

    loadProjectTemplate: () => Promise<void>;
    openCreateTemplatePopup: () => void;
}

export const useProjectTemplateVM = (): ProjectTemplateViewModel => {
    const [state, setState] = useState<ProjectTemplateState>({ loading: false });

    const popupVM = useTemplatePopupVM();

    const openCreateTemplatePopup = () => {
        popupVM.openCreate();
    };

    const openEditTemplatePopup = (row: ProjectTemplateDto) => {
        popupVM.openEdit({
            templateId: row.templateId,
            templateName: row.templateName,
            description: row.description,
            issueStatuses: row.issueStatuses,
            projectRoles: row.projectRoles,
            updatedAt: row.updatedAt
        });
    };

    const loadProjectTemplate = async () => {

    }

    return {
        state,
        popupVM,
        loadProjectTemplate,
        openCreateTemplatePopup
    }
}