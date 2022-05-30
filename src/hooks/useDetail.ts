//他
import axios from "axios";
import { useCallback, useState } from "react";
import Cookie from "universal-cookie";
import {
  CategoryDetailType,
  FamilyDetailType,
  NestIncomeType,
  NestSpendingType,
  NestUserType,
} from "../types/MoneyType";
import { apiUrl } from "../utils/values";

/**
 * 支出個人データ取得.
 */
export const useSpendingDetail = (year: number, month: number) => {
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //テーブルデータ
  const [spendingCategoryTable, setSpendingCategoryTable] = useState<
    Array<CategoryDetailType>
  >([]);
  const [spendingFamilyTable, setSpendingFamilyTable] = useState<
    Array<FamilyDetailType>
  >([]);

  //データがあるか否か
  const [spendingDataCheck, setSpendingDataCheck] = useState(true);

  /**
   * 個人支出アイテム取得.
   */
  const getCategorySpending = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setSpendingDataCheck(true);

    //API
    const result = await axios.post(`${apiUrl}/getsp/item/`, {
      userId: userId,
      year: year,
      month: month,
    });
    const resultData: Array<NestSpendingType> = result.data.sp;
    const dataArray = Array<CategoryDetailType>();

    //データの作成
    for (const resultItem of resultData) {
      for (const spendingItem of resultItem.spendingId) {
        dataArray.push({
          id: spendingItem._id,
          name: spendingItem.name,
          icon: resultItem.icon,
          color: `rgb(${resultItem.color})`,
          price: spendingItem.howmatch,
          createdAt: spendingItem.createdAt,
        });
      }
    }

    //日付順に並び替え
    dataArray.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });

    setSpendingCategoryTable(dataArray);

    //データがなければfalseにする
    if (dataArray.length == 0) {
      setSpendingDataCheck(false);
    }
  }, [year, month, spendingDataCheck]);

  /**
   * グループ支出アイテム取得.
   */
  const getFamilySpending = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setSpendingDataCheck(true);

    //API
    const user = await axios.get(`${apiUrl}/getuser/${userId}`);
    const familyId = user.data.user.familyId;
    const result = await axios.post(`${apiUrl}/getfamily/insp/`, {
      familyId: familyId,
      year: year,
      month: month,
    });

    const responseData = result.data.family;
    const userData = new Array<NestUserType>();

    //トータルが0になった時は排除するようにサーバ側で調整すること！
    for (const responseItem of responseData) {
      if (responseItem.spendingId.length > 0) {
        userData.push(responseItem);
      }
    }

    const dataArray = new Array<FamilyDetailType>();

    //データの作成
    for (const userItem of userData) {
      for (const spendingItem of userItem.spendingId) {
        for (const item of spendingItem.spendingId) {
          dataArray.push({
            id: spendingItem._id,
            name: userItem.name,
            contentName: item.name,
            image: userItem.image,
            price: item.howmatch,
            createdAt: item.createdAt,
          });
        }
      }
    }

    //日付順に並び替え
    dataArray.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });

    setSpendingFamilyTable(dataArray);

    //データがなければfalseにする
    if (dataArray.length == 0) {
      setSpendingDataCheck(false);
    }
  }, [year, month, spendingDataCheck]);

  return {
    spendingDataCheck,
    getCategorySpending,
    spendingCategoryTable,
    getFamilySpending,
    spendingFamilyTable,
  };
};

/**
 * 収入個人データ取得.
 *
 */
export const useIncomeDetail = (year: number, month: number) => {
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //テーブルデータ
  const [incomeCategoryTable, setIncomeCategoryTable] = useState<
    Array<CategoryDetailType>
  >([]);
  const [incomeFamilyTable, setIncomeFamilyTable] = useState<
    Array<FamilyDetailType>
  >([]);

  //データがあるか否か
  const [incomeDataCheck, setIncomeDataCheck] = useState(true);

  /**
   * 個人収入アイテム取得.
   */
  const getCategoryIncome = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setIncomeDataCheck(true);

    //API
    const result = await axios.post(`${apiUrl}/getic/item/`, {
      userId: userId,
      year: year,
      month: month,
    });
    const resultData: Array<NestIncomeType> = result.data.ic;
    const dataArray = Array<CategoryDetailType>();

    //データの作成
    for (const resultItem of resultData) {
      for (const incomeItem of resultItem.incomeId) {
        dataArray.push({
          id: incomeItem._id,
          name: incomeItem.name,
          icon: resultItem.icon,
          color: `rgb(${resultItem.color})`,
          price: incomeItem.howmatch,
          createdAt: incomeItem.createdAt,
        });
      }
    }

    //日付順に並び替え
    dataArray.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });

    setIncomeCategoryTable(dataArray);

    //データがなければfalseにする
    if (dataArray.length == 0) {
      setIncomeDataCheck(false);
    }
  }, [year, month, incomeDataCheck]);

  /**
   * グループ収入アイテム取得.
   */
  const getFamilyIncome = useCallback(async () => {
    //データがあるか否かを一旦trueに
    setIncomeDataCheck(true);

    //API
    const user = await axios.get(`${apiUrl}/getuser/${userId}`);
    const familyId = user.data.user.familyId;
    const result = await axios.post(`${apiUrl}/getfamily/insp/`, {
      familyId: familyId,
      year: year,
      month: month,
    });

    const responseData = result.data.family;
    const userData = new Array<NestUserType>();

    //トータルが0になった時は排除するようにサーバ側で調整すること！
    for (const responseItem of responseData) {
      if (responseItem.spendingId.length > 0) {
        userData.push(responseItem);
      }
    }

    const dataArray = new Array<FamilyDetailType>();

    //データの作成
    for (const userItem of userData) {
      for (const incomeItem of userItem.incomeId) {
        for (const item of incomeItem.incomeId) {
          dataArray.push({
            id: incomeItem._id,
            name: userItem.name,
            contentName: item.name,
            image: userItem.image,
            price: item.howmatch,
            createdAt: item.createdAt,
          });
        }
      }
    }

    //日付順に並び替え
    dataArray.sort((a, b) => {
      return a.createdAt > b.createdAt ? 1 : -1;
    });

    setIncomeFamilyTable(dataArray);

    //データがなければfalseにする
    if (dataArray.length == 0) {
      setIncomeDataCheck(false);
    }
  }, [year, month, incomeDataCheck]);

  return {
    incomeDataCheck,
    getCategoryIncome,
    incomeCategoryTable,
    getFamilyIncome,
    incomeFamilyTable,
  };
};
