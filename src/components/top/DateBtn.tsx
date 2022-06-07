import {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from "react";

//date-fns
import { format } from "date-fns";
import addMonths from "date-fns/addMonths";

//MUI
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

export const DateBtn: FC<Props> = memo(({ date, setDate }) => {
  //日付データ
  const [formatDate, setFormatDate] = useState(format(date, "yyyy年M月分"));

  /**
   * 月を進める.
   */
  const addMonth = useCallback(() => {
    const tentativeDate = addMonths(date, 1);

    setDate(tentativeDate);
    setFormatDate(format(tentativeDate, "yyyy年M月分"));
  }, [date, setDate]);

  /**
   * 月を戻す.
   */
  const subtractMonth = useCallback(() => {
    const tentativeDate = addMonths(date, -1);

    setDate(tentativeDate);
    setFormatDate(format(tentativeDate, "yyyy年M月分"));
  }, [date, setDate]);

  return (
    <_Main>
      <_Btn onClick={subtractMonth}>
        <ArrowBackIosNewIcon />
      </_Btn>

      <_Date>{formatDate}</_Date>

      <_Btn onClick={addMonth}>
        <ArrowForwardIosIcon />
      </_Btn>
    </_Main>
  );
});

const _Main = styled("div")(() => ({
  display: "flex",
  gap: 10,
  zIndex: 2,
}));

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
