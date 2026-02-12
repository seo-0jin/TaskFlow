import type { RoleDef } from './ItemContent';

export const ProjectRole = {
  OWNER: "OWNER",
  PM: "PM",
  DEV: "DEV",
  QA: "QA",
  MEMBER: "MEMBER",
} as const;

export const ProjectRoleLabel = {
  OWNER: "관리자",
  PM: "PM",
  DEV: "개발자",
  QA: "QA",
  MEMBER: "일반 멤버",
} as const;

export const ProjectRoleColor = {
  OWNER: "#7C3AED",
  PM: "#2563EB",
  DEV: "#16A34A",
  QA: "#EA580C",
  MEMBER: "#64748B",
} as const;

export const buildDefaultProjectRoles = (): RoleDef[] => {
  const base = [
    { code: ProjectRole.OWNER, name: ProjectRoleLabel.OWNER, color: '#7C3AED' },
    { code: ProjectRole.PM, name: ProjectRoleLabel.PM, color: '#2563EB' },
    { code: ProjectRole.DEV, name: ProjectRoleLabel.DEV, color: '#16A34A' },
    { code: ProjectRole.QA, name: ProjectRoleLabel.QA, color: '#EA580C' },
    { code: ProjectRole.MEMBER, name: ProjectRoleLabel.MEMBER, color: '#64748B' },
  ];
  return base.map((x, idx) => ({
    code: x.code,
    name: x.name,
    color: x.color,
    order: idx + 1,
  }));
};

export type ProjectRoleValue = keyof typeof ProjectRoleLabel;
