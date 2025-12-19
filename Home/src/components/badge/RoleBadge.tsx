import {
  ProjectRoleColor,
  ProjectRoleLabel,
  type ProjectRoleValue,
} from "../../const/ProjectRole";
import Badge from "./Badge";

type Props = {
  role: ProjectRoleValue | ProjectRoleValue[];
  maxCount?: number;
};

const RoleBadge = ({ role, maxCount }: Props) => {
  // ✅ 단일 role → 텍스트 표시
  if (!Array.isArray(role)) {
    return (
      <span
        style={{
          color: ProjectRoleColor[role],
          fontWeight: 500,
        }}
      >
        {ProjectRoleLabel[role]}
      </span>
    );
  }

  // ✅ 배열 role → Badge 표시
  const visible = maxCount ? role.slice(0, maxCount) : role;

  return (
    <>
      {visible.map((r) => (
        <Badge
          key={r}
          label={ProjectRoleLabel[r]}
          color={ProjectRoleColor[r]}
        />
      ))}
    </>
  );
};

export default RoleBadge;
