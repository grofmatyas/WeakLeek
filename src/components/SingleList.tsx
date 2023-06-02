import { FC, useState } from "react";
import { IonAlert, IonButton, IonList } from "@ionic/react";
import Item from "./Item";
import { Bill } from "../data/types";

const SingleList: FC<Bill> = ({ date, values }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IonAlert
        isOpen={open}
        header="Alert"
        subHeader="Important message"
        message="This is an alert!"
        buttons={[
          {
            text: "Confirm",
            role: "confirm",
            handler: () => {
              console.log("Alert confirmed");
            },
          },
        ]}
        onDidDismiss={() => {
          setOpen(false);
        }}
      ></IonAlert>

      <IonList inset={true}>
        {values.map((item) => {
          return (
            <Item
              name={item.name}
              category={item.category}
              key={`${item.name}_${item.category}`}
              setAlert={setOpen}
            />
          );
        })}
      </IonList>
    </>
  );
};

export default SingleList;
