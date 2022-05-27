import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";

//components
import { PageLayout } from "../../components/layout/PageLayout";
import { InputText } from "../../components/form/InputText";
import { GetFamilyType } from "../../types/UserType";

//MUI
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

//others
import axios from "axios";
import Cookie from "universal-cookie";
import { apiUrl } from "../../utils/values";
import { toast } from "react-hot-toast";

/**
 * 既にある家族情報に紐づけ.
 */
const LinkFamily: NextPage = () => {
  const cookie = new Cookie();
  const router = useRouter();
  const userId = cookie.get("userId");

  //合言葉
  const [secretWord, setSecretWord] = useState<string>("");
  const [secretWordError, setScretWordError] = useState<string>("");

  //グループパスワード
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  //役割
  const [role, setRole] = useState<string>("");
  const [roleError, setRoleError] = useState<string>("");

  /**
   * DBにユーザ登録.
   */
  const postUserData = useCallback(async () => {
    //エラーの初期化
    setScretWordError("");
    setPasswordError("");
    setRoleError("");
    let error = "";

    //バリデーション
    if (secretWord === "") {
      error = "エラーあり";
      setScretWordError("名前を入力して下さい。");
    }

    if (password === "") {
      error = "エラーあり";
      setPasswordError("パスワードを入力して下さい。");
    }

    if (role === "") {
      error = "エラーあり";
      setRoleError("役割を入力して下さい。");
    }

    if (error !== "") {
      return;
    }

    try {
      //家族データにユーザを紐づけ
      const data: {
        data: GetFamilyType;
      } = await axios.post(`${apiUrl}/updatefamily/link`, {
        secretWord: secretWord,
        password: password,
        userId: userId,
      });

      //ユーザの現在の情報取得
      const userData = await axios.get(`${apiUrl}/getuser/${userId}`);
      const userItem = userData.data.user;

      //送るユーザデータ作成(役割の変更のみ)
      const postUserData = {
        name: userItem.name,
        mail: userItem.mail,
        password: userItem.pasword,
        image: userItem.image,
        familyId: userItem.familyId,
        role: role,
      };

      //ユーザ情報変更
      await axios.post(`${apiUrl}/updateuser/${userId}`, postUserData);

      const message = data.data.message;
      toast.success(message);

      router.push("/user/");
    } catch (e) {
      toast.error("紐づけに失敗しました。");
    }
  }, [secretWord, password, role]);

  return (
    <>
      <PageLayout title="既にグループがある場合はこちらから紐づけ">
        <_TextInput>
          <InputText
            label="合言葉"
            value={secretWord}
            setWord={setSecretWord}
            errorItem={secretWordError}
          />
        </_TextInput>

        <_TextInput>
          <InputText
            label="グループのパスワード"
            value={password}
            setWord={setPassword}
            errorItem={passwordError}
          />
        </_TextInput>

        <_TextInput>
          <InputText
            label="登録する役割"
            value={role}
            setWord={setRole}
            errorItem={roleError}
          />
        </_TextInput>

        <div>
          <Button
            variant="contained"
            onClick={postUserData}
            endIcon={<SendIcon />}
            color="primary"
          >
            グループに登録する
          </Button>
        </div>
      </PageLayout>
    </>
  );
};

//テキストボックス1つ1つ
const _TextInput = styled("div")(() => ({
  marginBottom: 30,
}));

export default LinkFamily;
