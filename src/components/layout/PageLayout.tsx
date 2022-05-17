import { FC, memo, ReactNode } from "react";
import { PageTitle } from "./PageTitle";

//MUI
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  children: ReactNode; //四角の中に入れる内容
  title: string; //ページタイトル
};
export const PageLayout: FC<Props> = memo(({ children, title }) => {
  return (
    <>
      <PageTitle title={title} />
      <_Main>
        <_BgBox>{children}</_BgBox>
      </_Main>
    </>
  );
});

//全体
const _Main = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

//背景の四角
const _BgBox = styled(Box)(() => ({
  backgroundColor: "white",
  textAlign: "center",
  padding: "30px 40px 40px 40px",
  minWidth: "60%",
  marginBottom: 20,
  boxShadow: "10px 5px 5px gray",
  borderRadius: "10%",
}));
