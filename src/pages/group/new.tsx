import styled from "@emotion/styled";
import { Button } from "@mui/material";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import SendIcon from "@mui/icons-material/Send";

/**
 * 家族新規登録.
 */
const NewFamily: NextPage = () => {
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
  const postUserData = useCallback(() => {
    if (name === "") {
      setNameError("グループ名を入力して下さい。");
    }

    if (secretWord === "") {
      setScretWordError("合言葉を入力して下さい。");
    }

    if (password === "") {
      setPasswordError("パスワードを入力して下さい。");
    }

    if (password === confirmPassword) {
      setConfirmPasswordError("パスワードと異なっています。");
    }
    if (
      nameError !== "" ||
      passwordError !== "" ||
      secretWordError !== "" ||
      confirmPasswordError !== ""
    ) {
      return;
    }
  }, []);

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
          />
        </_TextInput>

        <_TextInput>
          <InputText
            label="グループのパスワード(確認用)"
            value={confirmPassword}
            setWord={setConfirmPassword}
            errorItem={confirmPasswordError}
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
