import { ChangeEvent, Dispatch, FC, memo, SetStateAction } from "react";

//MUI
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  label: string;
  value: number;
  setNumber: Dispatch<SetStateAction<number>>;
  errorItem: string;
};

/**
 * 数字用テキストボックスコンポーネント.
 */
export const InputNumber: FC<Props> = memo(
  ({ label, value, setNumber, errorItem }) => {
    /**
     * 入力値をセットする.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNumber(Number(e.target.value));
    };

    return (
      <>
        <_Error>{errorItem}</_Error>
        <TextField
          fullWidth={true}
          id={String(value)}
          error={Boolean(errorItem)}
          label={label}
          value={value}
          type="number"
          size="medium"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </>
    );
  }
);

const _Error = styled("div")(() => ({
  color: "#F6416C",
  textAlign: "left",
  height: 30,
}));
