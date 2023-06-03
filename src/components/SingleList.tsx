import { Dispatch, FC, SetStateAction, useState } from "react";
import { IonAlert, IonButton, IonList } from "@ionic/react";
import Item from "./Item";
import { Bill } from "../data/types";

const SingleList: FC<{
  bill: Bill;
  openModal: () => void;
  setCurrentGarbage: Dispatch<any>;
}> = ({ bill, openModal, setCurrentGarbage }) => {
  return (
    <>
      <h3 style={{ maxWidth: "100%", overflowX: "auto", textAlign: "center" }}>
        {new Date(bill.date).toLocaleDateString()}
      </h3>
      <IonList inset={true}>
        {bill?.values?.map((item) => {
          return (
            <Item
              name={item.name}
              category={item.category}
              key={`${item.name}_${item.category}`}
              openModal={openModal}
              setCurrentGarbage={setCurrentGarbage}
            />
          );
        })}
      </IonList>
    </>
  );
};

export default SingleList;
