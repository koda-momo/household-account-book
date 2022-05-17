import type { NextPage } from "next";

//components
import { PageLayout } from "../../components/layout/PageLayout";

//MUI
import { styled } from "@mui/material/styles";
import { Avatar, Button } from "@mui/material";
import { FamilyList } from "../../components/user/FamilyList";
import { InfoTable } from "../../components/user/InfoTable";

/**
 * ユーザ情報.
 */
const UserInfo: NextPage = () => {
  const data = {
    id: "abcdefg",
    image: "/book-tab-logo-face.jpg",
    familyID: "familyId",
    name: "山田太郎",
    mail: "yamadataro-love-happy-yamada@mail.com",
    password: "yamayama",
    role: "父",
  };

  /**
   * ユーザ情報の取得
   */

  return (
    <>
      <PageLayout title="ユーザ情報" radius="3%">
        <_Flex>
          <Avatar
            alt="icon"
            src={data.image}
            sx={{ width: 100, height: 100 }}
          />
        </_Flex>
        <_Name>{data.name}</_Name>
        <_Flex>
          <_Table>
            <InfoTable data={data} />
          </_Table>
        </_Flex>

        <_BtnGroup>
          <div>
            <_Btn variant="contained" color="primary">
              ユーザ情報の編集
            </_Btn>
          </div>
          <div>
            <_Btn variant="contained" color="primary">
              グループ情報の登録・編集
            </_Btn>
          </div>
        </_BtnGroup>
      </PageLayout>
      <_FamilyList>
        <FamilyList id={data.familyID} />
      </_FamilyList>
    </>
  );
};

const _Name = styled("div")(() => ({
  fontSize: 30,
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 20,
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

const _Table = styled("div")(() => ({
  marginTop: 20,
  marginBottom: 20,
}));

//ボタン
const _Btn = styled(Button)(() => ({
  minWidth: 300,
}));

const _BtnGroup = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  gap: 10,
  flexDirection: "row",
  "@media screen and (max-width:600px)": {
    flexDirection: "column",
  },
}));

const _FamilyList = styled("div")(() => ({
  marginTop: 50,
}));

export default UserInfo;
