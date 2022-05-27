import type { NextPage } from "next";

//components
import { DateBtn } from "../../components/top/DateBtn";
import { PageTitle } from "../../components/layout/PageTitle";
import { DetailTable } from "../../components/top/detail/DetailTable";

//MUI
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSpendingDetail, useIncomeDetail } from "../../hooks/useDetail";

/**
 * 収支詳細画面.
 */
const Detail: NextPage = () => {
  //表示中の日付
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const { spendingDataCheck, getCategorySpending, spendingCategoryTable } =
    useSpendingDetail(year, month);

  const { incomeDataCheck, getCategoryIncome, incomeCategoryTable } =
    useIncomeDetail(year, month);

  useEffect(() => {
    getCategorySpending();
    getCategoryIncome();
  }, [year, month]);

  return (
    <_Main>
      <_Flex>
        <DateBtn date={date} setDate={setDate} />
      </_Flex>

      <PageTitle title="あなたの支出詳細" />
      <_Flex>
        {spendingDataCheck ? (
          <DetailTable tableData={spendingCategoryTable} />
        ) : (
          <>データなし</>
        )}
      </_Flex>

      <PageTitle title="あなたの収入詳細" />
      <_Flex>
        {incomeDataCheck ? (
          <DetailTable tableData={incomeCategoryTable} />
        ) : (
          <>データなし</>
        )}
      </_Flex>

      {/* <PageTitle title="グループ支出詳細" />
      <_Flex>
        <DetailTable />
      </_Flex>

      <PageTitle title="グループ収入詳細" />
      <_Flex>
        <DetailTable />
      </_Flex> */}
    </_Main>
  );
};

const _Main = styled("div")(() => ({
  textAlign: "center",
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 100,
}));

export default Detail;
