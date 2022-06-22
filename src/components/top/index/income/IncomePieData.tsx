import { FC, memo, useEffect } from "react";

//chart.js
import { ChartOptions, ArcElement, Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

//MUI
import { styled } from "@mui/material/styles";

//others
import { useIncomePie } from "../../../../hooks/top/useIncomePie";
import { usePie } from "../../../../hooks/top/usePie";

type Props = {
  year: number; //表示年
  month: number; //表示月
  mode: string; //グループか個人か
};

/**
 * 収入円グラフコンポーネント.
 */
export const IncomePieData: FC<Props> = memo(({ year, month, mode }) => {
  Chart.register(ArcElement);
  Chart.register(ChartDataLabels);

  //hooks
  const { getIncomeCategoryData, getIncomeGroupData, pieData, dataCheck } =
    useIncomePie(year, month);

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
   * 収入データ取得.
   * @remarks スイッチ切替で発動
   */
  useEffect(() => {
    if (mode === "個人") {
      getIncomeCategoryData();
    } else if (mode === "グループ") {
      getIncomeGroupData();
    }
  }, [mode, year, month, getIncomeCategoryData, getIncomeGroupData]);

  //読み込み中の表示
  if (pieData.labels?.length == 0 && dataCheck === true)
    return <_Loading>読み込み中…</_Loading>;

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
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
  color: "#F8F3D4",
}));
