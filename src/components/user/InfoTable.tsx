import { FC, memo } from "react";

//MUI
import { styled } from "@mui/material/styles";
import { FamilyType, UserType } from "../../types/UserType";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { apiUrl } from "../../utils/values";

type Props = {
  userData: UserType;
};

/**
 * ユーザ情報の役割、メールアドレス、家族データの部分.
 */
export const InfoTable: FC<Props> = memo(({ userData }) => {
  //APIのURL
  const url = userData.familyId
    ? `${apiUrl}/getfamily/${userData.familyId}`
    : "undefined";

  /**
   * ユーザIDから紐づいている家族情報の取得
   */
  const { data, error } = useSWR(url, fetcher);
  const familyData: FamilyType = data?.family;

  //エラー処理
  if (userData.familyId && error) return <_Error>error</_Error>;
  if (userData.familyId && !data)
    return (
      <_Error>
        <CircularProgress />
      </_Error>
    );

  return (
    <>
      <_Flex>
        <_Item>カラー</_Item>
        <_Item>
          <_Color style={{ backgroundColor: `rgb(${userData.color})` }} />
        </_Item>
      </_Flex>

      <_Flex>
        <_Item>メール</_Item>
        <_Item>{userData.mail}</_Item>
      </_Flex>

      {familyData && (
        <>
          <_Flex>
            <_Item>グループ</_Item>
            <_Item>{familyData.name}</_Item>
          </_Flex>

          <_Flex>
            <_Item>役割</_Item>
            <_Item>{userData.role}</_Item>
          </_Flex>
        </>
      )}
    </>
  );
});

const _Item = styled("div")(() => ({
  width: "47%",
  display: "flex",
  alignItems: "center",
}));

const _Color = styled("div")(() => ({
  width: 100,
  height: 10,
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  gap: 10,
  width: "100%",
  textAlign: "left",
  marginBottom: 10,
}));

const _Error = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
}));
