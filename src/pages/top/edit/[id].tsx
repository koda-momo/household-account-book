import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

//MUI
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//components
import { PageLayout } from "../../../components/layout/PageLayout";
import { InputText } from "../../../components/form/InputText";
import { InputNumber } from "../../../components/form/InputNumber";
import { InputDate } from "../../../components/form/InputDate";
import { CategorySelect } from "../../../components/top/CategorySelect";
import { apiUrl } from "../../../utils/values";

//others
import { toast } from "react-hot-toast";
import { addYears } from "date-fns";
import axios from "axios";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * 編集ページ.
 */
const EditData: NextPage<Props> = ({ listData }) => {
  //URLからID取得
  const router = useRouter();
  const [itemId] = useState(router.query.id);

  const listItem = listData.spItem ? listData.spItem : listData.icItem;

  //取得したデータが収入なのか、支出なのか判断
  const inOutData = listData.spItem ? "支出" : "収入";

  //最小の年月設定
  const dateYear = new Date().getFullYear();
  const minDate = Number(addYears(new Date(dateYear, 1 - 1, 1), -10));

  //最大の年月設定
  const maxDate = Number(addYears(new Date(dateYear, 1 - 1, 1), 10));

  //収支
  const [inOut] = useState<string>(inOutData);

  //項目名
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  //価格
  const [price, setPrice] = useState<number>(0);
  const [priceError, setPriceError] = useState<string>("");

  //日にち
  const [date, setDate] = useState<number | null>(0);
  const [dateError, setDateError] = useState<string>("");

  //カテゴリ
  const [category, setCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");

  /**
   * 初期値の設定.
   */
  useEffect(() => {
    setName(listItem.name);
    setPrice(listItem.howmatch);
    setCategory(listData.categoryName);
    setDate(Number(new Date(listItem.createdAt)));
  }, [
    listData.categoryName,
    listItem.createdAt,
    listItem.howmatch,
    listItem.name,
  ]);

  /**
   * キャンセル.
   */
  const cancel = useCallback(() => {
    router.back();
  }, [router]);

  /**
   * 収支データ新規登録.
   */
  const postData = useCallback(() => {
    //エラー初期化
    setNameError("");
    setPriceError("");
    setDateError("");
    setCategoryError("");
    let error = "";

    if (name === "") {
      setNameError("名前を入力して下さい。");
      error = "エラーあり";
    }

    if (Number(price) <= 0) {
      setPriceError("価格は1円以上で入力して下さい。");
      error = "エラーあり";
    }

    if (date != null) {
      if (date < minDate || date > maxDate) {
        setDateError("日付は今日の日付から10年前後で設定して下さい。");
        error = "エラーあり";
      }
    }

    const postDate = date ? new Date(date) : new Date(9999, 12, 31);
    if (postDate.getFullYear() == 9999) {
      setDateError("日付エラーが発生しました。");
      error = "エラーあり";
    }

    if (category === "") {
      setCategoryError("カテゴリを選択して下さい。");
      error = "エラーあり";
    }

    if (error !== "") {
      return;
    }

    const postData = {
      name: name,
      howmatch: price,
      date: new Date(postDate),
      categoryName: category,
    };

    const url =
      inOut === "支出"
        ? `${apiUrl}/updatespitem/${itemId}`
        : `${apiUrl}/updateicitem/${itemId}`;

    try {
      axios.post(url, postData);
      toast.success("データを更新しました。");
      router.back();
    } catch (e) {
      toast.error("更新に失敗しました。");
    }
  }, [name, price, date, category, inOut, itemId, minDate, maxDate, router]);

  return (
    <>
      <PageLayout title={`${inOut}データ編集`}>
        <_TextInput>
          <InputText
            label="項目名"
            value={name}
            setWord={setName}
            errorItem={nameError}
          />
        </_TextInput>

        <_TextInput>
          <InputNumber
            label="価格"
            value={price}
            setNumber={setPrice}
            errorItem={priceError}
          />
        </_TextInput>

        <_TextInput>
          <InputDate
            label="日付"
            value={date}
            setDate={setDate}
            errorItem={dateError}
          />
        </_TextInput>

        <_TextInput>
          <CategorySelect
            setCategory={setCategory}
            category={category}
            categoryError={categoryError}
            genre={inOut}
          />
        </_TextInput>

        <_TextInput />
        <_Flex>
          <Button
            variant="contained"
            onClick={postData}
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
 * SSRでカテゴリデータ取得.
 * @returns ユーザ情報初期表示用データ
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //クエリからID取得
  const itemId = ctx.query.id;

  //支出データ取得
  const spendingRes = await fetch(`${apiUrl}/getspitem/${itemId}`);
  const spendingList = spendingRes ? await spendingRes.json() : "";

  //収入データ取得
  const incomeRes = await fetch(`${apiUrl}/geticitem/${itemId}`);
  const incomeList = incomeRes ? await incomeRes.json() : "";

  const listData = spendingList.spItem ? spendingList : incomeList;

  return {
    props: { listData },
  };
};

//テキストボックス1つ1つ
const _TextInput = styled("div")(() => ({
  marginBottom: 30,
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 30,
}));

export default EditData;
