import { useState, useCallback } from "react";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

//MUI
import styled from "@emotion/styled";
import { Button, Icon } from "@mui/material";

//components
import { InputColor } from "../components/form/InputColor";
import { InputText } from "../components/form/InputText";
import { SelectBox } from "../components/form/SelectBox";
import { PageLayout } from "../components/layout/PageLayout";
import { PageTitle } from "../components/layout/PageTitle";
import { CategoryCardItem } from "../components/top/CategoryCardItem";
import { CategoryType } from "../types/CategoryType";
import { apiUrl } from "../utils/values";

//others
import toast from "react-hot-toast";
import axios from "axios";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 *  管理者用ページ.
 */
const AdminPage: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  const [categoryList] = useState<Array<CategoryType>>(data);

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
  const [genre, setGenre] = useState("");
  const [genreError, setGenreError] = useState("");

  /**
   * キャンセルボタン.
   */
  const cancel = useCallback(() => {
    router.back();
  }, []);

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
      setNameError("色を入力して下さい。");
      error = "エラーあり";
    }

    if (icon === "") {
      setNameError("アイコンを入力して下さい。");
      error = "エラーあり";
    }

    if (genre === "") {
      setNameError("ジャンルを入力して下さい。");
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
        // "color": "100, 100, 100",
        icon: icon,
        genre: genre,
      };

      console.dir("登録データ" + JSON.stringify(postData));

      //登録
      //   await axios.post(`${apiUrl}/category/add`, postData);
      toast.success(name + "を登録しました。");
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

          <Button variant="contained" onClick={cancel} color="error">
            キャンセル
          </Button>
        </_Flex>
      </PageLayout>

      <_CategoryList>
        <PageTitle title="登録済のデータ" />

        <_Flex>
          {categoryList.map((item) => (
            <div key={item.name}>
              <CategoryCardItem
                name={item.name}
                icon={item.icon}
                color={item.color}
              />
            </div>
          ))}
        </_Flex>
      </_CategoryList>
    </>
  );
};

/**
 * SSRで初期データ取得.
 * @returns ユーザ情報初期表示用データ
 */
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${apiUrl}/category`);
  const data = await res.json();

  //ジャンルでsort
  data.sort((a: CategoryType, b: CategoryType) => {
    if (a.genre > b.genre) {
      return -1;
    }
    if (a.genre < b.genre) {
      return 1;
    }
  });
  return {
    props: { data },
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

const _CategoryList = styled("div")(() => ({
  marginTop: 100,
  marginBottom: 100,
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
}));

export default AdminPage;
