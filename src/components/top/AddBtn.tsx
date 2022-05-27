import { memo, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//MUI
import { styled } from "@mui/material/styles";

export const AddBtn = memo(() => {
  const router = useRouter();
  const goToAddPage = useCallback(() => {
    router.push("/top/add/");
  }, []);

  return (
    <_Main>
      <_Btn>
        <div>収支データを</div>
        <_PcImage>
          <Image
            src={"/kanemochi.png"}
            width={100}
            height={100}
            onClick={goToAddPage}
          />
        </_PcImage>
        <_PhoneImage>
          <Image
            src={"/kanemochi.png"}
            width={50}
            height={50}
            onClick={goToAddPage}
          />
        </_PhoneImage>

        <div>追加・編集・削除する</div>
      </_Btn>
    </_Main>
  );
});

const _Main = styled("div")(() => ({
  position: "fixed",
  right: 20,
  bottom: 20,
}));

const _PcImage = styled("div")(() => ({
  display: "block",
  "@media screen and (max-width:600px)": {
    display: "none",
  },
}));

const _PhoneImage = styled("div")(() => ({
  display: "none",
  "@media screen and (max-width:600px)": {
    display: "block",
  },
}));

const _Btn = styled("div")(() => ({
  textAlign: "center",
}));
