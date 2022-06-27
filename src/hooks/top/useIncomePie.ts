import { useCallback, useState } from "react";

//API
import axios from "axios";
import { apiUrl } from "../../utils/values";

//chart.js
import { ChartData } from "chart.js";

//他
import Cookie from "universal-cookie";
import { NestIncomeType, NestUserType } from "../../types/MoneyType";

export const useIncomePie = (year: number, month: number) => {
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //データがあるか否か
  const [dataCheck, setDataCheck] = useState(true);

  //円グラフデータ
  const [pieData, setPieData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [
      {
        label: "収入",
        data: [], //それぞれ価格%
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  /**
   * 収入データ取得.
   * @remarks カテゴリ別
   */
  const getIncomeCategoryData = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setDataCheck(true);

    const result = await axios.post(`${apiUrl}/getic/item/`, {
      userId: userId,
      year: year,
      month: month,
    });

    const incomeData: Array<NestIncomeType> = result.data.ic;

    //円グラフに利用する配列
    const categoryArray = new Array<string>();
    const priceArray = new Array<number>();
    const colorArray = new Array<string>();

    //収入情報を回して円グラフのデータを作成する
    for (const item of incomeData) {
      categoryArray.push(item.categoryName);
      priceArray.push(item.total);
      colorArray.push(`rgb(${item.color})`);
    }

    const pieArray = {
      labels: categoryArray,
      datasets: [
        {
          label: "収入",
          data: priceArray, //それぞれ価格%
          backgroundColor: colorArray,
          hoverOffset: 4,
        },
      ],
    };
    setPieData(pieArray);

    if (incomeData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId]);

  /**
   * 収入データ取得.
   * @remarks 家族別
   */
  const getIncomeGroupData = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setDataCheck(true);

    const userData = await axios.get(`${apiUrl}/getuser/${userId}`);
    const familyId = userData.data.user.familyId;
    const result = await axios.post(`${apiUrl}/getfamily/insp/`, {
      familyId: familyId,
      year: year,
      month: month,
    });

    const incomeData = new Array<NestUserType>();
    if (familyId === "") {
      const responseData = result.data.family.filter((item: NestUserType) => {
        return item._id === userId;
      });

      //トータルが0になった時は排除するようにサーバ側で調整すること！
      for (const responseItem of responseData) {
        if (responseItem.incomeId.length > 0) {
          incomeData.push(responseItem);
        }
      }
    } else {
      const responseData = result.data.family;
      //トータルが0になった時は排除するようにサーバ側で調整すること！
      for (const responseItem of responseData) {
        if (responseItem.incomeId.length > 0) {
          incomeData.push(responseItem);
        }
      }
    }

    //円グラフに利用する配列
    const nameArray = new Array<string>();
    const priceArray = new Array<number>();
    const colorArray = new Array<string>();

    //収入情報を回して円グラフのデータを作成する
    for (const item of incomeData) {
      //値段データ
      let totalPrice = 0;
      for (const itemB of item.incomeId) {
        totalPrice += itemB.total;
      }

      //価格データ
      priceArray.push(totalPrice);

      //名前データ
      nameArray.push(item.name);

      //色データ
      colorArray.push(`rgb(${item.color})`);
    }

    const pieArray = {
      labels: nameArray,
      datasets: [
        {
          label: "収入",
          data: priceArray, //それぞれ価格%
          backgroundColor: colorArray,
          hoverOffset: 4,
        },
      ],
    };
    setPieData(pieArray);

    if (incomeData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId]);

  return {
    getIncomeCategoryData,
    getIncomeGroupData,
    pieData,
    dataCheck,
  };
};
