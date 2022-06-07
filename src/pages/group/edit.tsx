import { useRouter } from "next/router";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState, useCallback } from "react";

//MUI
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

//components
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import { apiUrl } from "../../utils/values";
import { FamilyType } from "../../types/UserType";

//others
import Cookies from "universal-cookie";
import axios from "axios";
import toast from "react-hot-toast";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * 家族情報編集.
 */
const FamilyEdit: NextPage<Props> = ({ familyData }) => {
  const router = useRouter();
  //家族情報
  const familyItem: FamilyType = familyData.family;

  //名前
  const [name, setName] = useState<string>(familyItem.name);
  const [nameError, setNameError] = useState<string>("");

  /**
   * キャンセルボタン.
   */
  const cancel = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * DBにユーザ登録.
   */
  const postUserData = useCallback(async () => {
    //初期化
    setNameError("");
    let error = "";

    if (name === "") {
      setNameError("グループ名を入力して下さい。");
      error = "エラーあり";
    }

    if (error !== "") {
      return;
    }

    try {
      await axios.post(`${apiUrl}/updatefamily/${familyItem._id}`, {
        name: name,
      });
      toast.success("登録しました。");
      router.push("/user/");
    } catch (e) {
      toast.error("更新出来ませんでした。" + e);
    }
  }, [familyItem._id, name, router]);

  return (
    <>
      <PageLayout title="グループ名編集">
        <_TextInput>
          <InputText
            label="名前"
            value={name}
            setWord={setName}
            errorItem={nameError}
          />
        </_TextInput>

        <_Flex>
          <Button
            variant="contained"
            onClick={postUserData}
            endIcon={<SendIcon />}
            color="primary"
          >
            更新
          </Button>
          <Button variant="contained" onClick={cancel} color="error">
            キャンセル
          </Button>
        </_Flex>
      </PageLayout>
    </>
  );
};

/**
 * SSRで初期データ取得.
 * @returns 家族情報データ
 */
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = new Cookies(ctx.req.headers.cookie);
  const userId = cookies.get("userId");
  const userRes = await fetch(`${apiUrl}/getuser/${userId}`);
  const userData = await userRes.json();

  const familyRes = await fetch(
    `${apiUrl}/getfamily/${userData.user.familyId}`
  );

  const familyData = await familyRes.json();

  return {
    props: { familyData },
  };
};

//テキストボックス1つ1つ
const _TextInput = styled("div")(() => ({
  marginBottom: 30,
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
}));

export default FamilyEdit;
