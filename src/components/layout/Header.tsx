import { FC, memo } from "react";
import Link from "next/link";

//MUI
import { styled } from "@mui/material/styles";

/**
 * ヘッダーコンポーネント.
 */
export const Header: FC = memo(() => {
  return (
    <_Header className="header">
      <_HeaderIcon>
        <Link href={`/top/`}>
          <a>ヘッダー</a>
        </Link>
      </_HeaderIcon>
      <_HeaderMenu>
        <_List>
          <Link href="/user/">
            <a>
              <li>USER INFO</li>
            </a>
          </Link>
          <Link href="/user/logout/">
            <a>
              <li>LOGOUT</li>
            </a>
          </Link>
        </_List>
      </_HeaderMenu>
    </_Header>
  );
});

//ヘッダー全体
const _Header = styled("header")(() => ({
  width: "100%",
  height: 100,
  display: "flex",
  alignItems: "center",
  position: "fixed",
  top: 0,
  zIndex: 0,
}));

//ヘッダーのアイコン
const _HeaderIcon = styled("div")(() => ({
  marginLeft: 10,
  flexGrow: 2,
}));

//ヘッダーのメニュー
const _HeaderMenu = styled("div")(() => ({
  marginRight: 30,
}));

//ヘッダーのメニューリスト
const _List = styled("ul")(() => ({
  display: "flex",
  listStyle: "none",
  gap: 50,
}));
