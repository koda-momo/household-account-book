import { FC, memo } from "react";

//components
import { PageTitle } from "../layout/PageTitle";
import { CategoryCardItem } from "./CategoryCardItem";
import { CategoryType } from "../../types/CategoryType";

//MUI
import styled from "@emotion/styled";

type Props = {
  categoryList: Array<CategoryType>;
  title: string;
};
export const CategoryList: FC<Props> = memo(({ categoryList, title }) => {
  return (
    <>
      <_CategoryList>
        <PageTitle title={title} />

        <_Flex>
          {categoryList.map((item) => (
            <div key={item.name}>
              <CategoryCardItem
                name={item.name}
                icon={item.icon}
                color={item.color}
              />
            </div>
          ))}
        </_Flex>
      </_CategoryList>
    </>
  );
});

const _CategoryList = styled("div")(() => ({
  marginTop: 100,
  marginBottom: 100,
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  flexWrap: "wrap",
}));
