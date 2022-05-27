import { FC, memo, useState, useCallback } from "react";

//hooks
import { useFormater } from "../../../../hooks/useFormater";

//MUI
import { styled } from "@mui/material/styles";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

/**
 * グループごとに分類したデータを回す
 */
export const SpendingFamilyTable: FC = memo(() => {
  //表示を整える
  const { formatMoney } = useFormater();

  //記録データ
  const [result] = useState([
    {
      id: "000",
      userId: "000",
      categoryId: "000",
      name: "父",
      howMath: 30,
      createdAt: new Date(),
    },
    {
      id: "111",
      userId: "000",
      categoryId: "000",
      name: "母",
      howMath: 100,
      createdAt: new Date(),
    },
    {
      id: "222",
      userId: "000",
      categoryId: "000",
      name: "ほげほげ",
      howMath: 30,
      createdAt: new Date(),
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

  return (
    <_Table>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">役割名</TableCell>
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
                  <_Avatar>
                    <Avatar
                      alt="icon"
                      src="/book-tab-logo-face.jpg"
                      sx={{ width: 50, height: 50 }}
                    />
                    {item.name}
                  </_Avatar>
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
    width: "auto",
  },
}));

const _Avatar = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 20,
}));
