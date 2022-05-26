import { FC, memo, useEffect, useState } from "react";

//chart.js
import { ChartOptions, ArcElement, Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

//MUI
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

//others
import { useIncome } from "../../hooks/useIncome";

type Props = {
  year: number; //表示年
  month: number; //表示月
  mode: string; //グループか個人か
};

export const IncomePieData: FC<Props> = memo(({ year, month, mode }) => {
  Chart.register(ArcElement);

  const { getIncomeCategoryData, getIncomeGroupData, pieData, dataCheck } =
    useIncome(year, month);

  //円グラフのオプション
  const chartOptions: ChartOptions<"pie"> = {
    color: "red",
    backgroundColor: "red",
    plugins: {
      datalabels: {
        display: true,
        anchor: "end",
        align: "right",
        formatter(value) {
          return `${value}円`;
        },
      },
    },
  };

  /**
   * 収入データ取得.
   * @remarks スイッチ切替で発動
   */
  useEffect(() => {
    if (mode === "個人") {
      getIncomeCategoryData();
    } else if (mode === "グループ") {
      getIncomeGroupData();
    }
  }, [mode, year, month]);

  //読み込み中の表示
  if (pieData.labels?.length == 0 && dataCheck === true)
    return (
      <_Nodata>
        <CircularProgress />
      </_Nodata>
    );

  return (
    <>
      {dataCheck ? (
        <_Pie>
          <Pie data={pieData} options={chartOptions} />
        </_Pie>
      ) : (
        <_Nodata>登録がありません。</_Nodata>
      )}
    </>
  );
});

const _Pie = styled("div")(() => ({
  width: 500,
  height: 500,
  "@media screen and (max-width:600px)": {
    width: 300,
    height: 300,
  },
}));

const _Nodata = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
  width: 500,
  height: 500,
  "@media screen and (max-width:600px)": {
    width: 300,
    height: 300,
  },
}));
