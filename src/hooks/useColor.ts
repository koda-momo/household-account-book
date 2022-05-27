import { useCallback } from "react";

export const useColor = () => {
  /**
   * ランダムにRGBカラーを作成.
   */
  const makeColor = useCallback(() => {
    const min = 0;
    const max = 255;

    let colorData = "rgb(";

    for (let i = 1; i <= 3; i++) {
      const colorItem = Math.floor(Math.random() * (max + 1 - min)) + min;
      if (i == 3) {
        colorData = colorData + String(colorItem) + ")";
      } else {
        colorData = colorData + String(colorItem) + ",";
      }
    }

    return colorData;
  }, []);

  return { makeColor };
};
