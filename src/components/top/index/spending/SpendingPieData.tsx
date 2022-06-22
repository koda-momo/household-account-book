import { FC, memo, useEffect } from "react";

//chart.js
import { ChartOptions, ArcElement, Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

//MUI
import { styled } from "@mui/material/styles";

//others
import { useSpendingPie } from "../../../../hooks/top/useSpendingPie";
import { usePie } from "../../../../hooks/top/usePie";

type Props = {
  year: number; //表示年
  month: number; //表示月
  mode: string; //グループか個人か
};

/**
 * 支出円グラフコンポーネント.
 */
export const SpendingPieData: FC<Props> = memo(({ year, month, mode }) => {
  Chart.register(ArcElement);
  Chart.register(ChartDataLabels);

  //hooks
  const { getSpendingCategoryData, getSpendingGroupData, pieData, dataCheck } =
    useSpendingPie(year, month);

  const { pieOption } = usePie();

  //円グラフのオプション
  const chartOptions: ChartOptions<"pie"> = {
    plugins: {
      datalabels: {
        labels: {
          title: {
            color: "white",
            font: {
              size: 15,
            },
          },
        },
        display: true,
        formatter(value, context) {
          return pieOption(value, context);
        },
      },
    },
  };

  /**
   * 支出データ取得.
   * @remarks スイッチ切替で発動
   */
  useEffect(() => {
    if (mode === "個人") {
      getSpendingCategoryData();
    } else if (mode === "グループ") {
      getSpendingGroupData();
    }
  }, [mode, year, month, getSpendingCategoryData, getSpendingGroupData]);

  //読み込み中の表示
  if (pieData.labels?.length == 0 && dataCheck === true)
    return (
      <_Loading>
        <_Pie>読み込み中…</_Pie>
      </_Loading>
    );

  return (
    <>
      {dataCheck ? (
        <div>
          <_Pie>
            <Pie data={pieData} options={chartOptions} />
          </_Pie>
        </div>
      ) : (
        <_Nodata>登録がありません。</_Nodata>
      )}
    </>
  );
});

const _Pie = styled("div")(() => ({
  width: 500,
  height: 500,
  "@media screen and (max-width:820px)": {
    width: 300,
    height: 300,
  },
}));

const _Nodata = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
}));

const _Loading = styled("div")(() => ({
  color: "#F8F3D4",
}));
