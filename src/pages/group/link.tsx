import type { NextPage } from "next";
import { PageLayout } from "../../components/layout/PageLayout";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState, useCallback } from "react";
import { InputText } from "../../components/form/InputText";

/**
 * 既にある家族情報に紐づけ.
 */
const LinkFamily: NextPage = () => {
  //合言葉
  const [secretWord, setSecretWord] = useState<string>("");
  const [secretWordError, setScretWordError] = useState<string>("");

  //グループパスワード
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  /**
   * DBにユーザ登録.
   */
  const postUserData = useCallback(() => {
    if (secretWord === "") {
      setScretWordError("名前を入力して下さい。");
    }

    if (password === "") {
      setPasswordError("パスワードを入力して下さい。");
    }

    if (secretWordError !== "" || passwordError !== "") {
      return;
    }
  }, []);

  return (
    <>
      <PageLayout title="既にグループがある場合はこちらから紐づけ">
        <_TextInput>
          <InputText
            label="合言葉"
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
        <div>
          <Button
            variant="contained"
            onClick={postUserData}
            endIcon={<SearchIcon />}
            color="primary"
          >
            検索
          </Button>
        </div>
        グループ名:山田家
        <div>
          <Button
            variant="contained"
            onClick={postUserData}
            endIcon={<SendIcon />}
            color="primary"
          >
            このグループに登録する
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

export default LinkFamily;
