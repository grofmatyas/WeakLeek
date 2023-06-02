import { FC } from "react";
import { IonAlert, IonButton, IonList } from "@ionic/react";
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
    <>
      <IonButton id={"id"} />

      <IonAlert
        trigger="id"
        header="Alert"
        subHeader="Important message"
        message="This is an alert!"
        buttons={["OK"]}
      />

      <IonList>
        {randomList.map((item) => {
          return (
            <Item
              name={item.itemName}
              category={item.category}
              key={`${item.itemName}_${item.category}`}
            />
          );
        })}
      </IonList>
    </>
  );
};

export default SingleList;
