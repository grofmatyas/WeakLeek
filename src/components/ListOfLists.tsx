import { FC, useRef, useState } from "react";
import { BillHistory, Categories } from "../data/types";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
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

const ModalGarbage: FC<{
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  nameItem: string;
  category: Categories;
}> = ({ onDismiss, nameItem, category }) => {
  const inputRef = useRef<HTMLIonInputElement>(null);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            ref={inputRef}
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
          >
            <IonSelectOption value="apples">Apples</IonSelectOption>
            <IonSelectOption value="oranges">Oranges</IonSelectOption>
            <IonSelectOption value="bananas">Bananas</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonInput
            ref={inputRef}
            labelPlacement="stacked"
            label="Count"
            placeholder="1"
            value={1}
            type="number"
          />
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
            onClick={() => onDismiss(inputRef.current?.value, "confirm")}
            strong={true}
          >
            Confirm
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonPage>
  );
};

const ListOfLists: FC<BillHistory> = ({ bills }) => {
  const [open, setOpen] = useState(false);

  const [present, dismiss] = useIonModal(ModalGarbage, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
    nameItem: "itemName",
    category: "apples",
  });
  const [message, setMessage] = useState(
    "This modal example uses the modalController to present and dismiss modals."
  );

  console.log(message);

  const openModal = () => {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "confirm") {
          setMessage(`Hello, ${ev.detail.data}!`);
        }
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
