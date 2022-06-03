import axios from "axios";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { apiUrl } from "../../utils/values";

export const useUploadImage = (
  image: string,
  setImageItem: Dispatch<SetStateAction<string>>
) => {
  const uploadImage = useCallback(async (e: any) => {
    // もし既に登録がある場合は削除する
    if (image !== "") {
      await axios.post(`${apiUrl}/s3/delete`, { url: image });
    }

    //ファイルデータを送信用に整形
    const fileData = e.target.files[0];
    // 制限サイズ(3MB)
    const sizeLimit = 1024 * 1024 * 3;
    // ファイルサイズが制限以上の場合のエラー
    if (fileData.size > sizeLimit) {
      toast.error("ファイルサイズは3MB以下にしてください");
      return;
    }

    //URLをサーバ側から取得する
    const res = await axios.get(`${apiUrl}/s3`);
    const uploadUrl = await res.data.uploadURL;

    //登録する
    await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: fileData as any,
    });

    //DBに保存&表示するURLの作成
    const splitUrl = uploadUrl.split("?")[0];
    const imageUrl = splitUrl.replace(process.env.NEXT_PUBLIC_BUCKET, "");

    setImageItem(imageUrl);
  }, []);

  return { uploadImage };
};
