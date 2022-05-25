import type { NextPage } from "next";
import { useState, useCallback } from "react";

//components
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";

//MUI
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//Other
import Cookie from "universal-cookie";
import axios from "axios";
import { apiUrl } from "../../utils/values";
import { toast } from "react-hot-toast";

/**
 * ログイン画面.
 */
const Login: NextPage = () => {
  //Cookie
  const cookie = new Cookie();

  //メールアドレス
  const [mail, setMail] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");

  //パスワード
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  /**
   * ログイン.
   */
  const login = useCallback(async () => {
    //エラーリセット
    setMailError("");
    setPasswordError("");

    //バリデーション
    if (mail === "") {
      setMailError("メールを入力して下さい。");
    }

    if (password === "") {
      setPasswordError("パスワードを入力して下さい。");
    }

    if (mailError !== "" || passwordError !== "") {
      return;
    }

    //ログインAPI
    try {
      const loginData: {
        data: { status: string; message: string; user: string };
      } = await axios.post(`${apiUrl}/loginuser`, {
        mail: mail,
        password: password,
      });
      toast.success("ログインしました。");
      if (loginData.data.user) {
        cookie.set("userId", loginData.data.user);
      }
    } catch (e) {
      toast.error("ログイン出来ませんでした");
    }
  }, [mail, password]);

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
            onClick={login}
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
