//date-fns
import { format } from "date-fns";
import { useCallback } from "react";
import { CategoryType, FamilyType } from "../types/MoneyType";

/**
 * 表示を整えるhook.
 */
export const useFormater = () => {
  /**
   * 日付の表示を整える.
   */
  const formatDate = useCallback((date: Date) => {
    return format(date, "yyyy年M月d日");
  }, []);

  /**
   * 日付の表示を整える.(スマホ用)
   */
  const formatPhoneDate = useCallback((date: Date) => {
    return format(date, "M.d");
  }, []);

  /**
   * 金額の表示を整える.
   */
  const formatMoney = useCallback((money: number) => {
    return money.toLocaleString();
  }, []);

  /**
   * パーセンテージの計算.
   */
  const totaleCount = (
    price: number,
    categoryTableData: Array<CategoryType>
  ) => {
    let total = 0;

    for (const item of categoryTableData) {
      total += item.price;
    }
    const percent = (Math.round((price / total) * 1000) / 10).toString();
    return percent;
  };

  /**
   * パーセンテージの計算.
   */
  const totaleFamilyCount = (
    price: number,
    familyTableData: Array<FamilyType>
  ) => {
    let total = 0;

    for (const item of familyTableData) {
      total += item.price;
    }
    const percent = (Math.round((price / total) * 1000) / 10).toString();
    return percent;
  };

  return {
    formatDate,
    formatPhoneDate,
    formatMoney,
    totaleCount,
    totaleFamilyCount,
  };
};
