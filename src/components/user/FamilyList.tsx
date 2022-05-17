import { FC, memo } from "react";

//components
import { PageTitle } from "../layout/PageTitle";

//MUI
import { styled } from "@mui/material/styles";
import { CardItem } from "./CardItem";

type Props = {
  id: string;
};

export const FamilyList: FC<Props> = memo(({ id }) => {
  /**
   * 受け取ったIDを基に、紐づく家族メンバーを取得
   */

  const familyMember = [
    {
      id: "00000",
      image: "/book-tab-logo-face.jpg",
      familyID: "1234567890",
      name: "山田千代子",
      mail: "yamada@mail.com",
      password: "yamayama",
      role: "母",
    },
    {
      id: "11111",
      image: "/book-tab-logo-face.jpg",
      familyID: "1234567890",
      name: "山田花子",
      mail: "yamada@mail.com",
      password: "yamayama",
      role: "娘",
    },
    {
      id: "22222",
      image: "/book-tab-logo-face.jpg",
      familyID: "1234567890",
      name: "山田五郎",
      mail: "yamada@mail.com",
      password: "yamayama",
      role: "息子",
    },
    {
      id: "33333",
      image: "/book-tab-logo-face.jpg",
      familyID: "1234567890",
      name: "山田千代子",
      mail: "yamada@mail.com",
      password: "yamayama",
      role: "母",
    },
    {
      id: "4444",
      image: "/book-tab-logo-face.jpg",
      familyID: "1234567890",
      name: "山田花子",
      mail: "yamada@mail.com",
      password: "yamayama",
      role: "娘",
    },
    {
      id: "55555",
      image: "/book-tab-logo-face.jpg",
      familyID: "1234567890",
      name: "山田五郎",
      mail: "yamada@mail.com",
      password: "yamayama",
      role: "息子",
    },
  ];

  return (
    <>
      {familyMember.length > 0 ? (
        <>
          <PageTitle title="グループ情報" />
          <_Card>
            {familyMember?.map((item) => (
              <div key={item.id}>
                <CardItem
                  name={item.name}
                  image={item.image}
                  role={item.role}
                />
              </div>
            ))}
          </_Card>
        </>
      ) : (
        <div>家族の登録がありません</div>
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
