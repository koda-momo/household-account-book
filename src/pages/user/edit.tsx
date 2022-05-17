import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";

//MUI
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";

/**
 * ユーザ情報編集画面.
 */
const UserEdit: NextPage = () => {
  //名前
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  //メールアドレス
  const [mail, setMail] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");

  //役割
  const [role, setRole] = useState<string>("");
  const [roleError, setRoleError] = useState<string>("");

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

    if (role === "") {
      setRoleError("役割を入力して下さい。");
    }

    if (nameError !== "" || mailError !== "" || roleError !== "") {
      return;
    }

    const data = {
      familyID: "",
      name: name,
      mail: mail,
      password: "",
      role: role,
    };

    console.dir(JSON.stringify(data));
  }, []);

  return (
    <>
      <PageLayout title="ユーザ情報編集">
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
            label="グループでの役割(個人利用の場合は「個人」と入力)"
            value={role}
            setWord={setRole}
            errorItem={roleError}
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

//テキストボックス1つ1つ
const _TextInput = styled("div")(() => ({
  marginBottom: 30,
}));

const _Link = styled("div")(() => ({
  marginTop: 30,
  marginBottom: 30,
}));
export default UserEdit;
