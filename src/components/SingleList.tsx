import { FC } from "react";
import { IonList } from "@ionic/react";
import Item from "./Item";

const randomList = [
  { itemName: "apples", category: "fruit" },
  {
    itemName: "leek",
    category: "vegetable",
  },
];

const SingleList: FC = () => {
  return (
    <IonList>
      {randomList.map((item) => {
        return (
          <Item
            name={item.itemName}
            category={item.category}
            key={`${item.itemName}_${item.category}`}
          ></Item>
        );
      })}
    </IonList>
  );
};

export default SingleList;
