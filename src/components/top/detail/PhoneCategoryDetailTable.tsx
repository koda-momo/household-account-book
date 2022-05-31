import { FC, memo, useCallback } from "react";
import { useRouter } from "next/router";

//hooks, types
import { useFormater } from "../../../hooks/useFormater";
import { CategoryDetailType } from "../../../types/MoneyType";

//MUI
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon,
} from "@mui/material";

type Props = {
  tableData: Array<CategoryDetailType>;
};

/**
 * スマホ用詳細テーブル.
 */
export const PhoneCategoryDetailTable: FC<Props> = memo(({ tableData }) => {
  //表示を整える
  const { formatMoney, formatPhoneDate } = useFormater();
  const router = useRouter();

  /**
   * 編集ページに遷移.
   */
  const goEditPage = useCallback((id: string) => {
    router.push(`/top/edit/${id}/`);
  }, []);

  /**
   * 削除ページに遷移.
   */
  const goDeletePage = useCallback((id: string) => {
    router.push(`/top/delete/${id}/`);
  }, []);

  if (tableData.length <= 0) return <>データなし</>;

  return (
    <>
      <_Phone>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" />
                <TableCell align="center">項目名</TableCell>
                <TableCell align="center">金額</TableCell>
                <TableCell align="center">日付</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell width="10%">
                    <Icon style={{ color: item.color }}>{item.icon}</Icon>
                  </TableCell>

                  <TableCell align="center" padding="none" width="30%">
                    <_Name>{item.name}</_Name>
                  </TableCell>

                  <TableCell align="center" padding="none" width="20%">
                    &yen;{formatMoney(item.price)}
                  </TableCell>

                  <TableCell align="center" padding="none" width="20%">
                    {formatPhoneDate(new Date(item.createdAt))}
                  </TableCell>

                  <TableCell align="center" padding="none" width="20%">
                    <_Icon>
                      <_EditIcon>
                        <EditIcon
                          onClick={() => goEditPage(item.id)}
                          fontSize="small"
                        />
                      </_EditIcon>
                      <_DeleteIcon>
                        <DeleteIcon
                          onClick={() => goDeletePage(item.id)}
                          fontSize="small"
                        />
                      </_DeleteIcon>
                    </_Icon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </_Phone>
    </>
  );
});

const _Phone = styled("div")(() => ({
  display: "none",
  "@media screen and (max-width:600px)": {
    display: "block",
    width: 500,
  },
}));

const _EditIcon = styled("div")(() => ({
  width: 30,
  height: 30,
  padding: 5,
  ":hover": {
    opacity: "30%",
  },
}));

const _DeleteIcon = styled("div")(() => ({
  width: 30,
  height: 30,
  padding: 5,
  ":hover": {
    opacity: "30%",
  },
}));

const _Icon = styled("div")(() => ({
  "@media screen and (max-width:600px)": {
    display: "flex",
    flexFlow: "column",
  },
}));

const _Name = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  gap: 20,
}));
