import { memo, FC, Dispatch, SetStateAction, useEffect, useState } from "react";

//components, types
import { CategoryType } from "../../types/CategoryType";
import { SelectBox } from "../form/SelectBox";

//API
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { apiUrl } from "../../utils/values";

type Props = {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  categoryError: string;
};

/**
 * カテゴリのセレクトボックス.
 */
export const CategorySelect: FC<Props> = memo(
  ({ category, setCategory, categoryError }) => {
    /**
     * カテゴリリスト取得.
     */
    const { data, error } = useSWR(`${apiUrl}/category`, fetcher);
    const categoryData: Array<CategoryType> = data;
    const [categoryList, setCategoryList] = useState<Array<string>>([]);

    /**
     * データ作成.
     */
    useEffect(() => {
      const array = new Array<string>();
      if (!categoryData) {
        return;
      }
      for (const item of categoryData) {
        array.push(item.name);
      }
      setCategoryList([...array]);
    }, [categoryData]);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    return (
      <>
        <SelectBox
          menuList={categoryList}
          setWord={setCategory}
          value={category}
          label="カテゴリ"
          errorItem={categoryError}
        />
      </>
    );
  }
);
