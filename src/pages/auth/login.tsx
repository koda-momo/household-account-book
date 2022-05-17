import { Button } from "@mui/material";
import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import SendIcon from "@mui/icons-material/Send";

/**
 * ログイン画面.
 */
const Login: NextPage = () => {
  //メールアドレス
  const [mail, setMail] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");

  //パスワード
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  /**
   * ログイン.
   */
  const postUserData = useCallback(() => {
    if (mail === "") {
      setMailError("メールを入力して下さい。");
    }

    if (password === "") {
      setPasswordError("パスワードを入力して下さい。");
    }

    if (mailError !== "" || passwordError !== "") {
      return;
    }
  }, []);

  return (
    <>
      <PageLayout title="ログイン">
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
          />
        </_TextInput>

        <div>
          <Button
            variant="contained"
            onClick={postUserData}
            endIcon={<SendIcon />}
            color="primary"
          >
            ログイン
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

export default Login;
