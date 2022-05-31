import type { NextPage } from "next";

//components
import { DateBtn } from "../../components/top/DateBtn";
import { PageTitle } from "../../components/layout/PageTitle";
import { CategoryDetailTable } from "../../components/top/detail/CategoryDetailTable";
import { FamilyDetailTable } from "../../components/top/detail/FamilyDetailTable";

//MUI
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSpendingDetail, useIncomeDetail } from "../../hooks/useDetail";
import { ToggleButton } from "../../components/form/ToggleButton";
import { GoToPageBtn } from "../../components/top/GoToPageBtn";

/**
 * 収支詳細画面.
 */
const Detail: NextPage = () => {
  //表示中の日付
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  //トグル(個人、グループ)
  const [oneOrGroupFlug, setOneOrGroupFlug] = useState("個人");

  //支出情報hooks
  const {
    spendingDataCheck,
    getCategorySpending,
    spendingCategoryTable,
    getFamilySpending,
    spendingFamilyTable,
  } = useSpendingDetail(year, month);

  //収入情報hooks
  const {
    incomeDataCheck,
    getCategoryIncome,
    incomeCategoryTable,
    getFamilyIncome,
    incomeFamilyTable,
  } = useIncomeDetail(year, month);

  /**
   * データ読み込み.
   */
  useEffect(() => {
    if (oneOrGroupFlug === "個人") {
      getCategorySpending();
      getCategoryIncome();
    } else {
      getFamilySpending();
      getFamilyIncome();
    }
  }, [year, month, oneOrGroupFlug]);

  return (
    <_Main>
      <_Flex>
        <DateBtn date={date} setDate={setDate} />
      </_Flex>

      <_MarginBottom />

      <_Flex>
        <_ToggleButton>
          <ToggleButton
            toggle={oneOrGroupFlug}
            setToggle={setOneOrGroupFlug}
            toggleItemA="個人"
            toggleItemB="グループ"
          />
        </_ToggleButton>
      </_Flex>

      <_MarginBottom />

      {oneOrGroupFlug === "個人" && (
        <>
          <PageTitle title="あなたの支出詳細" />
          <_Flex>
            {spendingDataCheck ? (
              <CategoryDetailTable tableData={spendingCategoryTable} />
            ) : (
              <>データなし</>
            )}
          </_Flex>

          <_MarginBottom />

          <PageTitle title="あなたの収入詳細" />
          <_Flex>
            {incomeDataCheck ? (
              <CategoryDetailTable tableData={incomeCategoryTable} />
            ) : (
              <>データなし</>
            )}
          </_Flex>
          <GoToPageBtn path="/top/add/" word="新規追加" left={40} />
        </>
      )}

      {oneOrGroupFlug === "グループ" && (
        <>
          <PageTitle title="グループの支出詳細" />
          <_Flex>
            {spendingDataCheck ? (
              <FamilyDetailTable tableData={spendingFamilyTable} />
            ) : (
              <>データなし</>
            )}
          </_Flex>

          <_MarginBottom />

          <PageTitle title="グループの収入詳細" />
          <_Flex>
            {spendingDataCheck ? (
              <FamilyDetailTable tableData={incomeFamilyTable} />
            ) : (
              <>データなし</>
            )}
          </_Flex>
        </>
      )}

      <_MarginBottom />
    </_Main>
  );
};

const _Main = styled("div")(() => ({
  textAlign: "center",
  "@media screen and (max-width:600px)": {
    marginBottom: 150,
  },
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

const _MarginBottom = styled("div")(() => ({
  marginBottom: 50,
}));

const _ToggleButton = styled("div")(() => ({
  textAlign: "center",
  padding: 30,
  border: "2px dashed #00B8A9",
  width: "20%",
  "@media screen and (max-width:600px)": {
    width: "40%",
  },
}));

export default Detail;
