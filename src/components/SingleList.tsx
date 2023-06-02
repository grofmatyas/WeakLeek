import { FC } from "react";
import { IonItem, IonLabel, IonList } from "@ionic/react";

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
          <IonItem>
            <IonLabel>{item.itemName}</IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};
export default SingleList;
