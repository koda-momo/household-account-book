//date-fns
import { format } from "date-fns";
import { useCallback } from "react";

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
   * 金額の表示を整える.
   */
  const formatMoney = useCallback((money: number) => {
    return money.toLocaleString();
  }, []);

  return { formatDate, formatMoney };
};
