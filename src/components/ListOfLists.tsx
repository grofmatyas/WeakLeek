import { FC, useRef, useState } from "react";
import {
  BillHistory,
  Categories,
  Garbage,
  GarbageHistory,
} from "../data/types";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import SingleList from "./SingleList";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { getObject, setObject } from "../data/store";

const ModalGarbage: FC<{
  onDismiss: (data?: any, role?: string) => void;
  nameItem?: string;
  category?: Categories;
  date?: Date;
}> = ({ onDismiss, nameItem, category, date }) => {
  const nameRef = useRef<HTMLIonInputElement>(null);
  const selectRef = useRef<HTMLIonInputElement>(null);
  const amountRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonInputElement>(null);

  console.log(date, "my date", amountRef);
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            ref={nameRef}
            labelPlacement="stacked"
            label="Name"
            placeholder="Your name"
            value={nameItem}
          />
        </IonItem>

        <IonItem>
          <IonSelect
            aria-label="Fruit"
            interface="popover"
            placeholder="Select fruit"
            value={category}
            ref={selectRef}
          >
            <IonSelectOption value="apples">Apples</IonSelectOption>
            <IonSelectOption value="oranges">Oranges</IonSelectOption>
            <IonSelectOption value="bananas">Bananas</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonInput
            ref={amountRef}
            labelPlacement="stacked"
            label="Amount"
            placeholder="1"
            value={1}
            type="number"
          />
        </IonItem>

        <IonItem>
          <IonDatetimeButton datetime="date"></IonDatetimeButton>

          <IonModal keepContentsMounted={true}>
            <IonDatetime
              id="date"
              value={date?.toISOString()}
              ref={dateRef}
            ></IonDatetime>
          </IonModal>
        </IonItem>
      </IonContent>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton color="medium" onClick={() => onDismiss(null, "cancel")}>
            Cancel
          </IonButton>
        </IonButtons>

        <IonButtons slot="end">
          <IonButton
            onClick={() =>
              onDismiss(
                // `${amountRef.current?.value}`,
                {
                  name: nameRef.current?.value,
                  category: selectRef.current?.value,
                  values: [
                    {
                      date: dateRef.current?.value,
                      amount: amountRef.current?.value,
                    },
                  ],
                } as Garbage,
                "confirm"
              )
            }
            strong={true}
          >
            Confirm
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonPage>
  );
};

const onModalDismiss = async (role?: string, inputData?: Garbage) => {
  if (role === "confirm" && inputData) {
    // setMessage(`${ev.detail?.data?.value?.amount} hii`);

    try {
      let garbage = await getObject<GarbageHistory>("garbage");

      console.log("garbage na zacatku", garbage);

      const thisGarbage = garbage?.garbage?.find(
        (item) =>
          item.name === inputData?.name && item.category === inputData?.category
      );

      console.log("this garbage", thisGarbage);
      if (thisGarbage) {
        thisGarbage.values.push(inputData.values[0]);
      } else {
        if (!garbage?.garbage) {
          garbage = { garbage: [] };
          console.log("garbage now set to empty array", garbage);
        }

        garbage?.garbage.push(inputData);
      }

      console.log("tenhle garbage posilam", garbage);
      await setObject("garbage", garbage!);
    } catch (e) {
      return null;
    }
  }
};

const ListOfLists: FC<BillHistory> = ({ bills }) => {
  const [open, setOpen] = useState(false);

  const [present, dismiss] = useIonModal(ModalGarbage, {
    onDismiss: (data: Garbage, role: string) => dismiss(data, role),
    nameItem: "itemName",
    category: "apples",
    date: new Date(),
  });

  const [message, setMessage] = useState(
    "This modal example uses the modalController to present and dismiss modals."
  );

  console.log(message);

  const openModal = async () => {
    present({
      onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
        onModalDismiss(ev.detail.role, ev.detail?.data);
      },
    });
  };

  return (
    <>
      <IonButton onClick={() => openModal()}></IonButton>
      <IonList>
        {bills.map((bill) => {
          return (
            <SingleList bill={bill} setOpen={setOpen} key={`${bill.date}`} />
          );
        })}
      </IonList>
    </>
  );
};

export default ListOfLists;
