import type { NextPage } from "next";

//components
import { DateBtn } from "../../components/top/DateBtn";
import { PageTitle } from "../../components/layout/PageTitle";
import { DetailTable } from "../../components/top/DetailTable";

//MUI
import { styled } from "@mui/material/styles";

/**
 * 収支詳細画面.
 */
const Detail: NextPage = () => {
  return (
    <_Main>
      <_Flex>
        <DateBtn />
      </_Flex>

      <PageTitle title="個人支出詳細" />
      <_Flex>
        <DetailTable />
      </_Flex>

      <PageTitle title="個人収入詳細" />
      <_Flex>
        <DetailTable />
      </_Flex>

      <PageTitle title="グループ支出詳細" />
      <_Flex>
        <DetailTable />
      </_Flex>

      <PageTitle title="グループ収入詳細" />
      <_Flex>
        <DetailTable />
      </_Flex>
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
