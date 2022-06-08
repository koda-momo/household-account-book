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
import { Button } from "@mui/material";
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
      <Button
        onClick={subtractMonth}
        color="inherit"
        aria-label="表示している月を１つ戻す"
      >
        <ArrowBackIosNewIcon />
      </Button>

      <_Date>{formatDate}</_Date>

      <Button
        onClick={addMonth}
        color="inherit"
        aria-label="表示している月を１つ進める"
      >
        <ArrowForwardIosIcon />
      </Button>
    </_Main>
  );
});

const _Main = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  zIndex: 2,
}));

const _Date = styled("div")(() => ({
  fontSize: 20,
}));
