import { memo, FC, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//MUI
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

type Props = {
  path: string;
  word?: string; //吹き出しの中身
  left?: number; //位置調節
};

export const GoToPageBtn: FC<Props> = memo(({ path, word, left }) => {
  const router = useRouter();
  const goToAddPage = useCallback(() => {
    router.push(path);
  }, []);

  return (
    <_Main>
      <_Btn>
        <_PcImage>
          {word && (
            <>
              <_Fukidashi>
                <Image src={"/fukidashi.png"} width={150} height={70} />
              </_Fukidashi>
              <div style={{ position: "absolute", top: 22, left: left }}>
                {word}
              </div>
            </>
          )}
          <Image
            src={"/kanemochi.png"}
            width={100}
            height={100}
            onClick={goToAddPage}
          />
        </_PcImage>
        <_PhoneImage>
          {word && (
            <>
              <_Fukidashi>
                <Image src={"/fukidashi.png"} width={150} height={50} />
              </_Fukidashi>
              <div
                style={{
                  position: "absolute",
                  top: 13,
                  left: left,
                  fontSize: 15,
                }}
              >
                {word}
              </div>
            </>
          )}
          <Image
            src={"/kanemochi.png"}
            width={80}
            height={80}
            onClick={goToAddPage}
          />
        </_PhoneImage>
      </_Btn>
    </_Main>
  );
});

const bunibuni = keyframes`
	0%,100% {transform: scale(1);}
	30% { transform: scale(0.96,1.04);}
	60% {transform: scale(1);}
	90% {transform: scale(1.15,0.9);}`;

const _Main = styled("div")(() => ({
  position: "fixed",
  right: 40,
  bottom: 20,
  "@media screen and (max-width:600px)": {
    position: "fixed",
    right: 10,
    bottom: 10,
  },
  ":hover": { animation: `${bunibuni} infinite 1s` },
}));

const _Fukidashi = styled("div")(() => ({
  position: "relative",
  marginBottom: -20,
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
