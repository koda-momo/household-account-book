import { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";

//MUI
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

//others
import { fetcher } from "../utils/fetcher";

/**
 * スタートアップページ.
 */
const StartPage: NextPage = () => {
  const { data, error } = useSWR(
    "https://weather.tsukumijima.net/api/forecast/city/400040",
    fetcher
  );

  const [place, setPlace] = useState<string>("");
  const [weather, setWeather] = useState<string>("");

  useEffect(() => {
    if (data) {
      setPlace(data.title);
      setWeather(data.forecasts[0].telop);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (place === "" && weather === "")
    return (
      <_Loading>
        <CircularProgress />
      </_Loading>
    );

  return (
    <>
      <_Flex>
        <_Image>
          <Image src="/images/toragao.png" width={300} height={300} />
        </_Image>
        <_Greeting>
          <div>おはよう、山田太郎</div>
          <div>
            今日の{place}は{weather}です
          </div>
          <div>よき1日を</div>
        </_Greeting>
      </_Flex>
    </>
  );
};

const _Flex = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 50,
}));

const _Image = styled("div")(() => ({
  "@media screen and (max-width:600px)": {
    width: 150,
    height: 150,
  },
}));

const _Greeting = styled("div")(() => ({
  "@media screen and (max-width:600px)": {
    fontSize: 10,
  },
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

export default StartPage;
