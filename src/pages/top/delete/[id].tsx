import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

//compoents
import { PageTitle } from "../../../components/layout/PageTitle";
import { useFormater } from "../../../hooks/useFormater";

//MUI
import styled from "@emotion/styled";
import { Button, Card, CardContent } from "@mui/material";

//others
import { toast } from "react-hot-toast";
import { apiUrl } from "../../../utils/values";
import axios from "axios";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

/**
 * 削除画面.
 */
const DeleteData: NextPage<Props> = ({ listData }) => {
  //URLからID取得
  const router = useRouter();
  const [itemId] = useState(router.query.id);

  //表示を整える
  const { formatDate } = useFormater();

  //支出か収入データか
  const spic = listData.spItem ? "支出" : "収入";
  const spicItem = spic === "支出" ? listData.spItem : listData.icItem;

  /**
   * 削除.
   */
  const dataDelete = useCallback(() => {
    const url =
      spic === "支出"
        ? `${apiUrl}/deletespitem/${itemId}`
        : `${apiUrl}/deleteicitem/${itemId}`;

    try {
      axios.delete(url);
      toast.success("削除しました。");
      router.push("/top/");
    } catch (e) {
      toast.error("削除に失敗しました。");
    }
  }, [itemId]);

  /**
   * 前のページに戻る.
   */
  const goBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <_Flex>
      <_Main>
        <Card>
          <CardContent>
            <PageTitle title={`${spic}データを削除しますか？`} />
            <_Flex>
              <_Ul>
                <_Li>項目名:{spicItem.name}</_Li>
                <_Li>価格:{spicItem.howmatch}</_Li>
                <_Li>作成日時: {formatDate(new Date(spicItem.createdAt))}</_Li>
                <_Li>カテゴリ:{listData.categoryName}</_Li>
              </_Ul>
            </_Flex>

            <_Flex>
              <Button variant="contained" color="primary" onClick={dataDelete}>
                はい
              </Button>
              <Button variant="contained" color="error" onClick={goBack}>
                いいえ
              </Button>
            </_Flex>
          </CardContent>
        </Card>
      </_Main>
    </_Flex>
  );
};

/**
 * SSRで初期データ取得.
 * @returns ユーザ情報初期表示用データ
 */
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
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

const _Flex = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
}));

const _Main = styled("div")(() => ({
  width: "80%",
  "@media screen and (max-width:600px)": {
    width: "90%",
  },
}));

const _Ul = styled("ul")(() => ({
  listStyle: "none",
  marginTop: 50,
  marginBottom: 70,
  paddingInlineStart: 0,
}));

const _Li = styled("li")(() => ({
  marginBottom: 5,
}));

export default DeleteData;
