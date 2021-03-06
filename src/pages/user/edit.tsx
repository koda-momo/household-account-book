import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

//components
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import { InputColor } from "../../components/form/InputColor";
import { InputImage } from "../../components/form/InputImage";
import { useFirebaseImage } from "../../hooks/users/useFirebaseImage";
import { apiUrl } from "../../utils/values";
import { UserType } from "../../types/UserType";

//MUI
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//others
import Cookies from "universal-cookie";
import Cookie from "universal-cookie";
import axios from "axios";
import toast from "react-hot-toast";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * ユーザ情報編集画面.
 */
const UserEdit: NextPage<Props> = ({ userData }) => {
  const router = useRouter();
  //ユーザID
  const cookie = new Cookie();
  const userId = cookie.get("userId");
  //名前
  const [name, setName] = useState<string>(userData.user.name);
  const [nameError, setNameError] = useState<string>("");

  //メールアドレス
  const [mail, setMail] = useState<string>(userData.user.mail);
  const [mailError, setMailError] = useState<string>("");

  //役割
  const [role, setRole] = useState<string>(userData.user.role);
  const [roleError, setRoleError] = useState<string>("");

  //色
  const [color, setColor] = useState<string>(userData.user.color);
  const [colorError] = useState<string>("");

  //画像
  const [image, setImage] = useState(userData.user.image);
  const [imageError] = useState<string>("");

  //Firebaseに登録hooks
  const { deleteImage } = useFirebaseImage();

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
    setMailError("");
    setRoleError("");
    let error = "";

    if (name === "") {
      setNameError("名前を入力して下さい。");
      error = "エラーあり";
    }

    if (mail === "") {
      setMailError("メールアドレスを入力して下さい。");
      error = "エラーあり";
    }

    if (error !== "") {
      return;
    }

    //画像に変更があれば、Firebase内の元画像データを削除
    if (userData.user.image != "" && userData.user.image != image) {
      await deleteImage(userData.user.image);
    }

    const data = {
      familyID: "",
      name: name,
      image: image,
      mail: mail,
      password: "",
      role: role,
      color: color,
    };

    //DB更新作業
    try {
      await axios.post(`${apiUrl}/updateuser/${userId}`, data);
      toast.success("更新しました");
      router.push("/user");
    } catch (e) {
      toast.error("更新出来ませんでした。");
    }
  }, [
    name,
    mail,
    userData.user.image,
    image,
    role,
    color,
    deleteImage,
    userId,
    router,
  ]);

  return (
    <>
      <PageLayout title="ユーザ情報編集">
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
            label="グループでの役割"
            value={role}
            setWord={setRole}
            errorItem={roleError}
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

        {/* 後日実装 */}
        {/* <_Link>
          <Link href="/auth/password/">
            <a>パスワードの変更はこちら</a>
          </Link>
        </_Link> */}

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

//テキストボックス1つ1つ
const _TextInput = styled("div")(() => ({
  marginBottom: 30,
}));

// const _Link = styled("div")(() => ({
//   marginTop: 30,
//   marginBottom: 30,
// }));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
}));

export default UserEdit;
