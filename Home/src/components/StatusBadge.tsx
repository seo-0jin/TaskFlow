import {
  IssueStatusColor,
  IssueStatusLabel,
  type IssueStatusValue,
} from "../const/IssueStatus";

type Props = {
  status: IssueStatusValue;
};

const StatusBadge = ({ status }: Props) => {
  // 이슈 상태에 따라 color 및 한글 매핑핑핑
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
};

export default StatusBadge;
