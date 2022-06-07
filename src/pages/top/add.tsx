import type { NextPage } from "next";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";

//MUI
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

//components
import { InputText } from "../../components/form/InputText";
import { PageLayout } from "../../components/layout/PageLayout";
import { SelectBox } from "../../components/form/SelectBox";
import { InputNumber } from "../../components/form/InputNumber";
import { InputDate } from "../../components/form/InputDate";
import { CategorySelect } from "../../components/top/CategorySelect";
import { apiUrl } from "../../utils/values";

//others
import axios from "axios";
import Cookie from "universal-cookie";
import { toast } from "react-hot-toast";
import { addYears } from "date-fns";

/**
 * 収支新規登録画面.
 */
const AddData: NextPage = () => {
  const router = useRouter();
  const cookie = new Cookie();
  const userId = cookie.get("userId");

  //最小の年月設定
  const dateYear = new Date().getFullYear();
  const minDate = Number(addYears(new Date(dateYear, 1 - 1, 1), -10));

  //最大の年月設定
  const maxDate = Number(addYears(new Date(dateYear, 1 - 1, 1), 10));

  //収支
  const [inOut, setInOut] = useState<string>("");
  const [inOutError, setInOutError] = useState<string>("");

  //項目名
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");

  //価格
  const [price, setPrice] = useState<number>(0);
  const [priceError, setPriceError] = useState<string>("");

  //日にち
  const [date, setDate] = useState<number | null>(Number(new Date()));
  const [dateError, setDateError] = useState<string>("");

  //カテゴリ
  const [category, setCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");

  const inOutList = ["収入", "支出"];

  /**
   * 収支データ新規登録.
   */
  const postData = useCallback(() => {
    //エラー初期化
    setInOutError("");
    setNameError("");
    setPriceError("");
    setDateError("");
    setCategoryError("");
    let error = "";

    if (inOut === "") {
      setInOutError("収支を選択して下さい。");
      error = "エラーあり";
    }

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
      userId: userId,
      name: name,
      howmatch: price,
      date: new Date(postDate),
      categoryName: category,
    };

    const url =
      inOut === "支出" ? `${apiUrl}/newspitem` : `${apiUrl}/newicitem`;

    try {
      axios.post(url, postData);
      toast.success(`${name}を${inOut}データで登録しました。`);
      router.push("/top/");
    } catch (e) {
      toast.error("登録に失敗しました。");
    }
  }, [
    nameError,
    priceError,
    dateError,
    categoryError,
    userId,
    name,
    price,
    date,
    category,
  ]);

  return (
    <>
      <PageLayout title="収支データ新規登録">
        <_TextInput>
          <SelectBox
            menuList={inOutList}
            setWord={setInOut}
            value={inOut}
            label="収支"
            errorItem={inOutError}
          />
        </_TextInput>

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
        <div>
          <Button
            variant="contained"
            onClick={postData}
            endIcon={<SendIcon />}
            color="primary"
          >
            登録
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

export default AddData;
