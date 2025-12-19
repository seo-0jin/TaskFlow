import {
  IssueStatusColor,
  IssueStatusLabel,
  type IssueStatusValue,
} from "../../const/IssueStatus";
import Badge from "./Badge";

type Props = {
  status: IssueStatusValue | IssueStatusValue[];
  maxCount?: number;
};

const StatusBadge = ({ status, maxCount }: Props) => {
  if (!Array.isArray(status)) {
    return (
      <span
        style={{
          color: IssueStatusColor[status],
          fontWeight: 500,
        }}
      >
        {IssueStatusLabel[status]}
      </span>
    );
  }

  // 배열인 경우 > 뱃지
  const visible = maxCount ? status.slice(0, maxCount) : status;

  return (
    <>
      {visible.map((s) => (
        <Badge
          key={s}
          label={IssueStatusLabel[s]}
          color={IssueStatusColor[s]}
        />
      ))}
    </>
  );
};

export default StatusBadge;
