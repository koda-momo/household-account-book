import { useCallback, useState } from "react";

//API
import axios from "axios";
import { apiUrl } from "../utils/values";

//chart.js
import { ChartData } from "chart.js";
import { useColor } from "./useColor";

//他
import Cookie from "universal-cookie";
import {
  NestUserType,
  NestSpendingType,
  CategoryType,
} from "../types/MoneyType";

export const useSpending = (year: number, month: number) => {
  const { makeColor } = useColor();

  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //支出データ
  const [nameList, setNameList] = useState<Array<string>>([]);
  const [priceList, setPriceList] = useState<Array<number>>([]);
  const [colorList, setColorList] = useState<Array<string>>([]);

  //データがあるか否か
  const [dataCheck, setDataCheck] = useState(true);

  //テーブルに使用するデータ
  const [tableData, setTableData] = useState<Array<CategoryType>>([]);

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

    setNameList(categoryArray);
    setPriceList(priceArray);
    setColorList(colorArray);

    if (spendingData.length == 0) {
      setDataCheck(false);
      return;
    }
  }, [year, month, userId, nameList, priceList, colorList]);

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
      const colorData = makeColor();
      colorArray.push(colorData);
    }

    setNameList(nameArray);
    setPriceList(priceArray);
    setColorList(colorArray);

    if (spendingData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId, nameList, priceList, colorList]);

  //円グラフデータ
  const pieData: ChartData<"pie"> = {
    labels: nameList,
    datasets: [
      {
        label: "支出",
        data: priceList, //それぞれ価格%
        backgroundColor: colorList,
        hoverOffset: 4,
      },
    ],
  };

  /**
   * 支出カテゴリテーブルデータ作成.
   */
  const categoryTableData = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setDataCheck(true);

    //API
    const result = await axios.post(`${apiUrl}/getsp/item/`, {
      userId: userId,
      year: year,
      month: month,
    });
    const spendingData: Array<NestSpendingType> = result.data.sp;

    //配列作成
    const dataArray = new Array<CategoryType>();

    //支出情報を回して円グラフのデータを作成する
    for (const item of spendingData) {
      dataArray.push({
        id: item._id,
        name: item.categoryName,
        icon: item.icon,
        color: `rgb(${item.color})`,
        price: item.total,
      });
    }

    setTableData(dataArray);

    if (spendingData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId]);

  return {
    getSpendingCategoryData,
    getSpendingGroupData,
    pieData,
    dataCheck,
    categoryTableData,
    tableData,
  };
};
