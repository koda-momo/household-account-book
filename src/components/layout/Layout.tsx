import { FC, memo, ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import { useRouter } from "next/router";

//MUI
import { styled } from "@mui/material/styles";

import { useLoginChecker } from "../../hooks/useLoginChecker";

type Props = {
  children: ReactNode;
};

/**
 * 全体のレイアウト用コンポーネント.
 */
export const Layout: FC<Props> = memo(({ children }) => {
  //ログインしているか否か
  const [isLogin, setIsLogin] = useState(false);
  //ヘッダーを表示するか否か
  const [isHeader, setIsHeader] = useState(false);

  //ログインチェッカー
  const router = useRouter();
  const { loginChecker } = useLoginChecker(setIsLogin, setIsHeader);

  useEffect(() => {
    loginChecker(router.pathname);
  }, [loginChecker, router.pathname]);

  return (
    <>
      {isLogin ? (
        <>
          {isHeader ? (
            <>
              <Header />
              <_Main>{children}</_Main>
            </>
          ) : (
            <>
              <_NoHeader />
              {children}
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
});

//ヘッダーの関係で初期表示ヘッダー分下げる(スマホの場合は不要)
const _Main = styled("main")(() => ({
  paddingTop: 100,
  zIndex: 2,
  "@media screen and (max-width:820px)": {
    paddingTop: 0,
  },
}));

const _NoHeader = styled("div")(() => ({
  height: 10,
  "@media screen and (max-width:820px)": {
    height: 30,
  },
}));
