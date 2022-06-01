import {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

//MUI
import { styled } from "@mui/material/styles";
import { ColorResult, RGBColor, CirclePicker } from "react-color";

type Props = {
  label: string;
  errorItem: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const InputColor: FC<Props> = memo(
  ({ label, errorItem, value, setValue }) => {
    const [color, setColor] = useState<RGBColor>();

    useEffect(() => {
      const splitColor = value.split(", ");

      const result = {
        r: Number(splitColor[0]),
        g: Number(splitColor[1]),
        b: Number(splitColor[2]),
        a: 1,
      };

      setColor(result);
    }, []);

    /**
     * 入力値をセットする.
     */
    const handleChange = useCallback(
      (color: ColorResult) => {
        const r = color.rgb.r;
        const g = color.rgb.g;
        const b = color.rgb.b;
        const rgb = r + ", " + g + ", " + b;
        setColor(color.rgb);
        console.log(color.rgb);
        setValue(rgb);
      },
      [value]
    );

    return (
      <>
        <_Error>{errorItem}</_Error>

        <_Label>{label}</_Label>
        <_Picker>
          <_Pc>
            <CirclePicker
              color={color}
              onChangeComplete={handleChange}
              width="800px"
            />
          </_Pc>
          <_Phone>
            <CirclePicker color={color} onChangeComplete={handleChange} />
          </_Phone>
        </_Picker>
      </>
    );
  }
);

const _Error = styled("div")(() => ({
  color: "#F6416C",
  textAlign: "left",
  height: 30,
}));

const _Label = styled("div")(() => ({
  textAlign: "left",
}));

const _Picker = styled("div")(() => ({
  marginTop: 20,
  marginBottom: 30,
  "@media screen and (max-width:600px)": {
    flexDirection: "column",
    gap: 20,
  },
}));

const _Phone = styled("div")(() => ({
  display: "none",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
}));

const _Pc = styled("div")(() => ({
  display: "block",
  "@media screen and (max-width:600px)": {
    display: "none",
  },
}));
