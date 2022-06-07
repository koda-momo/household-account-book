import { useEffect, useState, useCallback } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

//components
import { CategoryType } from "../types/CategoryType";
import { apiUrl } from "../utils/values";
import { CategoryEdit } from "../components/admin/CategoryEdit";

//MUI
import styled from "@emotion/styled";
import { Button } from "@mui/material";

//others
import Cookie from "universal-cookie";
import toast from "react-hot-toast";
import { fetcher } from "../utils/fetcher";
import useSWR from "swr";
import { CategoryList } from "../components/admin/CategoryList";

/**
 *  管理者用ページ.
 */
const AdminPage: NextPage = () => {
  const router = useRouter();
  const cookie = new Cookie();
  const userCheck = cookie.get("userId");

  //管理者チェッカー
  const [checkFlug, setCheckFlug] = useState(false);

  /**
   * 登録済カテゴリデータの取得.
   */
  const { data, error, mutate } = useSWR(`${apiUrl}/category`, fetcher);
  const [incomeData, setIncomeData] = useState<Array<CategoryType>>();
  const [spendingData, setSpendingData] = useState<Array<CategoryType>>();
  const [otherData, setOtherData] = useState<Array<CategoryType>>();

  //選択中のジャンル
  const [genre, setGenre] = useState("");

  /**
   * 表示用データ作成.
   */
  useEffect(() => {
    if (data) {
      const incomeArray = data.filter((item: CategoryType) => {
        return item.genre === "収入";
      });

      const spendingArray = data.filter((item: CategoryType) => {
        return item.genre === "支出";
      });

      const otherArray = data.filter((item: CategoryType) => {
        return item.genre === "その他";
      });

      setIncomeData(incomeArray);
      setSpendingData(spendingArray);
      setOtherData(otherArray);
    }
  }, [data]);

  /**
   * 管理者出なければこのページに入れないチェッカー.
   */
  useEffect(() => {
    if (userCheck !== "管理者") {
      router.push("/top/");
    } else {
      setCheckFlug(true);
    }
  }, [checkFlug]);

  /**
   * ログアウト.
   */
  const logout = useCallback(async () => {
    const cookie = new Cookie();
    cookie.remove("userId", { path: "/" });
    await router.push("/auth/login/");
    toast.success("ログアウトしました。");
  }, []);

  return (
    <>
      {checkFlug ? (
        <>
          {data && (
            <>
              <CategoryEdit genre={genre} setGenre={setGenre} mutate={mutate} />

              {incomeData && genre === "収入" && (
                <CategoryList categoryList={incomeData} title="収入" />
              )}
              {spendingData && genre === "支出" && (
                <CategoryList categoryList={spendingData} title="支出" />
              )}
              {otherData && genre === "その他" && (
                <CategoryList categoryList={otherData} title="その他" />
              )}
            </>
          )}

          <_Button>
            <Button onClick={logout} variant="contained" color="primary">
              ログアウト
            </Button>
          </_Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const _Button = styled("div")(() => ({
  textAlign: "center",
  marginBottom: 100,
}));

export default AdminPage;
