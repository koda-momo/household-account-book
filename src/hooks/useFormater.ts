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

  /**
   * 合計金額を計算.
   */
  const calcTotal = useCallback((array: Array<any>) => {
    let total = 0;
    for (const item of array) {
      total += item.price;
    }
    return "\xA5" + total.toLocaleString();
  }, []);

  /**
   * 残金の計算.
   */
  const calcBalance = useCallback(
    (spengingArray: Array<any>, incomeArray: Array<any>) => {
      let spendingTotal = 0;
      for (const item of spengingArray) {
        spendingTotal += item.price;
      }

      let incomeTotal = 0;
      for (const item of incomeArray) {
        incomeTotal += item.price;
      }

      const answer = incomeTotal - spendingTotal;
      return "\xA5" + answer.toLocaleString();
    },
    []
  );

  return {
    formatDate,
    formatPhoneDate,
    formatMoney,
    totaleCount,
    totaleFamilyCount,
    calcTotal,
    calcBalance,
  };
};
