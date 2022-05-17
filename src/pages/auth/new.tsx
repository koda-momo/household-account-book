import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { InputText } from "../../components/form/InputText";
import { PageTitle } from "../../components/layout/PageTitle";

//MUI
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { PageLayout } from "../../components/layout/PageLayout";

/**
 * ユーザ登録画面.
 */
const NewUser: NextPage = () => {
  //名前
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  //メールアドレス
  const [mail, setMail] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");

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
      setNameError("名前を入力して下さい。");
    }

    if (mail === "") {
      setMailError("メールアドレスを入力して下さい。");
    }

    if (password === "") {
      setPasswordError("パスワードを入力して下さい。");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "パスワードと確認用パスワードが一致していません。"
      );
    }
    if (
      nameError !== "" ||
      mailError !== "" ||
      passwordError !== "" ||
      confirmPasswordError !== ""
    ) {
      return;
    }

    const data = {
      familyID: "",
      name: name,
      mail: mail,
      password: password,
      role: "",
    };

    console.dir(JSON.stringify(data));
  }, []);

  return (
    <>
      <PageLayout title="会員登録">
        <_TextInput>
          <InputText
            label="名前"
            value={name}
            setWord={setName}
            errorItem={nameError}
          />
        </_TextInput>
        <_TextInput>
          <InputText
            label="メールアドレス"
            value={mail}
            setWord={setMail}
            errorItem={mailError}
          />
        </_TextInput>
        <_TextInput>
          <InputText
            label="パスワード"
            value={password}
            setWord={setPassword}
            errorItem={passwordError}
            type="password"
          />
        </_TextInput>
        <_TextInput>
          <InputText
            label="パスワード(確認用)"
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

export default NewUser;
