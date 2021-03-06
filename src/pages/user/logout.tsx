import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";

//compoents
import { PageTitle } from "../../components/layout/PageTitle";

//MUI
import styled from "@emotion/styled";
import { Button, Card, CardContent } from "@mui/material";

//others
import Cookie from "universal-cookie";
import { toast } from "react-hot-toast";

/**
 * ログアウト画面.
 */
const Logout: NextPage = () => {
  const router = useRouter();

  /**
   * ログアウト.
   */
  const logout = useCallback(async () => {
    const cookie = new Cookie();
    cookie.remove("userId", { path: "/" });
    await router.push("/auth/login/");
    toast.success("ログアウトしました。");
  }, [router]);

  /**
   * 前のページに戻る.
   */
  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <_Flex>
      <_Main>
        <Card>
          <CardContent>
            <PageTitle title="ログアウトしますか？" />
            <_Flex>
              <Button variant="contained" color="primary" onClick={logout}>
                はい
              </Button>
              <Button variant="contained" color="error" onClick={goBack}>
                いいえ
              </Button>
            </_Flex>
          </CardContent>
        </Card>
      </_Main>
    </_Flex>
  );
};

const _Flex = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
}));

const _Main = styled("div")(() => ({
  width: "80%",
}));

export default Logout;
