import { FC, memo, useCallback, useState } from "react";

//hooks
import { useFormater } from "../../hooks/useFormater";

//MUI
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

/**
 * カテゴリーごとに分類したデータを回す
 */
export const CategoryTable: FC = memo(() => {
  //表示を整える
  const { formatMoney } = useFormater();

  //記録データ
  const [result] = useState([
    {
      id: "000",
      userId: "000",
      categoryId: "000",
      name: "遊んだ",
      howMath: 100,
      createdAt: new Date(),
      categoryData: {
        id: "000",
        name: "他",
        icon: "star",
        color: "#FFDE7D",
      },
    },
    {
      id: "111",
      userId: "000",
      categoryId: "000",
      name: "買い物",
      howMath: 100,
      createdAt: new Date(),
      categoryData: {
        id: "000",
        name: "買い物",
        icon: "shopping-cart",
        color: "#F6416C",
      },
    },
    {
      id: "222",
      userId: "000",
      categoryId: "000",
      name: "食費",
      howMath: 10000,
      createdAt: new Date(),
      categoryData: {
        id: "000",
        name: "食費",
        icon: "restaurant",
        color: "#00B8A9",
      },
    },
  ]);
  /**
   * パーセンテージの計算.
   */
  const totaleCount = useCallback((howMatch: number) => {
    let total = 0;
    result.map((item) => {
      total += item.howMath;
    });

    const percent = Math.round((howMatch / total) * Math.pow(10, 2));

    return percent;
  }, []);

  const color = "red";

  return (
    <_Table>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">カテゴリ</TableCell>
              <TableCell align="center">金額</TableCell>
              <TableCell align="center">%</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((item) => (
              <TableRow key={item.id}>
                <TableCell></TableCell>
                <TableCell align="right" width="30%">
                  <_Name>
                    <Icon style={{ color: item.categoryData.color }}>
                      {item.categoryData.icon}
                    </Icon>
                    {item.name}
                  </_Name>
                </TableCell>
                <TableCell align="center">
                  &yen;{formatMoney(item.howMath)}
                </TableCell>
                <TableCell align="center">
                  {totaleCount(item.howMath)}%
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </_Table>
  );
});

const _Table = styled("div")(() => ({
  width: "60%",
  "@media screen and (max-width:600px)": {
    width: "100%",
  },
}));

const _Name = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 20,
}));
