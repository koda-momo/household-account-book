import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";

//compoents
import { PageTitle } from "../../../components/layout/PageTitle";

//MUI
import styled from "@emotion/styled";
import { Button, Card, CardContent } from "@mui/material";

import Cookie from "universal-cookie";
import { toast } from "react-hot-toast";

/**
 * 削除画面.
 */
const DeleteData: NextPage = () => {
  const router = useRouter();

  /**
   * 削除.
   */
  const dataDelete = useCallback(() => {
    toast.success("削除しました。");
    router.push("/top/");
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
            <PageTitle title="削除しますか？" />
            <_Flex>
              <Button variant="contained" color="primary" onClick={dataDelete}>
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

export default DeleteData;
