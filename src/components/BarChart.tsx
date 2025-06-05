import * as echarts from "echarts";
import { useEffect, useRef } from "react";

interface BarChartProps {
  data: Record<string, number>;
}

export const BarChart = ({ data }: BarChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current!);
    chart.setOption({
      title: { text: "Average Crop Production" },
      tooltip: {},
      xAxis: { type: "category", data: Object.keys(data) },
      yAxis: { type: "value" },
      series: [
        {
          data: Object.values(data),
          type: "bar",
        },
      ],
    });
    return () => chart.dispose();
  }, [data]);

  return <div ref={chartRef} style={{ height: 500 }} />;
};
