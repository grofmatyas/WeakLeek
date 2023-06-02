import { IonAlert, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { FC } from "react";
// import { sad, trash } from "ionicons/icons";
import dontEat from "../dontEat.svg";

const Item: FC<{ name: string; category: string; openModal: () => void }> = ({
  name,
  category,
  openModal,
}) => {
  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      <IonButton slot="end" onClick={() => openModal()}>
        <IonIcon slot="icon-only" icon={dontEat} />
      </IonButton>
    </IonItem>
  );
};

export default Item;
