import { Button, Card, CardContent } from "@mui/material";
import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import SendIcon from "@mui/icons-material/Send";
import { PageTitle } from "../../components/layout/PageTitle";
import { useRouter } from "next/router";

/**
 * ログアウト画面.
 */
const Logout: NextPage = () => {
  const router = useRouter();

  /**
   * ログアウト.
   */
  const logout = useCallback(() => {
    alert("ログアウトしました");
  }, []);

  /**
   * 前のページに戻る.
   */
  const goBack = useCallback(() => {
    router.back();
  }, []);

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
