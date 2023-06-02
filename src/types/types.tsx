export type Categories = 'vegetable' | 'fruit' | 'meat' | 'alcohol';

export interface GarbageHistory {
  name: string;
  category: Categories;
  values: {
    date: Date;
    amount: number;
  }[];
}[];
