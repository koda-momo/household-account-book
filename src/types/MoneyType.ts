export type ItemType = {
  _id: string;
  name: string;
  howmatch: number;
  createdAt: Date;
};

export type SpendingType = {
  _id: string;
  categoryName: string;
  color: string;
  icon: string;
  spendingId: Array<string>;
  total: number;
};

export type NestSpendingType = {
  _id: string;
  categoryName: string;
  color: string;
  icon: string;
  spendingId: Array<ItemType>;
  total: number;
};

export type GetNestSpendingType = {
  message: string;
  status: string;
  sp: NestSpendingType;
};

/**
 * 収入.
 */
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
  incomeId: Array<ItemType>;
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
  spendingId: Array<NestSpendingType>;
};

export type CategoryType = {
  id: string;
  name: string;
  icon: string;
  color: string;
  price: number;
};
