import type { NextPage } from "next";
import { useCallback } from "react";

//components
import { PageLayout } from "../../components/layout/PageLayout";
import { FamilyList } from "../../components/user/FamilyList";
import { InfoTable } from "../../components/user/InfoTable";

//MUI
import { styled } from "@mui/material/styles";
import { Avatar, Button } from "@mui/material";
import { useRouter } from "next/router";

//API
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

/**
 * ユーザ情報.
 */
const UserInfo: NextPage = () => {
  const router = useRouter();

  const { data, error, mutate } = useSWR(
    "http://localhost:3000/getuser",
    fetcher
  );

  console.dir("データ" + JSON.stringify(data));
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // const data = {
  //   id: "abcdefg",
  //   image: "/book-tab-logo-face.jpg",
  //   familyID: "",
  //   name: "山田太郎",
  //   mail: "yamadataro-love-happy-yamada@mail.com",
  //   password: "yamayama",
  //   role: "父",
  // };

  /**
   * ページ遷移.
   */
  const gotoPage = useCallback((url: string) => {
    router.push(url);
  }, []);

  /**
   * ユーザ情報の取得
   */

  return (
    <>
      <PageLayout title="ユーザ情報">
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
            <_Btn
              variant="contained"
              color="primary"
              onClick={() => gotoPage("/user/edit/")}
            >
              ユーザ情報の編集
            </_Btn>
          </div>

          {data.familyID !== "" ? (
            <div>
              <_Btn variant="contained" color="primary" href="/group/edit/">
                グループ名の編集
              </_Btn>
            </div>
          ) : (
            <>
              <div>
                <_Btn
                  variant="contained"
                  color="primary"
                  onClick={() => gotoPage("/group/new/")}
                >
                  グループの新規登録
                </_Btn>
              </div>
              <div>
                <_Btn
                  variant="contained"
                  color="primary"
                  onClick={() => gotoPage("/group/link/")}
                >
                  グループに紐づけ
                </_Btn>
              </div>
            </>
          )}
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
