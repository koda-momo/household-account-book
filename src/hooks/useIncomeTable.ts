import { useCallback, useState } from "react";

//API
import { apiUrl } from "../utils/values";
import axios from "axios";

//他
import Cookie from "universal-cookie";
import { NestIncomeType, CategoryType } from "../types/MoneyType";

export const useIncomeTable = (year: number, month: number) => {
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //データがあるか否か
  const [dataCheck, setDataCheck] = useState(true);

  //テーブルに使用するデータ
  const [tableData, setTableData] = useState<Array<CategoryType>>([]);

  /**
   * 収入カテゴリテーブルデータ作成.
   */
  const categoryTableData = useCallback(async () => {
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

    setTableData(dataArray);

    if (incomeData.length == 0) {
      setDataCheck(false);
    }
  }, [year, month, userId]);

  return {
    dataCheck,
    categoryTableData,
    tableData,
  };
};
