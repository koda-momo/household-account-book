import { FC, memo } from "react";

//MUI
import { Avatar } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  name: string;
  image: string;
  role: string;
};

export const CardItem: FC<Props> = memo(({ name, image, role }) => {
  return (
    <>
      <Card>
        <CardContent>
          <_Flex>
            <Avatar alt="icon" src={image} sx={{ width: 70, height: 70 }} />
          </_Flex>
          <_Flex>{name}</_Flex>
          <_Flex>{role}</_Flex>
        </CardContent>
      </Card>
    </>
  );
});

const _Flex = styled("span")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 10,
}));
