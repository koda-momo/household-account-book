import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";

//firebaseの初期化
const firebaseApp = initializeApp(firebaseConfig);

//分かりやすい変数に置き換えてexport
export const storage = getStorage(firebaseApp);
