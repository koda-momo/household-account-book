import {
  FC,
  memo,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//components
import { InputColor } from "../form/InputColor";
import { InputText } from "../form/InputText";
import { SelectBox } from "../form/SelectBox";
import { PageLayout } from "../layout/PageLayout";

import { CategoryType } from "../../types/CategoryType";
import { apiUrl } from "../../utils/values";

//MUI
import styled from "@emotion/styled";
import { Icon, Button } from "@mui/material";

//others
import axios from "axios";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";

type Props = {
  mutate: KeyedMutator<any>;
  genre: string;
  setGenre: Dispatch<SetStateAction<string>>;
};

/**
 * カテゴリ追加.
 */
export const CategoryEdit: FC<Props> = memo(({ genre, setGenre, mutate }) => {
  const router = useRouter();

  //項目名
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  //色
  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState("");

  //アイコン
  const [icon, setIcon] = useState("");
  const [iconError, setIconError] = useState("");

  //ジャンル

  const [genreError, setGenreError] = useState("");

  /**
   * カテゴリデータ追加.
   */
  const postUserData = useCallback(async () => {
    //初期化
    let error = "";
    setNameError("");
    setColorError("");
    setIconError("");
    setGenreError("");

    //バリデーション
    if (name === "") {
      setNameError("項目名を入力して下さい。");
      error = "エラーあり";
    }

    if (color === "") {
      setColorError("色を入力して下さい。");
      error = "エラーあり";
    }

    if (icon === "") {
      setIconError("アイコンを入力して下さい。");
      error = "エラーあり";
    }

    if (genre === "") {
      setGenreError("ジャンルを入力して下さい。");
      error = "エラーあり";
    }

    if (error !== "") {
      return;
    }

    try {
      //登録データ
      const postData = {
        name: name,
        color: color,
        icon: icon,
        genre: genre,
      };

      //登録
      await axios.post(`${apiUrl}/category/add`, postData);
      toast.success(name + "を登録しました。");
      mutate();
    } catch (e) {
      toast.error("登録出来ませんでした。" + e);
    }
  }, [name, color, genre, icon, nameError, colorError, genreError, iconError]);

  return (
    <>
      <PageLayout title="カテゴリ追加">
        <Icon>{icon}</Icon>

        <_TextInput>
          <InputText
            label="アイコン(小文字)"
            value={icon}
            setWord={setIcon}
            errorItem={iconError}
          />
        </_TextInput>
        <Link href="https://mui.com/material-ui/material-icons/">
          <a target="_blank">※アイコン一覧</a>
        </Link>

        <_TextInput>
          <InputText
            label="名前"
            value={name}
            setWord={setName}
            errorItem={nameError}
          />
        </_TextInput>

        <_TextInput>
          <SelectBox
            label="ジャンル"
            value={genre}
            setWord={setGenre}
            errorItem={genreError}
            menuList={["収入", "支出", "その他"]}
          />
        </_TextInput>

        <_TextInput>
          <InputColor
            isSketch={true}
            label="色"
            value={color}
            setValue={setColor}
            errorItem={colorError}
          />
        </_TextInput>

        <_Flex>
          <Button variant="contained" onClick={postUserData} color="primary">
            追加
          </Button>
        </_Flex>
      </PageLayout>
    </>
  );
});

//テキストボックス1つ1つ
const _TextInput = styled("div")(() => ({
  marginBottom: 30,
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  flexWrap: "wrap",
}));
