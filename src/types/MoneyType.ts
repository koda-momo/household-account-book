export type IncomeItemType = {
  _id: string;
  name: string;
  howmatch: number;
  createdAt: Date;
};

export type IncomeType = {
  _id: string;
  categoryName: string;
  color: string;
  icon: string;
  incomeId: Array<string>;
  total: number;
};

export type NestIncomeType = {
  _id: string;
  categoryName: string;
  color: string;
  icon: string;
  incomeId: Array<IncomeItemType>;
  total: number;
};

export type GetNestIncomeType = {
  message: string;
  status: string;
  ic: NestIncomeType;
};

export type NestUserType = {
  _id: string;
  familyId: string;
  name: string;
  mail: string;
  password: string;
  role: string;
  image: string;
  incomeId: Array<NestIncomeType>;
  spendingId: [];
};
