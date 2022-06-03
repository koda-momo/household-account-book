import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/index";
import toast from "react-hot-toast";

/**
 * Firebaseを使った場合の画像登録メソッド.
 * @param image 現在登録中の画像ファイルパス
 * @param setImageItem 画像パスにセット
 */
export const useFirebaseImage = (
  image: string,
  setImageItem: Dispatch<SetStateAction<string>>
) => {
  const uploadImage = useCallback(
    async (e: ChangeEvent<any>) => {
      //取得した画像データをsotrageに保存できる形に整形
      const file = e.target.files;
      const blob = new Blob(file, { type: "image/jpeg" });

      //ファイル名生成:この中の文字を組み合わせた16桁ランダムに生成
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWQYZ1234567890";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      try {
        //imagesディレクトリの中に「fileName.jpg」という名前でblobをアップロードするよ
        const uploadRef = ref(storage, `images/${fileName}.jpg`);
        const uploadTask = uploadBytes(uploadRef, blob);
        const snapshot = await uploadTask;

        //アップロードが完了するとその画像が取得できるURLが返ってくる
        const url = await getDownloadURL(snapshot.ref);
        const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE;

        const downloadURL = url.replace(String(firebaseUrl), "");

        setImageItem(downloadURL);
      } catch (e) {
        toast.error("エラーが発生しました:" + e);
        console.error(e);
      }
    },
    [image]
  );

  return { uploadImage, image };
};
