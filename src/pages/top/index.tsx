import type { NextPage } from "next";
import { useEffect, useState } from "react";

//components
import { PageTitle } from "../../components/layout/PageTitle";
import { DateBtn } from "../../components/top/DateBtn";
import { ToggleButton } from "../../components/form/ToggleButton";
import { GoToPageBtn } from "../../components/top/GoToPageBtn";
import { SpendingPieData } from "../../components/top/index/spending/SpendingPieData";
import { SpendingCategoryTable } from "../../components/top/index/spending/SpendingCategoryTable";
import { SpendingFamilyTable } from "../../components/top/index/spending/SpendingFamilyTable";
import { IncomePieData } from "../../components/top/index/income/IncomePieData";
import { IncomeCategoryTable } from "../../components/top/index/income/IncomeCategoryTable";
import { IncomeFamilyTable } from "../../components/top/index/income/IncomeFamilyTable";

//MUI
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

/**
 * トップページ(収支のページ).
 */
const Home: NextPage = () => {
  //トグル(支出、収入)
  const [inOrOutFlug, setInOrOutFlug] = useState("支出");

  //トグル(個人、グループ)
  const [oneOrGroupFlug, setOneOrGroupFlug] = useState("個人");

  //表示中の日付
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  //表のタイトル
  const [title, setTitle] = useState(`あなたの${inOrOutFlug}の記録`);

  useEffect(() => {
    if (oneOrGroupFlug === "個人") {
      setTitle(`あなたの${inOrOutFlug}の記録`);
    } else {
      setTitle(`グループの${inOrOutFlug}の記録`);
    }
  }, [year, month, inOrOutFlug, oneOrGroupFlug]);

  return (
    <>
      <_Main>
        <PageTitle title={title} />

        <_DateBtn>
          <DateBtn date={date} setDate={setDate} />
        </_DateBtn>

        <_Center>
          <_ToggleButton>
            <div>
              <ToggleButton
                toggle={inOrOutFlug}
                setToggle={setInOrOutFlug}
                toggleItemA="支出"
                toggleItemB="収入"
              />
            </div>

            <div>
              <ToggleButton
                toggle={oneOrGroupFlug}
                setToggle={setOneOrGroupFlug}
                toggleItemA="個人"
                toggleItemB="グループ"
              />
            </div>
          </_ToggleButton>
        </_Center>

        <_Flex>
          {inOrOutFlug == "支出" ? (
            <SpendingPieData year={year} month={month} mode={oneOrGroupFlug} />
          ) : (
            <IncomePieData year={year} month={month} mode={oneOrGroupFlug} />
          )}
        </_Flex>

        <_Flex>
          {inOrOutFlug == "支出" &&
            (oneOrGroupFlug === "個人" ? (
              <SpendingCategoryTable year={year} month={month} />
            ) : (
              <SpendingFamilyTable year={year} month={month} />
            ))}

          {inOrOutFlug == "収入" &&
            (oneOrGroupFlug === "個人" ? (
              <IncomeCategoryTable year={year} month={month} />
            ) : (
              <IncomeFamilyTable year={year} month={month} />
            ))}
        </_Flex>
      </_Main>
      <GoToPageBtn path="/top/detail/" word="詳細ページへ" left={25} />
    </>
  );
};

const _Center = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: 50,
  marginBottom: 50,
}));

const _DateBtn = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: 10,
  marginBottom: 30,
}));

const _ToggleButton = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: 100,
  padding: 30,
  border: "2px dashed #00B8A9",
  width: "auto",
  "@media screen and (max-width:600px)": {
    flexDirection: "column",
    gap: 20,
  },
}));

const _Main = styled("div")(() => ({
  marginBottom: 50,
  "@media screen and (max-width:600px)": {
    marginBottom: 200,
  },
}));

export default Home;
