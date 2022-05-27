import { FC, memo } from "react";

//components
import { PageTitle } from "../layout/PageTitle";
import { UserType } from "../../types/UserType";

//MUI
import { styled } from "@mui/material/styles";
import { CardItem } from "./CardItem";
import { CircularProgress } from "@mui/material";

//API
import { apiUrl } from "../../utils/values";
import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";

//家族ID
type Props = { familyId: string };

export const FamilyList: FC<Props> = memo(({ familyId }) => {
  //APIのURL
  const url = familyId ? `${apiUrl}/getuser/family/${familyId}` : "undefined";

  //家族データを取得
  const { data, error } = useSWR(url, fetcher);
  const familyData: Array<UserType> = data?.user;

  //エラー処理
  if (familyId && error) return <_Error>error</_Error>;
  if (familyId && !data)
    return (
      <_Error>
        <CircularProgress />
      </_Error>
    );
  if (!familyId) {
    return <_Error>グループの登録がありません。</_Error>;
  }

  return (
    <>
      {data && (
        <>
          <PageTitle title="同じグループの人たち" />
          <_Card>
            {familyData.length > 0 &&
              familyData.map((item) => (
                <div key={item._id}>
                  <CardItem
                    name={item.name}
                    image={item.image}
                    role={item.role}
                  />
                </div>
              ))}
          </_Card>
        </>
      )}
    </>
  );
});

const _Card = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  justifyContent: "center",
  marginBottom: 20,
}));

const _Error = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
}));
