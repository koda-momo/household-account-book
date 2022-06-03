import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

//components
import { DateBtn } from "../../components/top/DateBtn";
import { PageTitle } from "../../components/layout/PageTitle";
import { CategoryDetailTable } from "../../components/top/detail/CategoryDetailTable";
import { FamilyDetailTable } from "../../components/top/detail/FamilyDetailTable";
import { ToggleButton } from "../../components/form/ToggleButton";
import { GoToPageBtn } from "../../components/top/GoToPageBtn";
import { PhoneCategoryDetailTable } from "../../components/top/detail/PhoneCategoryDetailTable";
import { PhoneFamilyDetailTable } from "../../components/top/detail/PhoneFamilyDetailTable";
import { useSpendingDetail, useIncomeDetail } from "../../hooks/top/useDetail";
import { useFormater } from "../../hooks/useFormater";

//MUI
import { styled } from "@mui/material/styles";

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

  //表示を整える
  const { calcBalance } = useFormater();

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

      <_Flex>
        <_Balance>
          収入 - 支出 = 残高:
          {oneOrGroupFlug === "個人" ? (
            <>{calcBalance(spendingCategoryTable, incomeCategoryTable)}</>
          ) : (
            <>{calcBalance(spendingFamilyTable, incomeFamilyTable)}</>
          )}
        </_Balance>
      </_Flex>

      {oneOrGroupFlug === "個人" && (
        <>
          <PageTitle title="あなたの支出詳細" />
          {spendingDataCheck ? (
            <>
              <_Flex>
                <CategoryDetailTable tableData={spendingCategoryTable} />
                <PhoneCategoryDetailTable tableData={spendingCategoryTable} />
              </_Flex>
            </>
          ) : (
            <_Flex>データなし</_Flex>
          )}

          <_MarginBottom100 />

          <PageTitle title="あなたの収入詳細" />
          <_Flex>
            {incomeDataCheck ? (
              <>
                <CategoryDetailTable tableData={incomeCategoryTable} />
                <PhoneCategoryDetailTable tableData={incomeCategoryTable} />
              </>
            ) : (
              <>データなし</>
            )}
          </_Flex>
        </>
      )}
      {oneOrGroupFlug === "グループ" && (
        <>
          <PageTitle title="グループの支出詳細" />
          <_Flex>
            {spendingDataCheck ? (
              <>
                <FamilyDetailTable tableData={spendingFamilyTable} />
                <PhoneFamilyDetailTable tableData={spendingFamilyTable} />
              </>
            ) : (
              <>データなし</>
            )}
          </_Flex>

          <_MarginBottom />

          <PageTitle title="グループの収入詳細" />
          <_Flex>
            {spendingDataCheck ? (
              <>
                <FamilyDetailTable tableData={incomeFamilyTable} />
                <PhoneFamilyDetailTable tableData={incomeFamilyTable} />
              </>
            ) : (
              <>データなし</>
            )}
          </_Flex>
        </>
      )}
      <GoToPageBtn path="/top/add/" word="新規追加" left={40} />
      <_MarginBottom />
    </_Main>
  );
};

const _Main = styled("div")(() => ({
  textAlign: "center",
  "@media screen and (max-width:600px)": {
    marginBottom: 200,
  },
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

const _MarginBottom = styled("div")(() => ({
  marginBottom: 50,
}));

const _MarginBottom100 = styled("div")(() => ({
  marginBottom: 100,
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

const _Balance = styled("div")(() => ({
  marginBottom: 100,
  marginTop: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 20,
  backgroundColor: "white",
  borderRadius: "3%",
  width: "60%",
  height: 100,
  "@media screen and (max-width:600px)": {
    marginBottom: 50,
    marginTop: 50,
    width: "90%",
  },
}));

export default Detail;
