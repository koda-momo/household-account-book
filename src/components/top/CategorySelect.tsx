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
  genre: string;
};

/**
 * カテゴリのセレクトボックス.
 */
export const CategorySelect: FC<Props> = memo(
  ({ category, setCategory, categoryError, genre }) => {
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
      if (!categoryData) {
        return;
      }

      //対象ジャンルで搾る
      const filterArray = categoryData.filter((item) => {
        return item.genre === genre || item.genre === "その他";
      });

      //名前だけ抽出
      const array = new Array<string>();
      for (const item of filterArray) {
        array.push(item.name);
      }

      //「その他」を後に
      array.sort();
      array.reverse();

      setCategoryList([...array]);
    }, [categoryData, genre]);

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
