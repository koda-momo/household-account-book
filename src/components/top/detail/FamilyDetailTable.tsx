import { FC, memo } from "react";
import Image from "next/image";

//hooks, types
import { useFormater } from "../../../hooks/useFormater";
import { FamilyDetailType } from "../../../types/MoneyType";

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
  tableData: Array<FamilyDetailType>;
};

/**
 * 詳細テーブル.
 */
export const FamilyDetailTable: FC<Props> = memo(({ tableData }) => {
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
                <TableCell align="center">名前</TableCell>
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
                      <_Image src={`/${item.image}`} height={50} width={50} />

                      {item.name}
                    </_Name>
                  </TableCell>
                  <TableCell align="center">{item.contentName}</TableCell>
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

const _Image = styled(Image)(() => ({
  borderRadius: "100%",
}));

const _Name = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 20,
}));
