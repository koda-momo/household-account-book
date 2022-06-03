import styled from "@emotion/styled";
import {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

//other
import { useFirebaseImage } from "../../hooks/users/useFirebaseImage";

//MUI
import { TextField } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type Props = {
  errorItem: string;
  image: any; //画像パス(後でユーザ情報として送信用)
  setImage: Dispatch<SetStateAction<any>>;
};

/**
 * 画像インプット.
 */
export const InputImage: FC<Props> = memo(({ errorItem, image, setImage }) => {
  //FirebaseのURL
  const firebaseUrl = process.env.NEXT_PUBLIC_FIREBASE;

  //表示用
  const [imageItem, setImageItem] = useState("");

  //Firebaseに登録hooks
  const { uploadImage, deleteImage } = useFirebaseImage();

  //画像を初期状態+1以上変えたら前の画像は削除
  const [changeCount, setChangeCount] = useState(0);

  //表示用初期値のセット.
  useEffect(() => {
    setImageItem(image);
  }, []);

  /**
   * 入力値をセットする.
   */
  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      let counter = changeCount + 1;
      setChangeCount(counter);

      //今の数が1回より多ければ、前の画像はFirebaseから削除して良い
      if (counter > 1) {
        await deleteImage(imageItem);
      }

      // Firebaseに登録 & 表示中のイメージアイテムを更新
      const downloadURL = await uploadImage(e, setImageItem);
      setImageItem(String(downloadURL));

      //画面側の変数にも値を渡す
      setImage(String(downloadURL));
    },
    [image, changeCount]
  );

  return (
    <>
      {imageItem !== "" && (
        <>
          <div>現在設定中の画像</div>

          <Image
            alt="ユーザ画像"
            src={firebaseUrl + imageItem}
            width={100}
            height={100}
          />
        </>
      )}
      <label>
        <_Flex>
          <CameraAltIcon />
          画像を選択
        </_Flex>
        <_Error>{errorItem}</_Error>
        <_TextField
          fullWidth={true}
          id={image}
          error={Boolean(errorItem)}
          type="file"
          size="medium"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </label>
    </>
  );
});

const _Error = styled("div")(() => ({
  color: "#F6416C",
  textAlign: "left",
  height: 30,
}));

const _TextField = styled(TextField)(() => ({
  display: "none",
}));

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ":hover": {
    cursor: "pointer",
    opacity: "30%",
  },
}));
