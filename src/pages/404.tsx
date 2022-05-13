import { NextPage } from "next";

//MUI
import { styled } from "@mui/material/styles";
import ErrorIcon from "@mui/icons-material/Error";

/**
 * 404ページ.
 * @returns 存在しないURL/削除済投稿が叩かれた際に開く
 */
const NotFound: NextPage = () => {
  return (
    <_All>
      <_Title>404 This page could not be found.</_Title>

      <_NoPage>
        <ErrorIcon />
        ページが見つかりません
      </_NoPage>

      <_MarginTop>下記の可能性があります</_MarginTop>
      <_ListUl>
        <li>存在しないURL</li>
        <li>情報が削除された</li>
        <li>情報が存在しない</li>
      </_ListUl>

      <_MarginTop>
        解決策:ヘッダーのメニューからページに飛んでください。
      </_MarginTop>
    </_All>
  );
};

const _All = styled("div")(() => ({
  marginLeft: 48,
  color: "gray",
}));

const _Title = styled("div")(() => ({
  fontSize: 30,
}));

const _MarginTop = styled("div")(() => ({
  marginTop: 40,
}));

const _ListUl = styled("div")(() => ({
  marginLeft: 10,
}));

const _NoPage = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 3,
  marginTop: 3,
}));

export default NotFound;
