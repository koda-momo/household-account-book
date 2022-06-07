import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//MUI
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

//others
import Cookies from "universal-cookie";
import { UserType } from "../types/UserType";
import { apiUrl } from "../utils/values";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * スタートアップページ.
 */
const StartPage: NextPage<Props> = ({ userData }) => {
  const [userName] = useState(userData.user.name);
  const router = useRouter();

  /**
   * トップページへ.
   */
  const goToTop = useCallback(() => {
    router.push("/top/");
  }, [router]);

  return (
    <>
      <_Flex>
        <_Image>
          <Image
            src="/images/toragao.png"
            width={250}
            height={250}
            alt="tiger-face"
          />
        </_Image>
        <_Greeting>
          <div>おはよう、{userName}</div>
          <div>今日もよき1日を</div>
        </_Greeting>
      </_Flex>

      <_Button>
        <Button variant="contained" onClick={goToTop} color="primary">
          家計簿トップページへ
        </Button>
      </_Button>
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

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  "@media screen and (max-width:600px)": {
    gap: 0,
  },
}));

const _Image = styled("div")(() => ({
  "@media screen and (max-width:600px)": {
    width: 150,
    height: 150,
  },
}));

const _Greeting = styled("div")(() => ({
  fontSize: 20,
  "@media screen and (max-width:600px)": {
    width: "50%",
    fontSize: 15,
  },
}));

const _Button = styled("div")(() => ({
  textAlign: "center",
  marginTop: 10,
}));

export default StartPage;
