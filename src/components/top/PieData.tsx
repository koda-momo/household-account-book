import { FC, memo } from "react";

//chart.js
import { ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

//MUI
import { styled } from "@mui/material/styles";

type Props = {
  data: ChartData<"pie">;
};

export const PieData: FC<Props> = memo(({ data }) => {
  return (
    <_Pie>
      <Pie data={data} />
    </_Pie>
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
