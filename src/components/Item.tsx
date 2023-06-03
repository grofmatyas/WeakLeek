import { IonAlert, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { Dispatch, FC } from "react";
// import { sad, trash } from "ionicons/icons";
import dontEat from "../dontEat.svg";

const Item: FC<{
  name: string;
  category: string;
  openModal: () => void;
  setCurrentGarbage: Dispatch<any>;
}> = ({ name, category, openModal, setCurrentGarbage }) => {
  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      <IonButton
        slot="end"
        onClick={() => {
          setCurrentGarbage({
            name: name,
            category: category,
            values: [
              {
                date: new Date(),
                amount: 1,
              },
            ],
          }),
            openModal();
        }}
      >
        <IonIcon slot="icon-only" icon={dontEat} />
      </IonButton>
    </IonItem>
  );
};

export default Item;
