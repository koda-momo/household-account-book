import type { NextPage } from "next";
import { ChartData, ChartOptions, Chart, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";

/**
 * トップページ(収支のページ).
 */
const Home: NextPage = () => {
  Chart.register(ArcElement);
  const pieData: ChartData<"pie"> = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
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

  return (
    <>
      <div>
        <Pie data={pieData} />
      </div>
    </>
  );
};

export default Home;
