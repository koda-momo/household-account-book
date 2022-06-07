import { ChangeEvent, Dispatch, FC, memo, SetStateAction } from "react";

//MUI
import styled from "@emotion/styled";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

type Props = {
  value: string; //変数
  label: string; //ラベル
  setWord: Dispatch<SetStateAction<string>>; //set変数
  errorItem?: string; //エラー文
  menuList: Array<string>; //選択肢
};

/**
 * セレクトボックスコンポ―ネント.
 */
export const SelectBox: FC<Props> = memo(
  ({ value, label, setWord, errorItem, menuList }) => {
    /**
     * 入力値をセットする.
     */
    const handleChange = (e: SelectChangeEvent<string>) => {
      setWord(e.target.value);
    };
    return (
      <>
        {errorItem && <_Error>{errorItem}</_Error>}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={value}
            label={label}
            error={Boolean(errorItem)}
            onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
          >
            {menuList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }
);

const _Error = styled("div")(() => ({
  color: "#F6416C",
  textAlign: "left",
  height: 30,
}));
