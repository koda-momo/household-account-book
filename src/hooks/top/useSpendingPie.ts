import { useCallback, useState } from "react";

//API
import axios from "axios";
import { apiUrl } from "../../utils/values";

//chart.js
import { ChartData } from "chart.js";

//他
import Cookie from "universal-cookie";
import { NestUserType, NestSpendingType } from "../../types/MoneyType";

export const useSpendingPie = (year: number, month: number) => {
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
        label: "支出",
        data: [], //それぞれ価格%
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  /**
   * 支出データ取得.
   * @remarks カテゴリ別
   */
  const getSpendingCategoryData = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setDataCheck(true);

    const result = await axios.post(`${apiUrl}/getsp/item/`, {
      userId: userId,
      year: year,
      month: month,
    });

    const spendingData: Array<NestSpendingType> = result.data.sp;

    //円グラフに利用する配列
    const categoryArray = new Array<string>();
    const priceArray = new Array<number>();
    const colorArray = new Array<string>();

    //支出情報を回して円グラフのデータを作成する
    for (const item of spendingData) {
      categoryArray.push(item.categoryName);
      priceArray.push(item.total);
      colorArray.push(`rgb(${item.color})`);
    }

    //円グラフにセット
    const pieArray = {
      labels: categoryArray,
      datasets: [
        {
          label: "支出",
          data: priceArray, //それぞれ価格%
          backgroundColor: colorArray,
          hoverOffset: 4,
        },
      ],
    };

    setPieData(pieArray);

    if (spendingData.length == 0) {
      setDataCheck(false);
      return;
    }
  }, [year, month, userId, pieData]);

  /**
   * 支出データ取得.
   * @remarks 家族別
   */
  const getSpendingGroupData = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setDataCheck(true);

    const userData = await axios.get(`${apiUrl}/getuser/${userId}`);
    const familyId = userData.data.user.familyId;
    const result = await axios.post(`${apiUrl}/getfamily/insp/`, {
      familyId: familyId,
      year: year,
      month: month,
    });

    const responseData = result.data.family;
    const spendingData = new Array<NestUserType>();

    //トータルが0になった時は排除するようにサーバ側で調整すること！
    for (const responseItem of responseData) {
      if (responseItem.spendingId.length > 0) {
        spendingData.push(responseItem);
      }
    }

    //円グラフに利用する配列
    const nameArray = new Array<string>();
    const priceArray = new Array<number>();
    const colorArray = new Array<string>();

    //支出情報を回して円グラフのデータを作成する
    for (const item of spendingData) {
      //値段データ
      let totalPrice = 0;
      for (const itemB of item.spendingId) {
        totalPrice += itemB.total;
      }

      //価格データ
      priceArray.push(totalPrice);

      //名前データ
      nameArray.push(item.name);

      //色データ
      colorArray.push(`rgb(${item.color})`);
    }

    //円グラフにセット
    const pieArray = {
      labels: nameArray,
      datasets: [
        {
          label: "支出",
          data: priceArray, //それぞれ価格%
          backgroundColor: colorArray,
          hoverOffset: 4,
        },
      ],
    };

    setPieData(pieArray);

    if (spendingData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId, pieData]);

  return {
    getSpendingCategoryData,
    getSpendingGroupData,
    pieData,
    dataCheck,
  };
};
