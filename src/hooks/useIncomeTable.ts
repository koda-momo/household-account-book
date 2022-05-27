import { useCallback, useState } from "react";

//API
import { apiUrl } from "../utils/values";
import axios from "axios";

//他
import Cookie from "universal-cookie";
import {
  NestIncomeType,
  CategoryType,
  FamilyType,
  NestUserType,
} from "../types/MoneyType";

export const useIncomeTable = (year: number, month: number) => {
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //データがあるか否か
  const [dataCheck, setDataCheck] = useState(true);

  //テーブルに使用するデータ
  const [categoryTableData, setCategoryTableData] = useState<
    Array<CategoryType>
  >([]);
  const [familyTableData, setFamilyTableData] = useState<Array<FamilyType>>([]);

  /**
   * 収入カテゴリテーブルデータ作成.
   */
  const makeCategoryTableData = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setDataCheck(true);

    //API
    const result = await axios.post(`${apiUrl}/getic/item/`, {
      userId: userId,
      year: year,
      month: month,
    });
    const incomeData: Array<NestIncomeType> = result.data.ic;

    //配列作成
    const dataArray = new Array<CategoryType>();

    //収入情報を回して円グラフのデータを作成する
    for (const item of incomeData) {
      dataArray.push({
        id: item._id,
        name: item.categoryName,
        icon: item.icon,
        color: `rgb(${item.color})`,
        price: item.total,
      });
    }

    setCategoryTableData(dataArray);

    if (incomeData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId]);

  /**
   * 収入データ取得.
   * @remarks 家族データ
   */
  const makeFamilyTableData = useCallback(async () => {
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
    const incomeData = new Array<NestUserType>();

    //トータルが0になった時は排除するようにサーバ側で調整すること！
    for (const responseItem of responseData) {
      if (responseItem.incomeId.length > 0) {
        incomeData.push(responseItem);
      }
    }

    //円グラフに利用する配列
    const dataArray = new Array<FamilyType>();

    //支出情報を回して円グラフのデータを作成する
    for (const item of incomeData) {
      //値段データ
      let totalPrice = 0;
      for (const itemB of item.incomeId) {
        totalPrice += itemB.total;
      }

      dataArray.push({
        id: item._id,
        name: item.name,
        image: item.image,
        price: totalPrice,
      });
    }

    setFamilyTableData(dataArray);

    if (incomeData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId]);

  return {
    dataCheck,
    makeCategoryTableData,
    categoryTableData,
    makeFamilyTableData,
    familyTableData,
  };
};
