import { FC, memo } from "react";

//MUI
import { Avatar, Icon } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  name: string;
  icon: string;
  color: string;
};

/**
 * カテゴリ一覧用カード.
 */
export const CategoryCardItem: FC<Props> = memo(({ name, icon, color }) => {
  return (
    <_Main>
      <Card style={{ backgroundColor: `rgb(${color})`, color: "white" }}>
        <CardContent>
          <_Icon>
            <Icon>{icon}</Icon>
            {icon}
          </_Icon>

          <_Ul>
            <li>{name}</li>
            <li>{color}</li>
          </_Ul>
        </CardContent>
      </Card>
    </_Main>
  );
});

const _Ul = styled("ul")(() => ({
  listStyle: "none",
  padding: 0,
}));

const _Main = styled("div")(() => ({
  width: 200,
}));

const _Icon = styled("div")(() => ({
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
}));
