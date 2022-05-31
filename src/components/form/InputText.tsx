import { ChangeEvent, Dispatch, FC, memo, SetStateAction } from "react";

//MUI
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  label: string;
  value: string;
  setWord: Dispatch<SetStateAction<string>>;
  errorItem: string;
  type?: string;
  defaultValue?: string;
};

/**
 * テキストボックスコンポーネント.
 */
export const InputText: FC<Props> = memo(
  ({ label, value, setWord, errorItem, type = "text", defaultValue = "" }) => {
    /**
     * 入力値をセットする.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setWord(e.target.value);
    };

    return (
      <>
        <_Error>{errorItem}</_Error>
        <TextField
          fullWidth={true}
          id={value}
          error={Boolean(errorItem)}
          label={label}
          value={value}
          type={type}
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
