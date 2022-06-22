import { FC, memo, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//hooks, types
import { useFormater } from "../../../hooks/useFormater";
import { FamilyDetailType } from "../../../types/MoneyType";

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
} from "@mui/material";

//others
import Cookie from "universal-cookie";

type Props = {
  tableData: Array<FamilyDetailType>;
};

/**
 * 詳細テーブル.
 */
export const FamilyDetailTable: FC<Props> = memo(({ tableData }) => {
  const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE;
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //表示を整える
  const { formatMoney, formatDate, calcTotal } = useFormater();
  const router = useRouter();

  /**
   * 編集ページに遷移.
   */
  const goEditPage = useCallback(
    (id: string) => {
      router.push(`/top/edit/${id}/`);
    },
    [router]
  );

  /**
   * 削除ページに遷移.
   */
  const goDeletePage = useCallback(
    (id: string) => {
      router.push(`/top/delete/${id}/`);
    },
    [router]
  );

  if (tableData.length == 0) return <></>;

  return (
    <_Pc>
      <_Total>合計金額:{calcTotal(tableData)}</_Total>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="5%"></TableCell>
              <TableCell align="center" width="25%">
                名前
              </TableCell>
              <TableCell align="center" width="20%">
                項目名
              </TableCell>
              <TableCell align="center" width="15%">
                金額
              </TableCell>
              <TableCell align="center" width="20%">
                日付
              </TableCell>
              <TableCell width="5%"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell />
                <TableCell align="right">
                  <_Name>
                    <_Image
                      src={firebaseUrl + item.image}
                      height={50}
                      width={50}
                    />

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
                {userId === item.userId ? (
                  <TableCell align="center">
                    <_Icon>
                      <_EditIcon>
                        <EditIcon onClick={() => goEditPage(item.id)} />
                      </_EditIcon>
                      <_DeleteIcon>
                        <DeleteIcon onClick={() => goDeletePage(item.id)} />
                      </_DeleteIcon>
                    </_Icon>
                  </TableCell>
                ) : (
                  <TableCell />
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </_Pc>
  );
});

const _Pc = styled("span")(() => ({
  width: "60%",
  "@media screen and (max-width:600px)": {
    display: "none",
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

const _EditIcon = styled("div")(() => ({
  width: 30,
  height: 30,
  padding: 5,
  zIndex: 1,
  ":hover": {
    opacity: "30%",
  },
}));

const _DeleteIcon = styled("div")(() => ({
  width: 30,
  height: 30,
  padding: 5,
  zIndex: 1,
  ":hover": {
    opacity: "30%",
  },
}));

const _Icon = styled("div")(() => ({
  display: "flex",
  gap: 20,
  "@media screen and (max-width:600px)": {
    display: "flex",
    gap: 5,
  },
}));

const _Total = styled("div")(() => ({
  textAlign: "left",
}));
