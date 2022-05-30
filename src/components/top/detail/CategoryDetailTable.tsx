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
} from "@mui/material";

type Props = {
  tableData: Array<CategoryDetailType>;
};

/**
 * 詳細テーブル.
 */
export const CategoryDetailTable: FC<Props> = memo(({ tableData }) => {
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
                <TableCell width={20} />
                <TableCell width={5} />
                <TableCell align="center">項目名</TableCell>
                <TableCell align="center">金額</TableCell>
                <TableCell align="center">日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell width={20} />
                  <TableCell width={5}>
                    <Icon style={{ color: item.color }}>{item.icon}</Icon>
                  </TableCell>
                  <TableCell align="center">
                    <_Name>{item.name}</_Name>
                  </TableCell>
                  <TableCell align="center">
                    &yen;{formatMoney(item.price)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(new Date(item.createdAt))}
                  </TableCell>
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
  justifyContent: "center",
  gap: 20,
}));
