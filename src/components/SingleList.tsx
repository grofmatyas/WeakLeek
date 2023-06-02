import { FC, useState } from "react";
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
  const [open, setOpen] = useState(false);

  console.log(open);
  return (
    <>
      <IonAlert
        isOpen={open}
        header="Alert"
        subHeader="Important message"
        message="This is an alert!"
        buttons={["OK"]}
        onDidDismiss={() => setOpen(false)}
      ></IonAlert>

      <IonList>
        {randomList.map((item) => {
          return (
            <Item
              name={item.itemName}
              category={item.category}
              key={`${item.itemName}_${item.category}`}
              setAlert={setOpen}
            />
          );
        })}
      </IonList>
    </>
  );
};

export default SingleList;
