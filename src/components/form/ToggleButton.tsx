import { Dispatch, FC, memo, SetStateAction, useCallback } from "react";

//MUI
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

type Props = {
  setToggle: Dispatch<SetStateAction<string>>;
  toggle: string;
  toggleItemA: string;
  toggleItemB: string;
};

export const ToggleButton: FC<Props> = memo(
  ({ setToggle, toggle, toggleItemA, toggleItemB }) => {
    /**
     * トグルをAに切り替える.
     */
    const switchToggleA = useCallback(() => {
      setToggle(toggleItemA);
    }, [toggle]);

    /**
     * トグルをBBに切り替える.
     */
    const switchToggleB = useCallback(() => {
      setToggle(toggleItemB);
    }, [toggle]);

    return (
      <>
        <_Flex>
          {toggle === toggleItemA ? (
            <>
              <_ToggleBtnA onClick={switchToggleA}>{toggleItemA}</_ToggleBtnA>
              <_ToggleBtnB onClick={switchToggleB}>{toggleItemB}</_ToggleBtnB>
            </>
          ) : (
            <>
              <_ToggleBtnB onClick={switchToggleA}>{toggleItemA}</_ToggleBtnB>
              <_ToggleBtnA onClick={switchToggleB}>{toggleItemB}</_ToggleBtnA>
            </>
          )}
        </_Flex>
      </>
    );
  }
);

const _ToggleBtnA = styled(Button)(() => ({
  backgroundColor: "#00B8A9",
  color: "white",
  ":hover": {
    backgroundColor: "#00B8A9",
  },
}));

const _ToggleBtnB = styled(Button)(() => ({
  backgroundColor: "gray",
  color: "white",
  ":hover": {
    backgroundColor: "gray",
  },
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  gap: 20,
}));
