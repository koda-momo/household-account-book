import { useCallback, useState } from "react";

//API
import axios from "axios";
import { apiUrl } from "../../utils/values";

//他
import Cookie from "universal-cookie";
import {
  NestSpendingType,
  CategoryType,
  NestUserType,
  FamilyType,
} from "../../types/MoneyType";

/**
 * 支出データ取得.
 * @remarks カテゴリ別
 */
export const useSpendingTable = (year: number, month: number) => {
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //テーブルに使用するデータ
  const [categoryTableData, setCategoryTableData] = useState<
    Array<CategoryType>
  >([]);
  const [familyTableData, setFamilyTableData] = useState<Array<FamilyType>>([]);

  //データがあるか否か
  const [dataCheck, setDataCheck] = useState(true);

  /**
   * 支出カテゴリテーブルデータ作成.
   */
  const makeCategoryTableData = useCallback(async () => {
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

    //支出情報を回してデータを作成する
    for (const item of spendingData) {
      dataArray.push({
        id: item._id,
        name: item.categoryName,
        icon: item.icon,
        color: `rgb(${item.color})`,
        price: item.total,
      });
    }

    setCategoryTableData(dataArray);

    if (spendingData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId]);

  /**
   * 支出データ取得.
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

    const spendingData = new Array<NestUserType>();

    if (familyId === "") {
      const responseData = result.data.family.filter((item: NestUserType) => {
        return item._id === userId;
      });
      for (const responseItem of responseData) {
        if (responseItem.spendingId.length > 0) {
          spendingData.push(responseItem);
        }
      }
    } else {
      const responseData = result.data.family;
      //トータルが0になった時は排除するようにサーバ側で調整すること！
      for (const responseItem of responseData) {
        if (responseItem.spendingId.length > 0) {
          spendingData.push(responseItem);
        }
      }
    }

    const dataArray = new Array<FamilyType>();

    //支出情報を回してデータを作成する
    for (const item of spendingData) {
      //値段データ
      let totalPrice = 0;
      for (const itemB of item.spendingId) {
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

    if (spendingData.length == 0) {
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
