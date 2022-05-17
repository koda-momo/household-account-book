import type { NextPage } from "next";
import Router from "next/router";
import { useCallback, useState } from "react";

//components
import { ToggleButton } from "../../components/form/ToggleButton";
import { PieData } from "../../components/top/PieData";

//chart.js
import { ChartData, ChartOptions, Chart, ArcElement } from "chart.js";

//MUI
import { styled } from "@mui/material/styles";
import { PageTitle } from "../../components/layout/PageTitle";
import { DateBtn } from "../../components/top/DateBtn";
import { Box, Button } from "@mui/material";
import { CategoryTable } from "../../components/top/CategoryTable";
import { FamilyTable } from "../../components/top/FamilyTable";

/**
 * トップページ(収支のページ).
 */
const Home: NextPage = () => {
  Chart.register(ArcElement);

  //個人支出
  const oneOutPieData: ChartData<"pie"> = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "支出",
        data: [300, 50, 100], //それぞれの%
        backgroundColor: [
          //背景色
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  //トグル(支出、収入)
  const [inOrOutFlug, setInOrOutFlug] = useState("支出");

  //トグル(個人、グループ)
  const [oneOrGroupFlug, setOneOrGroupFlug] = useState("個人");

  /**
   * 詳細画面に遷移.
   */
  const goDetailPage = useCallback(() => {
    Router.push("/top/detail");
  }, []);

  return (
    <>
      <div>
        <PageTitle title={`${oneOrGroupFlug}の${inOrOutFlug}の記録`} />

        <_DateBtn>
          <DateBtn />
        </_DateBtn>

        <_Center>
          <_ToggleButton>
            <div>
              <ToggleButton
                toggle={inOrOutFlug}
                setToggle={setInOrOutFlug}
                toggleItemA="支出"
                toggleItemB="収入"
              />
            </div>

            <div>
              <ToggleButton
                toggle={oneOrGroupFlug}
                setToggle={setOneOrGroupFlug}
                toggleItemA="個人"
                toggleItemB="グループ"
              />
            </div>
          </_ToggleButton>
        </_Center>

        <_Flex>
          <PieData data={oneOutPieData} />
        </_Flex>

        <_Flex>
          {oneOrGroupFlug === "個人" ? <CategoryTable /> : <FamilyTable />}
        </_Flex>

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
    </>
  );
};

const _Center = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: 50,
  marginBottom: 50,
}));

const _DateBtn = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: 10,
  marginBottom: 30,
}));

const _ToggleButton = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: 100,
  padding: 30,
  border: "2px dashed #00B8A9",
  width: "auto",
  "@media screen and (max-width:600px)": {
    flexDirection: "column",
    gap: 20,
  },
}));

export default Home;
