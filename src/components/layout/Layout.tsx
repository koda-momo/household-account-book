import { FC, memo, ReactNode } from "react";
import { Header } from "./Header";

//MUI
import { styled } from "@mui/material/styles";

type Props = {
  children: ReactNode;
};

/**
 * 全体のレイアウト用コンポーネント.
 */
export const Layout: FC<Props> = memo(({ children }) => {
  return (
    <>
      <Header />
      <_Main>{children}</_Main>
    </>
  );
});

//ヘッダーの関係で初期表示ヘッダー分下げる
const _Main = styled("main")(() => ({
  paddingTop: 100,
}));
