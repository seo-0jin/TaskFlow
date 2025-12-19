import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

export type BarDatum = {
  category: string; // Y축 라벨
  value: number; // X축 값
  color?: string;
};

type Props = {
  data: BarDatum[];

  height?: number; // 기본 260
  barSize?: number; // 기본 22
  showGrid?: boolean; // 기본 true
  showTooltip?: boolean; // 기본 true
  showXAxis?: boolean; // 기본 true
  showYAxis?: boolean; // 기본 true
  showValueLabel?: boolean; // 막대 끝에 숫자 표시

  // 진행률이면 0~100 고정하고 싶을 때
  xDomain?: [number, number] | ["auto", "auto"];
};

const HorizontalBarChart = ({
  data,
  height = 260,
  barSize = 22,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showValueLabel = false,
  xDomain = [0, 100],
}: Props) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 10 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}

        <XAxis
          type="number"
          domain={xDomain}
          hide={!showXAxis}
        />
        <YAxis type="category" dataKey="category" hide={!showYAxis} />

        {showTooltip && <Tooltip />}

        <Bar dataKey="value" barSize={barSize} radius={[0, 6, 6, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color ?? "#8884d8"} />
          ))}

          {showValueLabel && <LabelList dataKey="value" position="right" />}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
