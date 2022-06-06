import { Dispatch, SetStateAction, useCallback } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

export const useLoginChecker = (
  setIsLogin: Dispatch<SetStateAction<boolean>>,
  setIsHeader: Dispatch<SetStateAction<boolean>>
) => {
  const cookie = new Cookie();
  const userId = cookie.get("userId");
  const router = useRouter();

  /**
   * ログインチェッカー.
   * @remarks パスがauth→ヘッダーを表示しない
   * @remarks パスがauth以外 && ログインしていない→ログイン画面に遷移
   * @remarks パスがauth以外 && ログインしている→ヘッダーも内容も表示
   */
  const loginChecker = useCallback((path: string) => {
    setIsLogin(false);
    setIsHeader(false);
    if (path.match(/auth/)) {
      setIsLogin(true);
    } else {
      if (!userId) {
        router.push("/auth/login/");
      } else {
        setIsLogin(true);
        setIsHeader(true);
      }
    }
  }, []);

  return { loginChecker };
};
