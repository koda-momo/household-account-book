import styled from "@emotion/styled";
import { Button } from "@mui/material";
import type { NextPage } from "next";
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import { PageTitle } from "../../components/layout/PageTitle";

import SendIcon from "@mui/icons-material/Send";
import { useState, useCallback } from "react";

/**
 * 家族情報編集.
 */
const FamilyEdit: NextPage = () => {
  /**
   * 家族情報の取得.
   */

  const familyMember = [];

  // const familyMember = [
  //   {
  //     id: "00000",
  //     image: "/book-tab-logo-face.jpg",
  //     familyID: "1234567890",
  //     name: "山田千代子",
  //     mail: "yamada@mail.com",
  //     password: "yamayama",
  //     role: "母",
  //   },
  //   {
  //     id: "11111",
  //     image: "/book-tab-logo-face.jpg",
  //     familyID: "1234567890",
  //     name: "山田花子",
  //     mail: "yamada@mail.com",
  //     password: "yamayama",
  //     role: "娘",
  //   },
  //   {
  //     id: "22222",
  //     image: "/book-tab-logo-face.jpg",
  //     familyID: "1234567890",
  //     name: "山田五郎",
  //     mail: "yamada@mail.com",
  //     password: "yamayama",
  //     role: "息子",
  //   },
  //   {
  //     id: "33333",
  //     image: "/book-tab-logo-face.jpg",
  //     familyID: "1234567890",
  //     name: "山田千代子",
  //     mail: "yamada@mail.com",
  //     password: "yamayama",
  //     role: "母",
  //   },
  //   {
  //     id: "4444",
  //     image: "/book-tab-logo-face.jpg",
  //     familyID: "1234567890",
  //     name: "山田花子",
  //     mail: "yamada@mail.com",
  //     password: "yamayama",
  //     role: "娘",
  //   },
  //   {
  //     id: "55555",
  //     image: "/book-tab-logo-face.jpg",
  //     familyID: "1234567890",
  //     name: "山田五郎",
  //     mail: "yamada@mail.com",
  //     password: "yamayama",
  //     role: "息子",
  //   },
  // ];

  //名前
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  /**
   * DBにユーザ登録.
   */
  const postUserData = useCallback(() => {
    if (name === "") {
      setNameError("グループ名を入力して下さい。");
    }

    if (nameError !== "") {
      return;
    }
  }, []);

  return (
    <>
      <PageLayout title="グループ名編集">
        <_TextInput>
          <InputText
            label="名前"
            value={name}
            setWord={setName}
            errorItem={nameError}
          />
        </_TextInput>

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
export default FamilyEdit;
