import type { NextPage } from "next";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";

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
  const cookie = new Cookie();
  const router = useRouter();

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
    let error = "";

    //バリデーション
    if (mail === "") {
      error = "エラーあり";
      setMailError("メールを入力して下さい。");
    }

    if (password === "") {
      error = "エラーあり";
      setPasswordError("パスワードを入力して下さい。");
    }

    if (error !== "") {
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

      //もし管理者アカウントだったらadminに遷移
      if (loginData.data.user === process.env.NEXT_PUBLIC_ADMIN) {
        cookie.set("userId", loginData.data.user, { path: "/" });
        toast.success("管理者でログインしました。");
        router.push("/admin/");

        //普通のユーザはIDをcookieに登録
      } else if (loginData.data.user) {
        cookie.set("userId", loginData.data.user, { path: "/" });
        toast.success("ログインしました。");
        router.push("/top/");
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
            type="password"
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

      <_Link>
        <Link href="/auth/new">
          <a>新規登録はこちら</a>
        </Link>
      </_Link>
    </>
  );
};

//テキストボックス1つ1つ
const _TextInput = styled("div")(() => ({
  marginBottom: 30,
}));

const _Link = styled("div")(() => ({
  textAlign: "center",
  marginTop: 30,
  marginBottom: 30,
}));

export default Login;
