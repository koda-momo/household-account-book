import { useCallback } from "react";
import { Context } from "chartjs-plugin-datalabels";

export const usePie = () => {
  /**
   * 円グラフのオプション.
   */
  const pieOption = useCallback((value: number, context: Context) => {
    const label = context.chart.data.labels
      ? context.chart.data.labels[context.dataIndex]
      : "";

    const dataArray = context.chart.data.datasets[0].data;
    let total = 0;
    for (const item of dataArray) {
      total += Number(item);
    }

    const dataItem = dataArray[context.dataIndex];

    //パーセントを算出
    const percent = dataItem
      ? (Math.round((Number(dataItem) / total) * 1000) / 10).toString()
      : 0;

    return `${label}${percent}%`;
  }, []);

  return { pieOption };
};
