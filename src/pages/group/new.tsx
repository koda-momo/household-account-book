import { useState, useCallback } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

//MUI
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

//components
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import { apiUrl } from "../../utils/values";

//others
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "universal-cookie";

/**
 * 家族新規登録.
 */
const NewFamily: NextPage = () => {
  const cookie = new Cookie();
  const userId = cookie.get("userId");
  const router = useRouter();

  //名前
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  //合言葉
  const [secretWord, setSecretWord] = useState<string>("");
  const [secretWordError, setScretWordError] = useState<string>("");

  //パスワード
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  //確認用パスワード
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  /**
   * DBにユーザ登録.
   */
  const postUserData = useCallback(async () => {
    //エラー値初期化
    setNameError("");
    setPasswordError("");
    setScretWordError("");
    setConfirmPasswordError("");
    let error = "";

    if (name === "") {
      setNameError("グループ名を入力して下さい。");
      error = "エラーあり";
    }

    if (secretWord === "") {
      setScretWordError("合言葉を入力して下さい。");
      error = "エラーあり";
    }

    if (password === "") {
      setPasswordError("パスワードを入力して下さい。");
      error = "エラーあり";
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("パスワードと異なっています。");
      error = "エラーあり";
    }
    if (error !== "") {
      return;
    }

    //送るデータ作成
    const postData = {
      userId: userId,
      name: name,
      secretWord: secretWord,
      password: password,
    };

    try {
      await axios.post(`${apiUrl}/addfamily`, postData);
      toast.success(name + "を登録しました。");
      router.push("/user/");
    } catch (e) {
      toast.error("登録に失敗しました。" + e);
    }
  }, [
    name,
    password,
    confirmPassword,
    secretWord,
    nameError,
    passwordError,
    confirmPasswordError,
    secretWordError,
  ]);

  return (
    <>
      <PageLayout title="グループ新規登録">
        <_TextInput>
          <InputText
            label="グループ名"
            value={name}
            setWord={setName}
            errorItem={nameError}
          />
        </_TextInput>

        <_TextInput>
          <InputText
            label="グループの合言葉"
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
            type="password"
          />
        </_TextInput>

        <_TextInput>
          <InputText
            label="グループのパスワード(確認用)"
            value={confirmPassword}
            setWord={setConfirmPassword}
            errorItem={confirmPasswordError}
            type="password"
          />
        </_TextInput>

        <div>
          <Button
            variant="contained"
            onClick={postUserData}
            endIcon={<SendIcon />}
            color="primary"
          >
            登録
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

export default NewFamily;
