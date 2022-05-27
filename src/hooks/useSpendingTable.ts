import { useCallback, useState } from "react";

//API
import axios from "axios";
import { apiUrl } from "../utils/values";

//他
import Cookie from "universal-cookie";
import { NestSpendingType, CategoryType } from "../types/MoneyType";

export const useSpendingTable = (year: number, month: number) => {
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //テーブルに使用するデータ
  const [tableData, setTableData] = useState<Array<CategoryType>>([]);

  //データがあるか否か
  const [dataCheck, setDataCheck] = useState(true);

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
    dataCheck,
    categoryTableData,
    tableData,
  };
};
