import { FC, memo } from "react";

//MUI
import { styled } from "@mui/material/styles";

type Props = {
  title: string;
};

export const PageTitle: FC<Props> = memo(({ title }) => {
  return <_Title>{title}</_Title>;
});

const _Title = styled("h1")(() => ({
  textAlign: "center",
  color: "#F6416C",
  "@media screen and (max-width:820px)": {
    fontSize: 20,
  },
}));
