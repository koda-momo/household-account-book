import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import toast from "react-hot-toast";
import { ImagePreview } from "../user/ImagePreview";
import { useUploadImage } from "../../hooks/users/useUploadImage";

type Props = {
  errorItem: string;
  image: any; //画像パス(後でユーザ情報として送信用)
  setImage: Dispatch<SetStateAction<any>>;
  label: string;
};

/**
 * 画像インプット.
 */
export const InputImage: FC<Props> = memo(
  ({ errorItem, image, setImage, label }) => {
    const awsUrl = process.env.NEXT_PUBLIC_BUCKET;

    //表示用
    const [imageItem, setImageItem] = useState("");

    //S3に登録hooks
    const { uploadImage } = useUploadImage(imageItem, setImageItem);

    /**
     * 入力値をセットする + にS3に画像保存.
     */
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        uploadImage(e);
      },
      [image]
    );

    return (
      <>
        {imageItem !== "" && (
          <>
            <Image
              alt="ユーザ画像"
              src={awsUrl + imageItem}
              width={100}
              height={100}
            />
          </>
        )}
        <_Error>{errorItem}</_Error>
        <TextField
          fullWidth={true}
          id={image}
          error={Boolean(errorItem)}
          label={label}
          type="file"
          size="medium"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          //   onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </>
    );
  }
);

const _Error = styled("div")(() => ({
  color: "#F6416C",
  textAlign: "left",
  height: 30,
}));
