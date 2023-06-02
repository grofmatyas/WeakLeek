import { FC } from "react";
import { BillHistory } from "../data/types";
import { IonList } from "@ionic/react";
import SingleList from "./SingleList";

const billHistory = {
  bills: [
    {
      date: "datum 1 ",
      values: [
        {
          name: "apple",
          category: "fruit",
        },
        {
          name: "banana",
          category: "fruit",
        },
      ],
    },
    {
      date: "datum 2 ",
      values: [
        {
          name: "apple",
          category: "fruit",
        },
        {
          name: "banana",
          category: "fruit",
        },
      ],
    },
  ],
};

const ListOfLists: FC<BillHistory> = ({ bills }) => {
  return (
    <IonList>
      {bills.map((bill) => {
        return <SingleList date={bill.date} values={bill.values} />;
      })}
    </IonList>
  );
};
