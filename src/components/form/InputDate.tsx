import { ChangeEvent, Dispatch, FC, memo, SetStateAction } from "react";

//MUI
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addYears } from "date-fns";

type Props = {
  label: string;
  value: number | null;
  setDate: Dispatch<SetStateAction<number | null>>;
  errorItem: string;
  defaultValue?: number;
};

/**
 * 日付用テキストボックスコンポーネント.
 */
export const InputDate: FC<Props> = memo(
  ({ label, value, setDate, errorItem, defaultValue = "" }) => {
    //最小の年月設定
    const dateYear = new Date().getFullYear();
    const minDate = Number(addYears(new Date(dateYear, 1 - 1, 1), -10));

    //最大の年月設定
    const maxDate = Number(addYears(new Date(dateYear, 1 - 1, 1), 10));

    return (
      <_Main>
        <_Error>{errorItem}</_Error>

        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth={true}>
          <DatePicker
            inputFormat="yyyy/M/d"
            label={label}
            value={value}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            minDate={minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </_Main>
    );
  }
);

const _Error = styled("div")(() => ({
  color: "#F6416C",
  textAlign: "left",
  height: 30,
}));

const _Main = styled("div")(() => ({
  textAlign: "left",
}));
