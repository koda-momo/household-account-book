import { FC, memo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

//chart.js
import { ChartOptions, ArcElement, Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

//MUI
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

//others
import { useIncomePie } from "../../../../hooks/useIncomePie";

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
  const router = useRouter();

  const { getIncomeCategoryData, getIncomeGroupData, pieData, dataCheck } =
    useIncomePie(year, month);

  /**
   * 詳細画面に遷移.
   */
  const goDetailPage = useCallback(() => {
    router.push("/top/detail");
  }, []);

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
    return <_Nodata>登録がありません。</_Nodata>;

  return (
    <>
      {dataCheck ? (
        <div>
          <_Pie>
            <Pie data={pieData} options={chartOptions} />
          </_Pie>
          <div>
            <_Flex>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: 300, fontSize: 20 }}
                onClick={goDetailPage}
              >
                詳細を見る
              </Button>
            </_Flex>
          </div>
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
  "@media screen and (max-width:600px)": {
    width: 300,
    height: 300,
  },
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: 50,
  marginBottom: 50,
}));

const _Nodata = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
}));