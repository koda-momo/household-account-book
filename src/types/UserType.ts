//ユーザ1人1人の型
export type UserType = {
  _id: string;
  image: string;
  familyId: string;
  name: string;
  mail: string;
  password: string;
  role: string;
};

//家族型
export type FamilyType = {
  _id: string;
  name: string;
  secretWord: string;
  password: string;
};

//家族情報取得型
export type GetFamilyType = {
  status: string;
  message: string;
  user: FamilyType;
};
