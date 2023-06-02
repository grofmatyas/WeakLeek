export type Categories = "Vegetable" | "Fruit" | "Meat" | "Alcohol";

export type TimeScale = "Day" | "Week" | "Month" | "Year";

export interface GarbageHistory {
  garbage: {
    name: string;
    category: Categories;
    values: {
      date: Date | string;
      amount: number;
    }[];
  }[];
}

export type Garbage = GarbageHistory["garbage"][0];
export interface BillHistory {
  bills: Bill[];
}

export interface Bill {
  date: Date | string;
  values: {
    name: string;
    category: Categories;
    amount?: number;
  }[];
}
