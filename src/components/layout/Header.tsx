import { FC, memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//MUI
import { styled } from "@mui/material/styles";

//components
import { HamburgerMenu } from "../layout/HamburgerMenu";
import { menuItemType } from "../../types/OtherType";

/**
 * ヘッダーコンポーネント.
 */
export const Header: FC = memo(() => {
  //メニューの項目
  const [menuItem] = useState<Array<menuItemType>>([
    {
      name: "TOP",
      path: "/top/",
    },
    {
      name: "REGISTER",
      path: "/top/add",
    },
    {
      name: "USER INFO",
      path: "/user/",
    },
    {
      name: "LOGOUT",
      path: "/user/logout/",
    },
  ]);

  return (
    <_Header className="header">
      <_HeaderIcon>
        <Link href="/top/">
          <a>
            <_FlexA>
              <Image
                src="/images/yarukizero-usagi.png"
                width={100}
                height={100}
                alt="header-icon"
              />
              <Image
                src="/images/header.png"
                width={100}
                height={50}
                alt="header-title"
              />
            </_FlexA>
          </a>
        </Link>
      </_HeaderIcon>

      <_Phone>
        <HamburgerMenu menuItem={menuItem} />
      </_Phone>

      <_Pc>
        <_HeaderMenu>
          <_List>
            {menuItem.map((item, i) => (
              <Link href={item.path} key={i}>
                <a>
                  <li>{item.name}</li>
                </a>
              </Link>
            ))}
          </_List>
        </_HeaderMenu>
      </_Pc>
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
  "@media screen and (max-width:600px)": {
    position: "static",
  },
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

//PCのみで表示
const _Pc = styled("div")(() => ({
  display: "block",
  "@media screen and (max-width:600px)": {
    display: "none",
  },
}));

//hamburger
const _Phone = styled("div")(() => ({
  display: "none",
  "@media screen and (max-width:600px)": {
    display: "block",
    marginRight: 10,
  },
}));

const _FlexA = styled("a")(() => ({
  display: "flex",
  alignItems: "center",
  fontSize: 30,
  color: "#5a5a5a",
  textShadow: "1px 2px 3px #808080;",
  ":hover": { cursor: "pointer" },
  "@media screen and (max-width:600px)": {
    width: 150,
    height: 20,
  },
}));
