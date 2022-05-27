import { FC, memo, useEffect } from "react";

//hooks, types
import { useFormater } from "../../../hooks/useFormater";
import { CategoryDetailType } from "../../../types/MoneyType";

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
  CircularProgress,
} from "@mui/material";

type Props = {
  tableData: Array<CategoryDetailType>;
};

/**
 * 詳細テーブル.
 */
export const DetailTable: FC<Props> = memo(({ tableData }) => {
  //表示を整える
  const { formatMoney, formatDate } = useFormater();

  if (tableData.length <= 0) return <>データなし</>;

  return (
    <>
      <_Table>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">項目名</TableCell>
                <TableCell align="center">金額</TableCell>
                <TableCell align="center">日時</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell></TableCell>
                  <TableCell align="right" width="30%">
                    <_Name>
                      <Icon style={{ color: item.color }}>{item.icon}</Icon>
                      {item.name}
                    </_Name>
                  </TableCell>
                  <TableCell align="center">
                    &yen;{formatMoney(item.price)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(new Date(item.createdAt))}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </_Table>
    </>
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
