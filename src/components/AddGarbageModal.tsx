import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToolbar,
} from "@ionic/react";
import { Categories, Garbage } from "../data/types";
import { FC, useRef } from "react";

interface AddGarbageModalProps {
  onDismiss: (data?: any, role?: string) => void;
  nameItem?: string;
  category?: Categories;
  date?: Date;
}

export const AddGarbageModal: FC<AddGarbageModalProps> = ({
  onDismiss,
  nameItem,
  category,
  date,
}) => {
  const nameRef = useRef<HTMLIonInputElement>(null);
  const categoryRef = useRef<HTMLIonInputElement>(null);
  const amountRef = useRef<HTMLIonInputElement>(null);
  const dateRef = useRef<HTMLIonInputElement>(null);

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
            aria-label="select-category"
            interface="popover"
            placeholder="Select category"
            value={category}
            ref={categoryRef}
          >
            <IonSelectOption value="Vegetable"> Vegetable</IonSelectOption>
            <IonSelectOption value="Fruit">Fruit</IonSelectOption>
            <IonSelectOption value="Meat">Meat</IonSelectOption>
            <IonSelectOption value="Alcohol">Alcohol</IonSelectOption>
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
              presentation="date"
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
                {
                  name: nameRef.current?.value,
                  category: categoryRef.current?.value,
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
