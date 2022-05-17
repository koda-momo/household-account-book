import { FC, memo, useCallback, useState } from "react";

//date-fns
import { format } from "date-fns";
import addMonths from "date-fns/addMonths";

//MUI
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const DateBtn: FC = memo(() => {
  //日付データ
  const [date, setDate] = useState(new Date());
  const [formatDate, setFormatDate] = useState(format(date, "yyyy年M月分"));

  /**
   * 月を進める.
   */
  const addMonth = useCallback(() => {
    const tentativeDate = addMonths(date, 1);

    setDate(tentativeDate);
    setFormatDate(format(tentativeDate, "yyyy年M月分"));
  }, [date, formatDate]);

  /**
   * 月を戻す.
   */
  const subtractMonth = useCallback(() => {
    const tentativeDate = addMonths(date, -1);

    setDate(tentativeDate);
    setFormatDate(format(tentativeDate, "yyyy年M月分"));
  }, [date, formatDate]);

  return (
    <>
      <_Btn onClick={subtractMonth}>
        <ArrowBackIosNewIcon />
      </_Btn>

      <_Date>{formatDate}</_Date>

      <_Btn onClick={addMonth}>
        <ArrowForwardIosIcon />
      </_Btn>
    </>
  );
});

const _Date = styled("div")(() => ({
  fontSize: 20,
}));

const _Btn = styled("button")(() => ({
  background: "transparent",
  border: "none",
  outline: "none",
  ":focus": { boxShadow: "none" },
  ":hover": { color: "#FFDE7D" },
}));
