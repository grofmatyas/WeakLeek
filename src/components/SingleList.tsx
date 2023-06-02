import { Dispatch, FC, SetStateAction, useState } from "react";
import { IonAlert, IonButton, IonList } from "@ionic/react";
import Item from "./Item";
import { Bill } from "../data/types";

const SingleList: FC<{
  bill: Bill;
  openModal: () => void;
}> = ({ bill, openModal }) => {
  return (
    <>
      <h3>{new Date(bill.date).toLocaleDateString()}</h3>
      <IonList inset={true}>
        {bill?.values?.map((item) => {
          return (
            <Item
              name={item.name}
              category={item.category}
              key={`${item.name}_${item.category}`}
              openModal={openModal}
            />
          );
        })}
      </IonList>
    </>
  );
};

export default SingleList;
