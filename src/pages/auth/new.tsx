import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

//components
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import { InputColor } from "../../components/form/InputColor";
import { InputImage } from "../../components/form/InputImage";

//MUI
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//others
import axios from "axios";
import { apiUrl } from "../../utils/values";
import toast from "react-hot-toast";

/**
 * ユーザ登録画面.
 */
const NewUser: NextPage = () => {
  const router = useRouter();
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

  //色
  const [color, setColor] = useState<string>("");
  const [colorError, setColorError] = useState<string>("");

  //画像
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState<string>("");

  /**
   * DBにユーザ登録.
   */
  const postUserData = useCallback(async () => {
    //エラーの初期化
    let error = "";
    setNameError("");
    setMailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setColorError("");
    setImageError("");

    //バリデーション
    if (name === "") {
      setNameError("名前を入力して下さい。");
      error = "エラーあり";
    }

    if (mail === "") {
      setMailError("メールアドレスを入力して下さい。");
      error = "エラーあり";
    }

    if (password === "") {
      setPasswordError("パスワードを入力して下さい。");
      error = "エラーあり";
    }

    if (image === "") {
      setImageError("画像を選択して下さい。");
      error = "エラーあり";
    }

    if (color === "") {
      setColorError("色を選択して下さい。");
      error = "エラーあり";
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(
        "パスワードと確認用パスワードが一致していません。"
      );
      error = "エラーあり";
    }
    if (error !== "") {
      return;
    }

    // const loginData = {
    //   mail: mail,
    //   password: password,
    // };

    // const mailChack = await axios.post(`${apiUrl}/loginuser`, loginData);

    // if (mailChack) {
    //   toast.error("登録済のアドレス、パスワードです。");
    //   return;
    // }

    const data = {
      familyID: "",
      name: name,
      mail: mail,
      password: password,
      role: "",
      color: color,
      image: image,
    };

    await axios.post(`${apiUrl}/newuser`, data);
    toast.success("ユーザを登録しました。");
    router.push("/auth/login");
  }, [name, mail, password, color, confirmPassword, image, router]);

  return (
    <>
      <PageLayout title="会員登録">
        <_TextInput>
          <InputImage
            image={image}
            setImage={setImage}
            errorItem={imageError}
          />
        </_TextInput>

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

        <_TextInput>
          <InputColor
            label="ユーザカラー"
            value={color}
            setValue={setColor}
            errorItem={colorError}
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

      <_Link>
        <Link href="/auth/login">
          <a>ログイン画面に戻る</a>
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

export default NewUser;
