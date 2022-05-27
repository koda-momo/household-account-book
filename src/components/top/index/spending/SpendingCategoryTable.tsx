import { FC, memo, useEffect } from "react";

//hooks
import { useFormater } from "../../../../hooks/useFormater";
import { useSpendingTable } from "../../../../hooks/useSpendingTable";

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
  year: number;
  month: number;
};

/**
 * カテゴリーごとに分類したデータを回す
 */
export const SpendingCategoryTable: FC<Props> = memo(({ year, month }) => {
  //表示を整える
  const { formatMoney } = useFormater();

  const { dataCheck, makeCategoryTableData, categoryTableData } =
    useSpendingTable(year, month);

  useEffect(() => {
    makeCategoryTableData();
  }, [year, month]);

  /**
   * パーセンテージの計算.
   */
  const totaleCount = (price: number) => {
    let total = 0;

    for (const item of categoryTableData) {
      total += item.price;
    }

    const percent = Math.round((price / total) * Math.pow(10, 2));

    return percent;
  };

  //読み込み中の表示
  if (categoryTableData?.length == 0 && dataCheck === true)
    return (
      <_Loading>
        <CircularProgress />
      </_Loading>
    );

  return (
    <>
      {dataCheck && (
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
                {categoryTableData.map((item) => (
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
                      {totaleCount(item.price)}%
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </_Table>
      )}
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

const _Loading = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: 50,
  width: 500,
  height: 500,
  "@media screen and (max-width:600px)": {
    width: 300,
    height: 300,
  },
}));
