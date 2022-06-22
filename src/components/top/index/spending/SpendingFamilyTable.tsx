import { FC, memo, useEffect } from "react";

//hooks, Type
import { useFormater } from "../../../../hooks/useFormater";
import { useSpendingTable } from "../../../../hooks/top/useSpendingTable";

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
  CircularProgress,
} from "@mui/material";

type Props = {
  year: number;
  month: number;
};

/**
 * グループごとに分類したデータを回す
 */
export const SpendingFamilyTable: FC<Props> = memo(({ year, month }) => {
  const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE;
  //表示を整える
  const { formatMoney, totaleFamilyCount } = useFormater();

  const { dataCheck, makeFamilyTableData, familyTableData } = useSpendingTable(
    year,
    month
  );

  useEffect(() => {
    makeFamilyTableData();
  }, [year, month, makeFamilyTableData]);

  //読み込み中の表示
  if (familyTableData?.length == 0 && dataCheck === true)
    return (
      <_Loading>
        <CircularProgress />
      </_Loading>
    );

  return (
    <>
      {dataCheck && (
        <>
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
                  {familyTableData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell></TableCell>
                      <TableCell align="right" width="30%">
                        <_Avatar>
                          <Avatar
                            alt="icon"
                            src={firebaseUrl + item.image}
                            sx={{ width: 50, height: 50 }}
                          />
                          {item.name}
                        </_Avatar>
                      </TableCell>
                      <TableCell align="center">
                        &yen;{formatMoney(item.price)}
                      </TableCell>
                      <TableCell align="center">
                        {totaleFamilyCount(item.price, familyTableData)}%
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </_Table>
        </>
      )}
    </>
  );
});

const _Table = styled("div")(() => ({
  width: "60%",
  "@media screen and (max-width:820px)": {
    width: "90%",
  },
}));

const _Avatar = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: 20,
  "@media screen and (max-width:820px)": {
    flexDirection: "column",
    gap: 3,
  },
}));

const _Loading = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
  width: 500,
  height: 500,
  "@media screen and (max-width:820px)": {
    width: 300,
    height: 300,
  },
}));
