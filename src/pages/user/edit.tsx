import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//MUI
import { styled } from "@mui/material/styles";
import { Button, Color } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import { InputColor } from "../../components/form/InputColor";
import Cookies from "universal-cookie";
import { UserType } from "../../types/UserType";
import { apiUrl } from "../../utils/values";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * ユーザ情報編集画面.
 */
const UserEdit: NextPage<Props> = ({ userData }) => {
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
  const [colorError, setColorError] = useState<string>("");

  //画像
  const [image, setImage] = useState<string>(userData.user.image);

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

    // if (nameError !== "" || mailError !== "" || roleError !== "") {
    //   return;
    // }

    const data = {
      familyID: "",
      name: name,
      image: image,
      mail: mail,
      password: "",
      role: role,
      color: color,
    };

    console.dir(JSON.stringify(data));
  }, [name, mail, image, role, color]);

  return (
    <>
      <PageLayout title="ユーザ情報編集">
        <Image src={`/${image}`} width={100} height={100} />

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

        <_Link>
          <Link href="/auth/password/">
            <a>パスワードの変更はこちら</a>
          </Link>
        </_Link>

        <div>
          <Button
            variant="contained"
            onClick={postUserData}
            endIcon={<SendIcon />}
            color="primary"
          >
            更新
          </Button>
        </div>
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

const _Link = styled("div")(() => ({
  marginTop: 30,
  marginBottom: 30,
}));
export default UserEdit;
