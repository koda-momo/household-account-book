import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";

//components, Types
import { PageLayout } from "../../components/layout/PageLayout";
import { FamilyList } from "../../components/user/FamilyList";
import { InfoTable } from "../../components/user/InfoTable";
import { UserType } from "../../types/UserType";

//MUI
import { styled } from "@mui/material/styles";
import { Avatar, Button } from "@mui/material";

//API
import Cookies from "universal-cookie";
import { apiUrl } from "../../utils/values";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * ユーザ情報.
 */
const UserInfo: NextPage<Props> = ({ userData }) => {
  const router = useRouter();
  const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE;

  /**
   * ページ遷移.
   */
  const gotoPage = useCallback((url: string) => {
    router.push(url);
  }, []);

  return (
    <>
      <PageLayout title="ユーザ情報">
        <_Flex>
          <Avatar
            alt="icon"
            src={firebaseUrl + userData.user.image}
            sx={{ width: 100, height: 100 }}
          />
        </_Flex>
        <_Name>{userData.user.name}</_Name>
        <_Flex>
          <_Table>
            <InfoTable userData={userData.user} />
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

          {userData.user.familyId !== "" ? (
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
        <FamilyList familyId={userData.user.familyId} />
      </_FamilyList>
    </>
  );
};

/**
 * SSRで初期データ取得.
 * @returns ユーザ情報初期表示用データ
 */
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = new Cookies(ctx.req.headers.cookie);
  const userId = cookies.get("userId");
  const userRes = await fetch(`${apiUrl}/getuser/${userId}`);
  const userData: UserType = await userRes.json();

  return {
    props: { userData },
  };
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
