import { FC, memo, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//hooks, types
import { useFormater } from "../../../hooks/useFormater";
import { FamilyDetailType } from "../../../types/MoneyType";

//MUI
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
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
export const PhoneFamilyDetailTable: FC<Props> = memo(({ tableData }) => {
  const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE;
  //ログイン中のユーザID
  const cookie = new Cookie();
  const [userId] = useState(cookie.get("userId"));

  //表示を整える
  const { formatMoney, formatPhoneDate, calcTotal } = useFormater();
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
    <_Phone>
      <_Total>合計金額:{calcTotal(tableData)}</_Total>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">名前</TableCell>
              <TableCell align="center">項目名</TableCell>
              <TableCell align="center">金額</TableCell>
              <TableCell align="center">日付</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell width="20%" padding="none">
                  <_Name>
                    <_Image
                      src={firebaseUrl + item.image}
                      height={30}
                      width={30}
                    />
                    {item.name}
                  </_Name>
                </TableCell>

                <TableCell align="center" width="30%" padding="none">
                  <_FontSize>{item.contentName}</_FontSize>
                </TableCell>

                <TableCell align="center" width="20%" padding="none">
                  <_FontSize>&yen;{formatMoney(item.price)}</_FontSize>
                </TableCell>

                <TableCell align="center" width="20%" padding="none">
                  <_FontSize>
                    {formatPhoneDate(new Date(item.createdAt))}
                  </_FontSize>
                </TableCell>

                {userId === item.userId ? (
                  <TableCell align="center" width="10%" padding="none">
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
                ) : (
                  <TableCell height={50} />
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </_Phone>
  );
});

const _Phone = styled("div")(() => ({
  display: "none",
  "@media screen and (max-width:600px)": {
    display: "block",
    width: 500,
  },
}));

const _Image = styled(Image)(() => ({
  borderRadius: "100%",
}));

const _Name = styled("div")(() => ({
  display: "flex",
  flexFlow: "column",
  gap: 1,
  alignItems: "center",
  fontSize: 10,
}));

const _FontSize = styled("div")(() => ({
  fontSize: 13,
}));

const _EditIcon = styled("div")(() => ({
  width: 30,
  height: 30,
  padding: 5,
  fontSize: 10,
  ":hover": {
    opacity: "30%",
  },
}));

const _DeleteIcon = styled("div")(() => ({
  width: 30,
  height: 30,
  padding: 5,
  fontSize: 10,
  ":hover": {
    opacity: "30%",
  },
}));

const _Icon = styled("div")(() => ({
  display: "flex",
  flexFlow: "column",
}));

const _Total = styled("div")(() => ({
  textAlign: "left",
}));
