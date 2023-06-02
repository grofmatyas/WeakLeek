export type Categories = 'Vegetable' | 'Fruit' | 'Meat' | 'Alcohol';

export type TimeScale = 'Day' | 'Week' | 'Month' | 'Year';

export interface GarbageHistory {
  garbage: {
    name: string;
    category: Categories;
    values: {
      date: Date;
      amount: number;
    }[];
  }[]
};

export interface BillHistory {
  bills: {
    date: Date;
    values: {
      name: string;
      category: Categories;
      amount?: number; 
    }[];
  }[];
}