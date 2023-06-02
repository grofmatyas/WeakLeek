import { Dispatch, FC, SetStateAction, useState } from "react";
import { IonAlert, IonButton, IonList } from "@ionic/react";
import Item from "./Item";
import { Bill } from "../data/types";

const SingleList: FC<{
  bill: Bill;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ bill, setOpen }) => {
  return (
    <>
      <h3>{bill.date.toLocaleDateString()}</h3>
      <IonList inset={true}>
        {bill?.values?.map((item) => {
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
