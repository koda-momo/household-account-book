import { FC, memo } from "react";

//MUI
import { styled } from "@mui/material/styles";
import { UserType } from "../../types/UserType";

type Props = {
  data: UserType;
};

export const InfoTable: FC<Props> = memo(({ data }) => {
  /**
   * ユーザIDから紐づいている家族情報の取得
   */
  const familyData = {
    id: "familyId",
    image: "/book-tab-logo-face.jpg",
    secretWord: "",
    password: "",
    name: "山田家",
    incomeId: "",
    spendingId: "",
  };

  return (
    <>
      <_Flex>
        <_Item>メールアドレス</_Item>
        <_Item>{data.mail}</_Item>
      </_Flex>

      {familyData && (
        <>
          <_Flex>
            <_Item>グループ名</_Item>
            <_Item>{familyData.name}</_Item>
          </_Flex>

          <_Flex>
            <_Item>役割</_Item>
            <_Item>{data.role}</_Item>
          </_Flex>
        </>
      )}
    </>
  );
});

const _Item = styled("div")(() => ({
  width: "47%",
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  gap: 10,
  width: "100%",
  textAlign: "left",
  marginBottom: 10,
}));
