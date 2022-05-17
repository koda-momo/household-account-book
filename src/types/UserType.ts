//ユーザ1人1人の型
export type UserType = {
  id: string;
  image: string;
  familyID: string;
  name: string;
  mail: string;
  password: string;
  role: string;
};

//家族型
export type FamilyType = {
  id: string;
  image: string;
  secretWord: string;
  password: string;
  name: string;
  incomeId: string;
  spendingId: string;
};
